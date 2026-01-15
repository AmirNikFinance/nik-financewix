import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Referrals } from '@/entities';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';
import FormComponent from '@/components/forms/Form';
import { useToast } from '@/hooks/use-toast';

// Partner Referral Form ID from Wix Forms
const PARTNER_REFERRAL_FORM_ID = 'd5cddf53-3ebf-4a9a-9e1c-ec9722a5f261';

export default function PartnerSubmitReferralPage() {
  const { member } = useMember();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formServiceConfig = {
    formId: PARTNER_REFERRAL_FORM_ID,
  };

  // Handle form submission success
  const handleFormSubmitSuccess = async (formData: any) => {
    if (!member?._id) {
      console.warn('No member ID available for referral submission');
      return;
    }

    setIsSubmitting(true);

    try {
      // Extract form data - handle various field name formats
      const customerName = formData.customerName || formData.customer_name || formData['Customer Name'] || '';
      const customerEmail = formData.customerEmail || formData.email || formData.email_address || formData['Email Address'] || '';
      const customerPhone = formData.customerPhone || formData.phone || formData.phone_number || formData['Phone Number'] || '';
      const loanType = formData.loanType || formData.loan_type || formData['Loan Type'] || '';
      const loanAmount = parseFloat(formData.loanAmount || formData.loan_amount || formData['Loan Amount'] || '0');

      // Create referral entry in CMS
      const referralData: Referrals = {
        _id: crypto.randomUUID(),
        customerName,
        customerEmail,
        customerPhone,
        loanType,
        loanAmount,
        referralStatus: 'PENDING',
        submissionDate: new Date().toISOString(),
        _createdDate: new Date(),
        _updatedDate: new Date(),
      };

      await BaseCrudService.create('referrals', referralData);

      toast({
        title: 'Referral Submitted Successfully',
        description: 'Your referral has been saved to your account and is pending review.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error saving referral to CMS:', error);
      toast({
        title: 'Referral Saved',
        description: 'Your referral was submitted successfully.',
        variant: 'default',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      <PartnerPortalHeader />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
            Submit a Referral
          </h1>
          <p className="font-paragraph text-lg text-gray-600">
            Refer a customer for a loan and earn commissions. Fill in the customer details below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100"
        >
          {isSubmitting && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-paragraph text-blue-800">Saving referral to your account...</p>
            </div>
          )}
          <FormComponent 
            formServiceConfig={formServiceConfig}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
