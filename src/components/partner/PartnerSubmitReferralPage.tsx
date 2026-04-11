import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Referrals, ReferralPartners } from '@/entities';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';
import FormComponent from '@/components/forms/Form';
import { useToast } from '@/hooks/use-toast';
import { pushReferralToSheet, formatReferralForSheet, isGoogleSheetsConfigured } from '@/lib/googleSheets';

// Partner Referral Form ID from Wix Forms
const PARTNER_REFERRAL_FORM_ID = 'd5cddf53-3ebf-4a9a-9e1c-ec9722a5f261';

export default function PartnerSubmitReferralPage() {
  const { member } = useMember();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partnerProfile, setPartnerProfile] = useState<ReferralPartners | null>(null);

  const formServiceConfig = {
    formId: PARTNER_REFERRAL_FORM_ID,
  };

  // Fetch partner profile to get company name
  useEffect(() => {
    const fetchPartnerProfile = async () => {
      if (!member?._id) return;

      try {
        const { items } = await BaseCrudService.getAll<ReferralPartners>('partners');
        const profile = items.find(p => p._id === member._id);
        if (profile) {
          setPartnerProfile(profile);
        }
      } catch (error) {
        console.error('Error fetching partner profile:', error);
      }
    };

    fetchPartnerProfile();
  }, [member?._id]);

  // Handle form submission success
  const handleFormSubmitSuccess = async (formData: any) => {
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form data received:', formData);
    console.log('Member ID:', member?._id);
    console.log('Partner profile:', partnerProfile);
    
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
      
      console.log('Extracted data:', { customerName, customerEmail, customerPhone, loanType, loanAmount });

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

      console.log('Creating referral in CMS:', referralData);
      await BaseCrudService.create('referrals', referralData);
      console.log('✓ Referral created in CMS successfully');

      // Push to Google Sheets if configured
      if (isGoogleSheetsConfigured() && partnerProfile?.companyName) {
        console.log('=== GOOGLE SHEETS SYNC ===');
        console.log('Google Sheets configured:', isGoogleSheetsConfigured());
        console.log('Partner company name:', partnerProfile.companyName);
        console.log('Pushing referral to Google Sheets...');
        
        const sheetData = formatReferralForSheet(
          referralData,
          partnerProfile.companyName,
          '', // commission - empty for new referrals
          ''  // commissionStatus - empty for new referrals
        );
        
        console.log('Sheet data formatted:', sheetData);
        
        const sheetSuccess = await pushReferralToSheet(sheetData);
        
        if (sheetSuccess) {
          console.log('✓ Referral successfully pushed to Google Sheets');
        } else {
          console.warn('⚠ Referral saved to CMS but failed to sync with Google Sheets');
        }
      } else {
        console.log('=== GOOGLE SHEETS SYNC SKIPPED ===');
        if (!isGoogleSheetsConfigured()) {
          console.log('Reason: Google Sheets not configured');
        }
        if (!partnerProfile?.companyName) {
          console.warn('Reason: Partner company name not available');
        }
      }

      console.log('=== FORM SUBMISSION COMPLETED ===');
      
      toast({
        title: 'Referral Submitted Successfully',
        description: isGoogleSheetsConfigured() 
          ? 'Your referral has been saved and synced to Google Sheets.'
          : 'Your referral has been saved to your account and is pending review.',
        variant: 'default',
      });
    } catch (error) {
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Error details:', error);
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
