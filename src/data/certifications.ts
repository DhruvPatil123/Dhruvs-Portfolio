export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verifyLink: string;
  skills: string[];
  logoType: 'google' | 'coursera' | 'huggingface' | 'deeplearning';
  badgeColor: string; // Tailwind gradient classes
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Generative AI Fundamentals',
    issuer: 'Google Cloud',
    date: 'March 2024',
    verifyLink: 'https://www.cloudskillsboost.google/public_profiles/dhruv-dinesh-patil',
    skills: ['Generative AI', 'Large Language Models', 'Responsible AI', 'Image Generation'],
    logoType: 'google',
    badgeColor: 'from-blue-600 via-red-500 to-yellow-500'
  },
  {
    id: 'cert-2',
    title: 'AI Agentic Workflows & Tool Use',
    issuer: 'DeepLearning.AI',
    date: 'January 2024',
    verifyLink: 'https://coursera.org/verify/specialization/deeplearning-ai-agents',
    skills: ['LangChain', 'Agentic AI', 'LlamaIndex', 'Function Calling'],
    logoType: 'deeplearning',
    badgeColor: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'cert-3',
    title: 'NLP & Deep Learning Specialization',
    issuer: 'Hugging Face',
    date: 'December 2023',
    verifyLink: 'https://huggingface.co/colearning/directory',
    skills: ['Transformers', 'Hugging Face Hub', 'PyTorch', 'Model Fine-Tuning'],
    logoType: 'huggingface',
    badgeColor: 'from-yellow-400 via-amber-500 to-amber-600'
  },
  {
    id: 'cert-4',
    title: 'Neural Networks & Deep Learning',
    issuer: 'Coursera',
    date: 'October 2023',
    verifyLink: 'https://coursera.org/verify/neural-networks-deep-learning',
    skills: ['Deep Learning', 'Neural Networks', 'Python', 'Parameter Optimization'],
    logoType: 'coursera',
    badgeColor: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'cert-5',
    title: 'Google Cloud Certified: Associate Cloud Engineer',
    issuer: 'Google Cloud',
    date: 'February 2024',
    verifyLink: 'https://www.credly.com/org/google/cloud-engineer',
    skills: ['Cloud Infrastructure', 'Google Kubernetes Engine', 'IAM Security', 'App Engine'],
    logoType: 'google',
    badgeColor: 'from-blue-500 via-indigo-500 to-cyan-500'
  },
  {
    id: 'cert-6',
    title: 'Natural Language Processing in TensorFlow',
    issuer: 'DeepLearning.AI',
    date: 'November 2023',
    verifyLink: 'https://coursera.org/verify/nlp-tensorflow',
    skills: ['TensorFlow', 'Recurrent Neural Networks', 'Word Embeddings', 'Tokenizers'],
    logoType: 'deeplearning',
    badgeColor: 'from-emerald-600 to-green-500'
  }
];
