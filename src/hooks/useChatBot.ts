import { useState, useCallback, useRef } from 'react';
import { BaseCrudService } from '@/integrations';

interface LeadData {
  email: string;
  phone?: string;
  source: string;
  timestamp: Date;
  conversationSummary?: string;
}

/**
 * Hook for managing chatbot interactions and lead capture
 */
export function useChatBot() {
  const [isCapturingLead, setIsCapturingLead] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);
  const threadIdRef = useRef<string | undefined>();

  /**
   * Send a message to the OpenAI Assistant
   */
  const sendMessage = useCallback(async (message: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          threadId: threadIdRef.current
        })
      });

      const data = await response.json();
      
      // Store thread ID for conversation continuity
      if (data.threadId) {
        threadIdRef.current = data.threadId;
      }

      if (data.error && !data.response) {
        throw new Error(data.error);
      }

      return data.response || 'I apologize, but I could not process your request. Please try again.';
    } catch (error) {
      console.error('Chat error:', error);
      return 'I apologize, but I\'m having trouble processing your request. Please try again or contact our team directly.';
    }
  }, []);

  /**
   * Reset the conversation thread
   */
  const resetConversation = useCallback(() => {
    threadIdRef.current = undefined;
  }, []);

  /**
   * Capture lead information
   */
  const captureLead = useCallback(async (email: string, phone?: string, summary?: string) => {
    setIsCapturingLead(true);
    setCaptureError(null);

    try {
      const leadData = {
        _id: crypto.randomUUID(),
        customerName: 'Chatbot Lead',
        customerEmail: email,
        customerPhone: phone || '',
        loanType: 'Inquiry',
        referralStatus: 'chatbot_lead',
        submissionDate: new Date().toISOString()
      };

      await BaseCrudService.create('referrals', leadData);

      // Track the lead capture event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'chatbot_lead_capture', {
          email: email,
          has_phone: !!phone
        });
      }

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to capture lead';
      setCaptureError(errorMessage);
      console.error('Lead capture error:', error);
      return false;
    } finally {
      setIsCapturingLead(false);
    }
  }, []);

  return {
    sendMessage,
    resetConversation,
    captureLead,
    isCapturingLead,
    captureError
  };
}
