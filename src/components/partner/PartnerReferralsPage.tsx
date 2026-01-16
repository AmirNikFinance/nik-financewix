import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Referrals, ReferralPartners } from '@/entities';
import { BaseCrudService, useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';
import { fetchReferralsFromSheet, isGoogleSheetsConfigured, testGoogleSheetsConnection, PartnerStats } from '@/lib/googleSheets';
import { useToast } from '@/hooks/use-toast';

export default function PartnerReferralsPage() {
  const { member } = useMember();
  const { toast } = useToast();
  const [referrals, setReferrals] = useState<Referrals[]>([]);
  const [filteredReferrals, setFilteredReferrals] = useState<Referrals[]>([]);
  const [googleSheetStats, setGoogleSheetStats] = useState<PartnerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [useGoogleSheetData, setUseGoogleSheetData] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('testing');
  const [partnerProfile, setPartnerProfile] = useState<ReferralPartners | null>(null);

  // Test Google Sheets connection on mount
  useEffect(() => {
    const testConnection = async () => {
      if (!isGoogleSheetsConfigured()) {
        setConnectionStatus('disconnected');
        return;
      }

      setConnectionStatus('testing');
      const result = await testGoogleSheetsConnection();
      
      if (result.success) {
        setConnectionStatus('connected');
        console.log('✓ Google Sheets connection verified');
      } else {
        setConnectionStatus('disconnected');
        console.warn('✗ Google Sheets connection failed:', result.message);
      }
    };

    testConnection();
  }, []);

  // Auto-refresh data from Google Sheets every 30 seconds when connected
  useEffect(() => {
    if (connectionStatus !== 'connected' || !isGoogleSheetsConfigured() || !partnerProfile) {
      return;
    }

    // Set up auto-refresh interval
    const intervalId = setInterval(() => {
      console.log('🔄 Auto-refreshing referrals data from Google Sheets...');
      fetchReferrals(true);
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [connectionStatus, partnerProfile]);

  // Fetch partner profile
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

  // Fetch referrals from both CMS and Google Sheets
  const fetchReferrals = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      // Fetch from CMS
      const { items } = await BaseCrudService.getAll<Referrals>('referrals');
      setReferrals(items);

      // Fetch from Google Sheets if configured and connected
      if (isGoogleSheetsConfigured() && connectionStatus === 'connected' && partnerProfile?.companyName) {
        console.log('Fetching referrals from Google Sheets for company:', partnerProfile.companyName);
        const stats = await fetchReferralsFromSheet(partnerProfile.companyName);
        setGoogleSheetStats(stats);
        
        // If we have Google Sheet data, use it as the source of truth
        if (stats.referrals.length > 0) {
          setUseGoogleSheetData(true);
          
          // Convert Google Sheet data to Referrals format
          const sheetReferrals = stats.referrals.map((sheetData, index) => ({
            _id: `gs-${index}`,
            customerName: sheetData.customerName,
            customerEmail: sheetData.email,
            customerPhone: sheetData.phone,
            loanType: sheetData.loanType,
            loanAmount: parseFloat(sheetData.loanAmount) || 0,
            referralStatus: sheetData.status as any,
            submissionDate: sheetData.submissionDate,
          })) as Referrals[];
          
          filterReferrals(sheetReferrals, statusFilter);
          
          if (isRefresh) {
            toast({
              title: 'Data Refreshed',
              description: `Synced ${stats.referrals.length} referrals from Google Sheets`,
              variant: 'default',
            });
          }
        } else {
          setUseGoogleSheetData(false);
          filterReferrals(items, statusFilter);
        }
      } else {
        setUseGoogleSheetData(false);
        filterReferrals(items, statusFilter);
      }
    } catch (error) {
      console.error('Error fetching referrals:', error);
      
      if (isRefresh) {
        toast({
          title: 'Refresh Failed',
          description: 'Unable to fetch latest data. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (connectionStatus !== 'testing' && partnerProfile) {
      fetchReferrals();
    }
  }, [connectionStatus, partnerProfile]);

  const filterReferrals = (items: Referrals[], status: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED') => {
    if (status === 'ALL') {
      setFilteredReferrals(items);
    } else {
      setFilteredReferrals(items.filter(r => r.referralStatus === status));
    }
  };

  const handleStatusFilter = (status: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED') => {
    setStatusFilter(status);
    filterReferrals(referrals, status);
  };

  const totalReferrals = filteredReferrals.length;
  const approvedReferrals = filteredReferrals.filter(r => r.referralStatus === 'APPROVED').length;
  const pendingReferrals = filteredReferrals.filter(r => r.referralStatus === 'PENDING').length;
  const rejectedReferrals = filteredReferrals.filter(r => r.referralStatus === 'REJECTED').length;
  const totalLoanValue = filteredReferrals.reduce((sum, r) => sum + (r.loanAmount || 0), 0);

  const handleExportCSV = () => {
    const headers = ['Customer Name', 'Email', 'Phone', 'Loan Type', 'Loan Amount', 'Status', 'Date'];
    const rows = filteredReferrals.map(r => [
      r.customerName || '',
      r.customerEmail || '',
      r.customerPhone || '',
      r.loanType || '',
      r.loanAmount || 0,
      r.referralStatus || '',
      r.submissionDate ? new Date(r.submissionDate).toLocaleDateString('en-AU') : '',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referrals-${new Date().toISOString().split('T')[0]}.csv`;
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
          className="mb-12 flex justify-between items-start"
        >
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-2">
              Referral History
            </h1>
            <p className="font-paragraph text-lg text-gray-600">
              View all your referrals and their approval status
            </p>
            <div className="flex items-center gap-4 mt-3">
              {connectionStatus === 'connected' && (
                <div className="flex items-center gap-2 text-accent">
                  <Wifi className="w-4 h-4" />
                  <span className="font-paragraph text-sm">Google Sheets Connected</span>
                </div>
              )}
              {connectionStatus === 'disconnected' && (
                <div className="flex items-center gap-2 text-gray-500">
                  <WifiOff className="w-4 h-4" />
                  <span className="font-paragraph text-sm">Google Sheets Offline</span>
                </div>
              )}
              {useGoogleSheetData && (
                <div className="flex items-center gap-2 text-accent">
                  <span className="font-paragraph text-sm">Data synced from Google Sheets</span>
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={() => fetchReferrals(true)}
            disabled={refreshing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <p className="font-paragraph text-gray-600 text-sm mb-2">Total Referrals</p>
            <p className="font-heading text-3xl font-bold text-secondary">{totalReferrals}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <p className="font-paragraph text-gray-600 text-sm mb-2">Approved</p>
            <p className="font-heading text-3xl font-bold text-green-600">{approvedReferrals}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <p className="font-paragraph text-gray-600 text-sm mb-2">Pending</p>
            <p className="font-heading text-3xl font-bold text-yellow-600">{pendingReferrals}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <p className="font-paragraph text-gray-600 text-sm mb-2">Total Loan Value</p>
            <p className="font-heading text-3xl font-bold text-secondary">
              ${totalLoanValue.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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
                onClick={() => handleStatusFilter('APPROVED')}
                className={`px-4 py-2 rounded-lg font-paragraph font-semibold transition-all ${
                  statusFilter === 'APPROVED'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => handleStatusFilter('REJECTED')}
                className={`px-4 py-2 rounded-lg font-paragraph font-semibold transition-all ${
                  statusFilter === 'REJECTED'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Rejected
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

        {/* Referrals Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : filteredReferrals.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-paragraph">No referrals found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Customer</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Email</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Loan Type</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Amount</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Status</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-secondary">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReferrals.map((referral, index) => (
                    <motion.tr
                      key={referral._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 font-paragraph text-secondary font-semibold">
                        {referral.customerName}
                      </td>
                      <td className="py-4 px-6 font-paragraph text-gray-600">
                        {referral.customerEmail}
                      </td>
                      <td className="py-4 px-6 font-paragraph text-gray-600">
                        {referral.loanType}
                      </td>
                      <td className="py-4 px-6 font-paragraph font-semibold text-secondary">
                        ${referral.loanAmount?.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          referral.referralStatus === 'APPROVED'
                            ? 'bg-green-100 text-green-700'
                            : referral.referralStatus === 'REJECTED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {referral.referralStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-paragraph text-gray-600">
                        {referral.submissionDate ? new Date(referral.submissionDate).toLocaleDateString('en-AU') : '-'}
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
