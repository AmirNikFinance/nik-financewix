/**
 * Google LLM Notebook Integration Service
 * Handles communication with Google LLM Notebook for chatbot responses
 */

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface LLMResponse {
  response: string;
  error?: string;
}

const SYSTEM_PROMPT = `You are an expert banking and financial products advisor. You have comprehensive knowledge about:
- Various loan products (home loans, car loans, personal loans, debt consolidation)
- Banking policies and procedures
- Interest rates and loan terms
- Financial planning and borrowing strategies
- Eligibility requirements and application processes

Provide helpful, accurate, and professional advice about banking products and services. Be concise but informative. If you don't know something, admit it and suggest the user contact our team directly.`;

/**
 * Send a message to Google LLM Notebook and get a response
 * @param message - User message
 * @param conversationHistory - Previous messages in the conversation
 * @returns Promise with the LLM response
 */
export async function sendMessageToLLM(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<LLMResponse> {
  try {
    // Build the conversation context
    const messages = [
      ...conversationHistory,
      { role: 'user' as const, content: message }
    ];

    // Call Google LLM Notebook API
    // Note: You'll need to configure your Google LLM Notebook endpoint and API key
    const response = await fetch(
      process.env.REACT_APP_GOOGLE_LLM_ENDPOINT || '/api/llm',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GOOGLE_LLM_API_KEY || ''}`
        },
        body: JSON.stringify({
          messages,
          systemPrompt: SYSTEM_PROMPT,
          temperature: 0.7,
          maxTokens: 500
        })
      }
    );

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      response: data.response || data.content || 'Unable to process your request.'
    };
  } catch (error) {
    console.error('LLM Error:', error);
    return {
      response: 'I apologize, but I\'m having trouble processing your request. Please try again or contact our team directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate a follow-up question suggestion based on the conversation
 */
export function generateFollowUpSuggestions(lastMessage: string): string[] {
  const suggestions: Record<string, string[]> = {
    'home loan': [
      'What are the current interest rates?',
      'What are the eligibility requirements?',
      'How much can I borrow?'
    ],
    'car loan': [
      'What is the maximum loan term?',
      'What documents do I need?',
      'Can I get a quote?'
    ],
    'personal loan': [
      'What is the approval process?',
      'How quickly can I get the funds?',
      'Are there any fees?'
    ],
    'debt consolidation': [
      'How does debt consolidation work?',
      'Will it improve my credit score?',
      'What are the benefits?'
    ]
  };

  for (const [keyword, suggestionList] of Object.entries(suggestions)) {
    if (lastMessage.toLowerCase().includes(keyword)) {
      return suggestionList;
    }
  }

  return [
    'Tell me about your loan products',
    'What are the current interest rates?',
    'How do I apply?'
  ];
}
