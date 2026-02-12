/**
 * Chatbot Configuration
 * Configure your Google LLM Notebook integration here
 */

export const CHATBOT_CONFIG = {
  // Google LLM Notebook Configuration
  googleLLM: {
    // Set to true to enable the chatbot
    enabled: true,
    
    // Your Google LLM Notebook endpoint
    // Example: https://your-notebook-id.notebooks.googleusercontent.com/api/v1/chat
    endpoint: process.env.REACT_APP_GOOGLE_LLM_ENDPOINT || '',
    
    // Your Google LLM API key
    apiKey: process.env.REACT_APP_GOOGLE_LLM_API_KEY || '',
    
    // Model configuration
    model: {
      temperature: 0.7, // 0-1, lower = more deterministic
      maxTokens: 500,
      topP: 0.9
    }
  },

  // Chatbot UI Configuration
  ui: {
    // Position of the chat bubble
    position: 'bottom-right' as const,
    
    // Show chat bubble on page load
    showOnLoad: true,
    
    // Delay before showing chat bubble (ms)
    showDelay: 2000,
    
    // Enable lead capture form
    enableLeadCapture: true,
    
    // Show lead capture after N messages
    leadCaptureAfterMessages: 4
  },

  // Knowledge Base Configuration
  knowledgeBase: {
    // Topics the chatbot has knowledge about
    topics: [
      'home-loans',
      'car-loans',
      'personal-loans',
      'debt-consolidation',
      'investment-loans',
      'business-loans',
      'interest-rates',
      'eligibility',
      'application-process',
      'loan-terms'
    ],

    // System prompt for the chatbot
    systemPrompt: `You are an expert banking and financial products advisor. You have comprehensive knowledge about:
- Various loan products (home loans, car loans, personal loans, debt consolidation)
- Banking policies and procedures
- Interest rates and loan terms
- Financial planning and borrowing strategies
- Eligibility requirements and application processes

Provide helpful, accurate, and professional advice about banking products and services. Be concise but informative. If you don't know something, admit it and suggest the user contact our team directly.`
  },

  // Lead Capture Configuration
  leadCapture: {
    // Collect email
    collectEmail: true,
    
    // Collect phone
    collectPhone: true,
    
    // Collect name
    collectName: false,
    
    // Store leads in this collection
    storageCollection: 'referrals'
  }
};

/**
 * Get the chatbot configuration
 */
export function getChatbotConfig() {
  return CHATBOT_CONFIG;
}

/**
 * Check if chatbot is properly configured
 */
export function isChatbotConfigured(): boolean {
  const config = CHATBOT_CONFIG;
  return (
    config.googleLLM.enabled &&
    !!config.googleLLM.endpoint &&
    !!config.googleLLM.apiKey
  );
}
