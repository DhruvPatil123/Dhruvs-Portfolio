import React, { useRef, useEffect, useState } from 'react';

interface GlitchShaderTextProps {
  text: string;
  className?: string;
}

export default function GlitchShaderText({ text, className = '' }: GlitchShaderTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const stateRef = useRef({
    hover: 0,
    targetHover: 0,
    time: 0,
    mouseX: 0.5,
    mouseY: 0.5,
    targetMouseX: 0.5,
    targetMouseY: 0.5,
    isLightMode: false,
    needsUpdate: true // force font redraw check
  });

  const [fallbackMode, setFallbackMode] = useState(false);

  useEffect(() => {
    // Check if system has a preference or class on root
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains('light');
      if (stateRef.current.isLightMode !== isLight) {
        stateRef.current.isLightMode = isLight;
        stateRef.current.needsUpdate = true;
      }
    };
    checkTheme();

    // Create observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Make sure font is loaded
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        stateRef.current.needsUpdate = true;
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      alpha: true, 
      antialias: true,
      premultipliedAlpha: false
    });

    if (!gl) {
      console.warn('WebGL not supported, falling back to standard CSS gradient text.');
      setFallbackMode(true);
      return;
    }

    // 1. Shaders Setup
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y; // Flip Y for text texture rendering
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uHover;
      uniform vec2 uMouse;

      // Hash-based pseudo random generator
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = vUv;
        float hoverFactor = uHover;
        
        // Add subtle constant micro-glitch (simulates live server console noise)
        float idleScan = noise(vec2(uTime * 0.4, uv.y * 5.0)) * 0.015;
        
        // Calculate interactive distance to mouse
        float distToMouse = distance(uv, uMouse);
        float mouseInvasion = smoothstep(0.4, 0.0, distToMouse) * hoverFactor;
        
        // Glitch severity scales with hover and interactive mouse overlay
        float glitchSeverity = max(hoverFactor, mouseInvasion * 0.7);
        
        if (glitchSeverity > 0.01) {
          float speed = uTime * 20.0;
          float verticalBar = floor(uv.y * 35.0);
          float rowShift = hash(vec2(verticalBar, floor(speed)));
          
          // Row shifts for horizontal slicing
          if (rowShift < 0.22 * glitchSeverity) {
            float shiftAmount = sin(uv.y * 150.0 + uTime * 25.0) * 0.03 * glitchSeverity;
            // Introduce sharp step jitter
            shiftAmount += (hash(vec2(verticalBar, uTime)) - 0.5) * 0.02 * glitchSeverity;
            uv.x += shiftAmount;
          }
          
          // Random vertical pixel warp
          if (hash(vec2(floor(uv.x * 12.0), floor(speed))) < 0.08 * glitchSeverity) {
            uv.y += (hash(vec2(floor(uv.x * 24.0), speed)) - 0.5) * 0.02 * glitchSeverity;
          }

          // RGB Color Channel Split
          float maxOffset = 0.012 * glitchSeverity;
          float redOffset = maxOffset * (1.0 + 0.5 * sin(uTime * 12.0));
          float blueOffset = -maxOffset * (1.0 + 0.5 * cos(uTime * 15.0));
          
          vec4 texR = texture2D(uTexture, uv + vec2(redOffset, 0.0));
          vec4 texG = texture2D(uTexture, uv);
          vec4 texB = texture2D(uTexture, uv + vec2(blueOffset, 0.0));
          
          vec4 color = vec4(texR.r, texG.g, texB.b, texG.a);
          
          // CRT Line effects
          float scanline = sin(uv.y * 280.0 + uTime * 8.0) * 0.05 * glitchSeverity;
          color.rgb -= scanline;
          
          // Add digital electric matrix tint overlay on high glitch bands
          if (rowShift > 0.96 && hash(vec2(uTime)) < 0.1) {
            color.rgb = mix(color.rgb, vec3(0.02, 0.85, 1.0), 0.35);
          }
          
          gl_FragColor = color;
        } else {
          // Subtle beautiful ambient noise on pure idle states for texture fidelity
          uv.x += idleScan * 0.08;
          gl_FragColor = texture2D(uTexture, uv);
        }
      }
    `;

    // Shader builder helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vs || !fs) {
      setFallbackMode(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      setFallbackMode(true);
      return;
    }

    gl.useProgram(program);

    // 2. Load quad geometries
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // 3. Create texture for carrying gradient text
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Texture scaling configuration
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // 4. Offline canvas rendering to draw the name text meticulously
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 1800; // Extra high res for superb sharpness
    textCanvas.height = 360; 
    const textCtx = textCanvas.getContext('2d');

    const redrawTextTexture = (isLight: boolean) => {
      if (!textCtx) return;
      textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);

      // Gradient selection mimicking our main portfolio theme exactly
      const grad = textCtx.createLinearGradient(0, 0, textCanvas.width, 0);
      if (isLight) {
        // High contrast editorial theme for light mode readability (WCAG AA compliant)
        grad.addColorStop(0.0, '#4c1d95'); // Deeper rich violet for perfect light contrast
        grad.addColorStop(0.4, '#7c3aed'); // Rich purple
        grad.addColorStop(1.0, '#0e7490'); // Saturated dark cyan
      } else {
        // Futuristic cyber theme for deep space dark mode (extra bright and vibrant)
        grad.addColorStop(0.0, '#c084fc'); // Intense light purple
        grad.addColorStop(0.35, '#f472b6'); // Super glowing pink/fuchsia
        grad.addColorStop(0.7, '#22d3ee'); // Radiant cyber neon cyan
        grad.addColorStop(1.0, '#38bdf8'); // Heavenly sky blue
      }

      // Font setup with boldest tracking space and size
      textCtx.font = '800 136px "Space Grotesk", "Inter", system-ui, sans-serif';
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';

      // 1. Draw a protective dark halo stroke behind the text so wireframes passing behind can never obscure it
      textCtx.lineJoin = 'round';
      textCtx.miterLimit = 2;
      textCtx.strokeStyle = isLight ? 'rgba(255, 255, 255, 0.95)' : '#020008';
      textCtx.lineWidth = isLight ? 12 : 20;
      textCtx.strokeText(text, textCanvas.width / 2, textCanvas.height / 2);

      // 2. Solid color fill selection
      textCtx.fillStyle = grad;
      textCtx.shadowColor = isLight ? 'rgba(109,40,217,0.15)' : 'rgba(34,211,238,0.45)';
      textCtx.shadowBlur = isLight ? 4 : 25;

      // Fill coordinates perfectly
      textCtx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);

      // Re-upload to GPU
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    };

    // Initial render
    redrawTextTexture(stateRef.current.isLightMode);

    // Uniform locations search
    const uTextureLoc = gl.getUniformLocation(program, 'uTexture');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uHoverLoc = gl.getUniformLocation(program, 'uHover');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');

    gl.uniform1i(uTextureLoc, 0);

    let lastTime = 0;

    // Smooth resize handler
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5); // limit scale buffer representation
      const rect = canvas.getBoundingClientRect();
      const displayWidth = Math.floor(rect.width * dpr);
      const displayHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // GLSL Render Animation loop
    const render = (timeMs: number) => {
      const time = timeMs / 1000.0;
      const deltaTime = time - lastTime;
      lastTime = time;

      const state = stateRef.current;

      // Check if theme or dynamic dependencies triggered redraw
      if (state.needsUpdate) {
        redrawTextTexture(state.isLightMode);
        state.needsUpdate = false;
      }

      // Smoothly interpolate hover state transition
      state.hover += (state.targetHover - state.hover) * 8.0 * deltaTime;
      if (Math.abs(state.hover - state.targetHover) < 0.001) {
        state.hover = state.targetHover;
      }

      // Smoothly interpolate mouse coordinates for organic trailing trail
      state.mouseX += (state.targetMouseX - state.mouseX) * 5.0 * deltaTime;
      state.mouseY += (state.targetMouseY - state.mouseY) * 5.0 * deltaTime;

      // Clear render targets
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Update uniforms
      gl.uniform1f(uTimeLoc, time);
      gl.uniform1f(uHoverLoc, state.hover);
      gl.uniform2f(uMouseLoc, state.mouseX, state.mouseY);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    // Cleanup resources strictly
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', updateSize);
      
      gl.deleteTexture(texture);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [text]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    stateRef.current.targetMouseX = Math.max(0.0, Math.min(1.0, x));
    stateRef.current.targetMouseY = Math.max(0.0, Math.min(1.0, y));
  };

  const handleMouseEnter = () => {
    stateRef.current.targetHover = 1.0;
  };

  const handleMouseLeave = () => {
    stateRef.current.targetHover = 0.0;
    // Lerp mouse back to center dynamically
    stateRef.current.targetMouseX = 0.5;
    stateRef.current.targetMouseY = 0.5;
  };

  if (fallbackMode) {
    // Elegant fallback rendering standard gradient text if WebGL is unavailable
    return (
      <span className={`gradient-text inline-block hover:animate-pulse ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block w-full max-w-2xl select-none cursor-pointer overflow-visible ${className}`}
      style={{ aspectRatio: '1000 / 200' }}
    >
      {/* GLSL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ pointerEvents: 'none' }}
      />

      {/* Embedded accessible element representing textual content correctly in the DOM */}
      <span className="sr-only">
        {text}
      </span>
    </div>
  );
}
