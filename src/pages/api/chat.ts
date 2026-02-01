/**
 * OpenAI Assistants API Endpoint
 * Proxies chat requests to OpenAI with proper authentication
 */

import type { APIRoute } from 'astro';

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const ASSISTANT_ID = import.meta.env.OPENAI_ASSISTANT_ID || process.env.OPENAI_ASSISTANT_ID || 'asst_7A4RIGCJc2s95UYUTe4n8Es8';

interface ChatRequest {
  message: string;
  threadId?: string;
}

interface ChatResponse {
  response: string;
  threadId: string;
  error?: string;
}

// Helper to make OpenAI API calls
async function openaiRequest(endpoint: string, method: string, body?: object) {
  const response = await fetch(`https://api.openai.com/v1${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }
  
  return response.json();
}

// Poll for run completion
async function waitForRun(threadId: string, runId: string, maxAttempts = 30): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    const run = await openaiRequest(`/threads/${threadId}/runs/${runId}`, 'GET');
    
    if (run.status === 'completed') {
      // Get the assistant's response
      const messages = await openaiRequest(`/threads/${threadId}/messages?limit=1`, 'GET');
      const assistantMessage = messages.data[0];
      
      if (assistantMessage?.content?.[0]?.text?.value) {
        return assistantMessage.content[0].text.value;
      }
      return 'I apologize, but I could not generate a response.';
    }
    
    if (run.status === 'failed' || run.status === 'cancelled' || run.status === 'expired') {
      throw new Error(`Run ${run.status}: ${run.last_error?.message || 'Unknown error'}`);
    }
    
    // Wait 1 second before polling again
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error('Run timed out');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!OPENAI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body: ChatRequest = await request.json();
    const { message, threadId: existingThreadId } = body;

    if (!message) {
      return new Response(JSON.stringify({ 
        error: 'Message is required' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create a new thread if one doesn't exist
    let threadId = existingThreadId;
    if (!threadId) {
      const thread = await openaiRequest('/threads', 'POST', {});
      threadId = thread.id;
    }

    // Add the user's message to the thread
    await openaiRequest(`/threads/${threadId}/messages`, 'POST', {
      role: 'user',
      content: message
    });

    // Create a run
    const run = await openaiRequest(`/threads/${threadId}/runs`, 'POST', {
      assistant_id: ASSISTANT_ID
    });

    // Wait for the run to complete and get the response
    const response = await waitForRun(threadId, run.id);

    const result: ChatResponse = {
      response,
      threadId
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return new Response(JSON.stringify({ 
      response: 'I apologize, but I\'m having trouble processing your request. Please try again or contact our team directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
