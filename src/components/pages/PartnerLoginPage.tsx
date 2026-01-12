import { useEffect } from 'react';
import { useMember } from '@/integrations';
import { Navigate } from 'react-router-dom';
import { SignIn } from '@/components/ui/sign-in';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Lock } from 'lucide-react';

export default function PartnerLoginPage() {
  const { isAuthenticated } = useMember();

  if (isAuthenticated) {
    return <Navigate to="/partner-portal" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-primary flex items-center justify-center px-6 py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="mb-8">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Partner <span className="text-accent">Portal</span>
              </h1>
              <p className="font-paragraph text-xl text-gray-300 mb-8">
                Access your referral dashboard, track commissions, and manage your partner profile.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Track Referrals</h3>
                  <p className="text-gray-300">Monitor all your referrals and their status in real-time.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Manage Commissions</h3>
                  <p className="text-gray-300">View pending and paid commissions with detailed breakdowns.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Secure & Private</h3>
                  <p className="text-gray-300">Your data is encrypted and protected with industry-standard security.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <h2 className="font-heading text-3xl font-bold text-secondary mb-2">
              Partner Login
            </h2>
            <p className="font-paragraph text-gray-600 mb-8">
              Sign in to access your partner dashboard
            </p>

            <SignIn
              title="Partner Login"
              message="Sign in to access your partner portal"
              buttonText="Sign In"
            />

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="font-paragraph text-sm text-gray-600 text-center">
                Don't have a partner account?{' '}
                <a href="/partner-signup" className="text-accent font-semibold hover:underline">
                  Register here
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
