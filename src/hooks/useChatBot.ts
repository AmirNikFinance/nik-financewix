import { useState, useCallback } from 'react';
import { BaseCrudService } from '@/integrations';

interface LeadData {
  email: string;
  phone?: string;
  source: string;
  timestamp: Date;
  conversationSummary?: string;
}

/**
 * Hook for managing chatbot lead capture
 */
export function useChatBot() {
  const [isCapturingLead, setIsCapturingLead] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);

  const captureLead = useCallback(async (email: string, phone?: string, summary?: string) => {
    setIsCapturingLead(true);
    setCaptureError(null);

    try {
      // Store lead in a leads collection (you may need to create this collection)
      // For now, we'll store it as a referral with chatbot source
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
      if (window.gtag) {
        window.gtag('event', 'chatbot_lead_capture', {
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
    captureLead,
    isCapturingLead,
    captureError
  };
}
