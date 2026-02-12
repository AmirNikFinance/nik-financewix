import { useEffect, useState } from 'react';
import { useMember } from '@/integrations';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Save } from 'lucide-react';
import { ReferralPartners } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';

export default function PartnerProfilePage() {
  const { member } = useMember();
  const [partner, setPartner] = useState<ReferralPartners | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    abn: '',
    bankName: '',
    bankAccountName: '',
    bankBsb: '',
    bankAccountNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        if (member?.loginEmail) {
          const { items } = await BaseCrudService.getAll<ReferralPartners>('partners');
          const userPartner = items.find(p => p._id === member.loginEmail);
          if (userPartner) {
            setPartner(userPartner);
            setFormData({
              companyName: userPartner.companyName || '',
              abn: userPartner.abn || '',
              bankName: userPartner.bankName || '',
              bankAccountName: userPartner.bankAccountName || '',
              bankBsb: userPartner.bankBsb || '',
              bankAccountNumber: userPartner.bankAccountNumber || '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching partner:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [member?.loginEmail]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);
    try {
      if (partner?._id) {
        await BaseCrudService.update<ReferralPartners>('partners', {
          _id: partner._id,
          companyName: formData.companyName,
          abn: formData.abn,
          bankName: formData.bankName,
          bankAccountName: formData.bankAccountName,
          bankBsb: formData.bankBsb,
          bankAccountNumber: formData.bankAccountNumber,
        });

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      <PartnerPortalHeader />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-2">
            Partner Profile
          </h1>
          <p className="font-paragraph text-lg text-gray-600">
            Manage your company and banking information
          </p>
        </motion.div>

        {/* Status Badge */}
        {partner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-semibold text-blue-900 mb-1">Account Status</p>
              <p className="font-paragraph text-blue-800">
                Your account status is: <span className="font-bold uppercase">{partner.status}</span>
              </p>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-green-800">Profile updated successfully!</p>
          </motion.div>
        )}

        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-red-700">{errors.submit}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-6">Company Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-heading font-semibold text-secondary mb-2">
                    Company Name
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
                    ABN (Australian Business Number)
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
                    Bank Name
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
                    Account Name
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
                      BSB (Bank State Branch)
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
                      Account Number
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
                disabled={saving}
                className="bg-accent hover:bg-accent/90 text-white rounded-lg py-4 px-8 font-semibold text-lg transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
