import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Filter, DollarSign } from 'lucide-react';
import { ReferralCommissions } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';

export default function PartnerCommissionsPage() {
  const [commissions, setCommissions] = useState<ReferralCommissions[]>([]);
  const [filteredCommissions, setFilteredCommissions] = useState<ReferralCommissions[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'PAID'>('ALL');

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const { items } = await BaseCrudService.getAll<ReferralCommissions>('commissions');
        setCommissions(items);
        filterCommissions(items, 'ALL');
      } catch (error) {
        console.error('Error fetching commissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  const filterCommissions = (items: ReferralCommissions[], status: 'ALL' | 'PENDING' | 'PAID') => {
    if (status === 'ALL') {
      setFilteredCommissions(items);
    } else {
      setFilteredCommissions(items.filter(c => c.status === status));
    }
  };

  const handleStatusFilter = (status: 'ALL' | 'PENDING' | 'PAID') => {
    setStatusFilter(status);
    filterCommissions(commissions, status);
  };

  const totalAmount = filteredCommissions.reduce((sum, c) => sum + (c.amount || 0), 0);
  const pendingAmount = filteredCommissions.filter(c => c.status === 'PENDING').reduce((sum, c) => sum + (c.amount || 0), 0);
  const paidAmount = filteredCommissions.filter(c => c.status === 'PAID').reduce((sum, c) => sum + (c.amount || 0), 0);

  const handleExportCSV = () => {
    const headers = ['Reference', 'Amount', 'Status', 'Date Earned', 'Date Paid'];
    const rows = filteredCommissions.map(c => [
      c.commissionReference || '',
      c.amount || 0,
      c.status || '',
      c.dateEarned ? new Date(c.dateEarned).toLocaleDateString('en-AU') : '',
      c.datePaid ? new Date(c.datePaid).toLocaleDateString('en-AU') : '',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      <PartnerPortalHeader />

      <div className="flex-1 max-w-[100rem] mx-auto w-full px-6 md:px-12 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-2">
            Commission History
          </h1>
          <p className="font-paragraph text-lg text-gray-600">
            Track all your referral commissions and payouts
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <p className="font-paragraph text-gray-600 text-sm mb-2">Total Amount</p>
            <p className="font-heading text-3xl font-bold text-secondary">
              ${totalAmount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <p className="font-paragraph text-gray-600 text-sm mb-2">Pending</p>
            <p className="font-heading text-3xl font-bold text-yellow-600">
              ${pendingAmount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <p className="font-paragraph text-gray-600 text-sm mb-2">Paid</p>
            <p className="font-heading text-3xl font-bold text-green-600">
              ${paidAmount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </motion.div>
        </div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleStatusFilter('ALL')}
                className={`px-4 py-2 rounded-lg font-paragraph font-semibold transition-all ${
                  statusFilter === 'ALL'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleStatusFilter('PENDING')}
                className={`px-4 py-2 rounded-lg font-paragraph font-semibold transition-all ${
                  statusFilter === 'PENDING'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusFilter('PAID')}
                className={`px-4 py-2 rounded-lg font-paragraph font-semibold transition-all ${
                  statusFilter === 'PAID'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Paid
              </button>
            </div>

            <Button
              onClick={handleExportCSV}
              className="bg-accent hover:bg-accent/90 text-white rounded-lg px-6 py-2 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        {/* Commissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : filteredCommissions.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-paragraph">No commissions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Reference</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Amount</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Status</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Date Earned</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Date Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCommissions.map((commission, index) => (
                    <motion.tr
                      key={commission._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 font-paragraph text-secondary font-semibold">
                        {commission.commissionReference}
                      </td>
                      <td className="py-4 px-6 font-paragraph font-bold text-secondary">
                        ${commission.amount?.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          commission.status === 'PAID'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {commission.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-paragraph text-gray-600">
                        {commission.dateEarned ? new Date(commission.dateEarned).toLocaleDateString('en-AU') : '-'}
                      </td>
                      <td className="py-4 px-6 font-paragraph text-gray-600">
                        {commission.datePaid ? new Date(commission.datePaid).toLocaleDateString('en-AU') : '-'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
