import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Referrals, ReferralPartners } from '@/entities';
import { Button } from '@/components/ui/button';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';
import { pushReferralToSheet, formatReferralForSheet, isGoogleSheetsConfigured } from '@/lib/googleSheets';

export default function PartnerSubmitReferralPage() {
  const { member } = useMember();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    loanType: '',
    loanAmount: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [partner, setPartner] = useState<ReferralPartners | null>(null);

  const loanTypes = [
    'Home Loan',
    'Car Loan',
    'Personal Loan',
    'Business Loan',
    'Debt Consolidation',
    'Other',
  ];

  // Fetch partner information on mount
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        if (member?.loginEmail) {
          const { items } = await BaseCrudService.getAll<ReferralPartners>('partners');
          const userPartner = items.find(p => p._id === member.loginEmail);
          if (userPartner) {
            setPartner(userPartner);
          }
        }
      } catch (error) {
        console.error('Error fetching partner:', error);
      }
    };

    fetchPartner();
  }, [member?.loginEmail]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email';
    }
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone number is required';
    if (!formData.loanType) newErrors.loanType = 'Loan type is required';
    if (!formData.loanAmount.trim()) newErrors.loanAmount = 'Loan amount is required';
    if (isNaN(parseFloat(formData.loanAmount)) || parseFloat(formData.loanAmount) <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const referralData: Referrals = {
        _id: crypto.randomUUID(),
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        loanType: formData.loanType,
        loanAmount: parseFloat(formData.loanAmount),
        referralStatus: 'PENDING',
        submissionDate: new Date().toISOString(),
      };

      // Save to CMS
      await BaseCrudService.create('referrals', referralData);

      // Sync to Google Sheets if configured
      if (isGoogleSheetsConfigured() && partner) {
        const sheetData = formatReferralForSheet(
          referralData,
          partner.companyName || 'Unknown Company',
          '',
          ''
        );
        await pushReferralToSheet(sheetData);
      }

      setSuccess(true);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        loanType: '',
        loanAmount: '',
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting referral:', error);
      setErrors({ submit: 'Failed to submit referral. Please try again.' });
    } finally {
      setLoading(false);
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

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl flex items-start gap-4"
          >
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-green-900 mb-1">Referral Submitted!</h3>
              <p className="font-paragraph text-green-800">
                Your referral has been successfully submitted. We'll review it and notify you of the status.
              </p>
            </div>
          </motion.div>
        )}

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
            {/* Customer Information */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-6">
                Customer Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                      errors.customerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-red-600 text-sm mt-2">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="customer@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                      errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.customerEmail && (
                    <p className="text-red-600 text-sm mt-2">{errors.customerEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="0412 345 678"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                      errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.customerPhone && (
                    <p className="text-red-600 text-sm mt-2">{errors.customerPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Loan Information */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-6">
                Loan Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Loan Type *
                  </label>
                  <select
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph appearance-none bg-white cursor-pointer ${
                      errors.loanType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a loan type</option>
                    {loanTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.loanType && (
                    <p className="text-red-600 text-sm mt-2">{errors.loanType}</p>
                  )}
                </div>

                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Loan Amount (AUD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="1000"
                      className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph ${
                        errors.loanAmount ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.loanAmount && (
                    <p className="text-red-600 text-sm mt-2">{errors.loanAmount}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-gray-200">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg py-4 font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {loading ? 'Submitting...' : 'Submit Referral'}
              </Button>
              <p className="font-paragraph text-sm text-gray-600 text-center mt-4">
                Your referral will be reviewed and you'll be notified of the status.
              </p>
            </div>
          </form>
        </motion.div>

        {/* Example Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl p-8 md:p-12 border border-gray-100"
        >
          <h2 className="font-heading text-2xl font-bold text-secondary mb-6">Example Referral</h2>
          <div className="bg-light-gray rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-paragraph text-sm text-gray-600 mb-1">Customer Name</p>
                <p className="font-heading font-semibold text-secondary">John Smith</p>
              </div>
              <div>
                <p className="font-paragraph text-sm text-gray-600 mb-1">Email</p>
                <p className="font-heading font-semibold text-secondary">john.smith@example.com</p>
              </div>
              <div>
                <p className="font-paragraph text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-heading font-semibold text-secondary">0412 345 678</p>
              </div>
              <div>
                <p className="font-paragraph text-sm text-gray-600 mb-1">Loan Type</p>
                <p className="font-heading font-semibold text-secondary">Home Loan</p>
              </div>
              <div>
                <p className="font-paragraph text-sm text-gray-600 mb-1">Loan Amount</p>
                <p className="font-heading font-semibold text-secondary">$500,000</p>
              </div>
            </div>
            <p className="font-paragraph text-sm text-gray-600 pt-4 border-t border-gray-200">
              Once submitted, this referral would be tracked in your dashboard and you'd earn a commission when the customer is approved.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
