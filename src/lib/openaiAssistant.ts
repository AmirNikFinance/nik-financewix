/**
 * OpenAI Assistants API Integration Service
 * Handles communication with the OpenAI-powered lending assistant
 */

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface LLMResponse {
  response: string;
  threadId?: string;
  error?: string;
}

/**
 * Send a message to the OpenAI Assistant and get a response
 * @param message - User message
 * @param threadId - Existing thread ID for conversation continuity
 * @returns Promise with the assistant response
 */
export async function sendMessageToAssistant(
  message: string,
  threadId?: string
): Promise<LLMResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        threadId
      })
    });

    const data = await response.json();
    
    if (data.error && !data.response) {
      throw new Error(data.error);
    }

    return {
      response: data.response || 'Unable to process your request.',
      threadId: data.threadId,
      error: data.error
    };
  } catch (error) {
    console.error('Assistant Error:', error);
    return {
      response: 'I apologize, but I\'m having trouble processing your request. Please try again or contact our team directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Legacy wrapper for backward compatibility with existing ChatBot component
 */
export async function sendMessageToLLM(
  message: string,
  conversationHistory: ChatMessage[] = [],
  threadId?: string
): Promise<LLMResponse> {
  return sendMessageToAssistant(message, threadId);
}

/**
 * Generate follow-up question suggestions based on the conversation
 */
export function generateFollowUpSuggestions(lastMessage: string): string[] {
  const lowerMessage = lastMessage.toLowerCase();
  
  const suggestions: Record<string, string[]> = {
    'home loan': [
      'What documents do I need to apply?',
      'How much deposit do I need?',
      'Can I get pre-approval?'
    ],
    'mortgage': [
      'What are my refinancing options?',
      'How do offset accounts work?',
      'What is LMI and can I avoid it?'
    ],
    'car loan': [
      'Should I finance through a dealer?',
      'What term length is best?',
      'Can I refinance my current car loan?'
    ],
    'car finance': [
      'New vs used car financing?',
      'What documents do I need?',
      'Can I pay it off early?'
    ],
    'refinanc': [
      'How much could I save?',
      'When should I refinance?',
      'What costs are involved?'
    ],
    'personal loan': [
      'How quickly can I get approved?',
      'What can I use it for?',
      'Secured vs unsecured loans?'
    ],
    'business': [
      'What business loan options exist?',
      'Asset finance vs business loan?',
      'Do I need a business plan?'
    ],
    'first home': [
      'What government grants are available?',
      'How much deposit do I need?',
      'What is stamp duty?'
    ],
    'eligib': [
      'What income do I need?',
      'Does my credit score matter?',
      'Can I apply with a partner?'
    ],
    'apply': [
      'How long does approval take?',
      'What documents do I need?',
      'Can I book a consultation?'
    ]
  };

  for (const [keyword, suggestionList] of Object.entries(suggestions)) {
    if (lowerMessage.includes(keyword)) {
      return suggestionList;
    }
  }

  return [
    'Tell me about car loan options',
    'How does refinancing work?',
    'Can I book a free consultation?'
  ];
}
