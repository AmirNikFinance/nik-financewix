import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock, CheckCircle, ArrowRight, MoreVertical } from 'lucide-react';
import { ReferralPartners, ReferralCommissions, Referrals } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PartnerPortalHeader from '@/components/partner/PartnerPortalHeader';
import Footer from '@/components/Footer';

interface PartnerDashboardProps {
  partner: ReferralPartners;
}

export default function PartnerDashboard({ partner }: PartnerDashboardProps) {
  const [commissions, setCommissions] = useState<ReferralCommissions[]>([]);
  const [referrals, setReferrals] = useState<Referrals[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commissionsData, referralsData] = await Promise.all([
          BaseCrudService.getAll<ReferralCommissions>('commissions'),
          BaseCrudService.getAll<Referrals>('referrals'),
        ]);

        setCommissions(commissionsData.items);
        setReferrals(referralsData.items);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics
  const totalEarnings = commissions.reduce((sum, c) => sum + (c.amount || 0), 0);
  const pendingCommissions = commissions.filter(c => c.status === 'PENDING').reduce((sum, c) => sum + (c.amount || 0), 0);
  const paidCommissions = commissions.filter(c => c.status === 'PAID').reduce((sum, c) => sum + (c.amount || 0), 0);
  const totalReferrals = referrals.length;
  const approvedReferrals = referrals.filter(r => r.referralStatus === 'APPROVED').length;
  const pendingReferrals = referrals.filter(r => r.referralStatus === 'PENDING').length;

  const StatCard = ({ icon: Icon, label, value, subtext, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-accent hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="font-paragraph text-gray-600 text-sm mb-2">{label}</p>
      <p className="font-heading text-3xl font-bold text-secondary mb-1">{value}</p>
      {subtext && <p className="font-paragraph text-xs text-gray-500">{subtext}</p>}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      <PartnerPortalHeader />

      <div className="flex-1 max-w-[100rem] mx-auto w-full px-6 md:px-12 py-16">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-2">
            Welcome, {partner.companyName}
          </h1>
          <p className="font-paragraph text-lg text-gray-600">
            Manage your referrals and track your earnings
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={DollarSign}
            label="Total Earnings"
            value={`$${totalEarnings.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtext="All time"
            color="bg-accent/10 text-accent"
          />
          <StatCard
            icon={Clock}
            label="Pending Commissions"
            value={`$${pendingCommissions.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtext={`${commissions.filter(c => c.status === 'PENDING').length} pending`}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard
            icon={CheckCircle}
            label="Paid Commissions"
            value={`$${paidCommissions.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtext={`${commissions.filter(c => c.status === 'PAID').length} paid`}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Referrals"
            value={totalReferrals}
            subtext={`${approvedReferrals} approved`}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard
            icon={CheckCircle}
            label="Approved Referrals"
            value={approvedReferrals}
            subtext={`${((approvedReferrals / totalReferrals) * 100).toFixed(0)}% approval rate`}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            icon={Clock}
            label="Pending Referrals"
            value={pendingReferrals}
            subtext="Awaiting approval"
            color="bg-yellow-100 text-yellow-600"
          />
        </div>

        {/* Recent Commissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 border border-gray-100 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-secondary">Recent Commissions</h2>
            <Link to="/partner-portal/commissions">
              <Button variant="outline" className="text-accent border-accent hover:bg-accent/10">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : commissions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No commissions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Reference</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Amount</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Status</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Date Earned</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Date Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {commissions.slice(0, 5).map((commission) => (
                    <tr key={commission._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-paragraph text-secondary">{commission.commissionReference}</td>
                      <td className="py-4 px-4 font-paragraph font-semibold text-secondary">
                        ${commission.amount?.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          commission.status === 'PAID'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {commission.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-paragraph text-gray-600">
                        {commission.dateEarned ? new Date(commission.dateEarned).toLocaleDateString('en-AU') : '-'}
                      </td>
                      <td className="py-4 px-4 font-paragraph text-gray-600">
                        {commission.datePaid ? new Date(commission.datePaid).toLocaleDateString('en-AU') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Recent Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-secondary">Recent Referrals</h2>
            <Link to="/partner-portal/referrals">
              <Button variant="outline" className="text-accent border-accent hover:bg-accent/10">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : referrals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No referrals yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Customer</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Loan Type</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Amount</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Status</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-secondary">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.slice(0, 5).map((referral) => (
                    <tr key={referral._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-paragraph text-secondary">{referral.customerName}</td>
                      <td className="py-4 px-4 font-paragraph text-gray-600">{referral.loanType}</td>
                      <td className="py-4 px-4 font-paragraph font-semibold text-secondary">
                        ${referral.loanAmount?.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-4 px-4">
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
                      <td className="py-4 px-4 font-paragraph text-gray-600">
                        {referral.submissionDate ? new Date(referral.submissionDate).toLocaleDateString('en-AU') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Link to="/partner-portal/profile" className="block">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-accent hover:shadow-lg transition-all text-center cursor-pointer">
              <h3 className="font-heading font-bold text-secondary mb-2">Update Profile</h3>
              <p className="font-paragraph text-sm text-gray-600">Edit your company and banking details</p>
            </div>
          </Link>

          <Link to="/partner-portal/referrals" className="block">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-accent hover:shadow-lg transition-all text-center cursor-pointer">
              <h3 className="font-heading font-bold text-secondary mb-2">View Referrals</h3>
              <p className="font-paragraph text-sm text-gray-600">See all your referrals and their status</p>
            </div>
          </Link>

          <Link to="/partner-portal/commissions" className="block">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-accent hover:shadow-lg transition-all text-center cursor-pointer">
              <h3 className="font-heading font-bold text-secondary mb-2">Commission History</h3>
              <p className="font-paragraph text-sm text-gray-600">Track all your commissions and payouts</p>
            </div>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
