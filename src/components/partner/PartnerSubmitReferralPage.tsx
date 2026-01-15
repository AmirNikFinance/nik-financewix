import { motion } from 'framer-motion';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';
import FormComponent from '@/components/forms/Form';
import { getFormServiceConfig } from '@wix/headless-forms/services';

// Partner Referral Form ID from Wix Forms
const PARTNER_REFERRAL_FORM_ID = 'd5cddf53-3ebf-4a9a-9e1c-ec9722a5f261';

export default function PartnerSubmitReferralPage() {
  const formServiceConfig = getFormServiceConfig({
    formId: PARTNER_REFERRAL_FORM_ID,
  });

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
          <FormComponent formServiceConfig={formServiceConfig} />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
