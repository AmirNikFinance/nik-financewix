import { useMember } from '@/integrations';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PartnerPortalHeader() {
  const { member, actions } = useMember();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/partner-portal' },
    { label: 'Submit Referral', path: '/partner-portal/submit-referral' },
    { label: 'Referrals', path: '/partner-portal/referrals' },
    { label: 'Commissions', path: '/partner-portal/commissions' },
    { label: 'Profile', path: '/partner-portal/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/partner-portal" className="font-heading text-2xl font-bold text-secondary">
            Partner Portal
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-paragraph font-semibold transition-colors ${
                  isActive(item.path)
                    ? 'text-accent'
                    : 'text-gray-600 hover:text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <span className="font-paragraph text-sm text-gray-600">
              {member?.profile?.nickname || member?.loginEmail}
            </span>
            <Button
              onClick={actions.logout}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-secondary hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-secondary" />
            ) : (
              <Menu className="w-6 h-6 text-secondary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-paragraph font-semibold py-2 transition-colors ${
                  isActive(item.path)
                    ? 'text-accent'
                    : 'text-gray-600 hover:text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <p className="font-paragraph text-sm text-gray-600">
                {member?.profile?.nickname || member?.loginEmail}
              </p>
              <Button
                onClick={() => {
                  actions.logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-secondary hover:bg-secondary/90 text-white flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
