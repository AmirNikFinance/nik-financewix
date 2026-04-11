import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ReferralPartners } from '@/entities';
import { Button } from '@/components/ui/button';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';

interface PartnerProfileSetupProps {
  partnerId: string;
  onProfileComplete: () => void;
}

export default function PartnerProfileSetup({ partnerId, onProfileComplete }: PartnerProfileSetupProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    abn: '',
    bankName: '',
    bankAccountName: '',
    bankBsb: '',
    bankAccountNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.abn.trim()) newErrors.abn = 'ABN is required';
    if (!/^\d{11}$/.test(formData.abn.replace(/\s/g, ''))) newErrors.abn = 'ABN must be 11 digits';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.bankAccountName.trim()) newErrors.bankAccountName = 'Account name is required';
    if (!formData.bankBsb.trim()) newErrors.bankBsb = 'BSB is required';
    if (!/^\d{6}$/.test(formData.bankBsb.replace(/\s/g, ''))) newErrors.bankBsb = 'BSB must be 6 digits';
    if (!formData.bankAccountNumber.trim()) newErrors.bankAccountNumber = 'Account number is required';
    if (!/^\d{6,10}$/.test(formData.bankAccountNumber.replace(/\s/g, ''))) newErrors.bankAccountNumber = 'Account number must be 6-10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Create or update partner profile with auto-approval
      const partnerData: ReferralPartners = {
        _id: partnerId,
        companyName: formData.companyName,
        abn: formData.abn,
        bankName: formData.bankName,
        bankAccountName: formData.bankAccountName,
        bankBsb: formData.bankBsb,
        bankAccountNumber: formData.bankAccountNumber,
        status: 'APPROVED',
        profileSetupComplete: true,
      };

      await BaseCrudService.create('partners', partnerData);

      setSuccess(true);
      setTimeout(() => {
        onProfileComplete();
      }, 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-secondary mb-4">Profile Setup Complete!</h1>
          <p className="font-paragraph text-gray-600 mb-8">
            Your profile has been saved and your account is now active. You can start submitting referrals immediately!
          </p>
          <p className="font-paragraph text-sm text-gray-500">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <PartnerPortalHeader />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
            Complete Your Profile
          </h1>
          <p className="font-paragraph text-lg text-gray-600">
            Please provide your company and banking details to activate your partner account.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100"
        >
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-red-700">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-6">Company Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                      errors.companyName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-red-600 text-sm mt-2">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    ABN (Australian Business Number) *
                  </label>
                  <input
                    type="text"
                    name="abn"
                    value={formData.abn}
                    onChange={handleChange}
                    placeholder="11 digits (e.g., 12 345 678 901)"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                      errors.abn ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.abn && (
                    <p className="text-red-600 text-sm mt-2">{errors.abn}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Banking Information */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-6">Banking Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="e.g., Commonwealth Bank, Westpac"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                      errors.bankName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.bankName && (
                    <p className="text-red-600 text-sm mt-2">{errors.bankName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    name="bankAccountName"
                    value={formData.bankAccountName}
                    onChange={handleChange}
                    placeholder="Name on the bank account"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                      errors.bankAccountName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.bankAccountName && (
                    <p className="text-red-600 text-sm mt-2">{errors.bankAccountName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading font-semibold text-secondary mb-2">
                      BSB (Bank State Branch) *
                    </label>
                    <input
                      type="text"
                      name="bankBsb"
                      value={formData.bankBsb}
                      onChange={handleChange}
                      placeholder="6 digits (e.g., 062 000)"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                        errors.bankBsb ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.bankBsb && (
                      <p className="text-red-600 text-sm mt-2">{errors.bankBsb}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-heading font-semibold text-secondary mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      placeholder="6-10 digits"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                        errors.bankAccountNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.bankAccountNumber && (
                      <p className="text-red-600 text-sm mt-2">{errors.bankAccountNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-gray-200">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg py-4 font-semibold text-lg transition-all"
              >
                {loading ? 'Saving...' : 'Complete Profile Setup'}
              </Button>
              <p className="font-paragraph text-sm text-gray-600 text-center mt-4">
                Your account will be reviewed and activated within 24 hours.
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
