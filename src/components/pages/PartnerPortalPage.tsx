import { useEffect, useState } from 'react';
import { useMember } from '@/integrations';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { Partners } from '@/entities';
import PartnerDashboard from '@/components/partner/PartnerDashboard';
import PartnerProfileSetup from '@/components/partner/PartnerProfileSetup';

export default function PartnerPortalPage() {
  const { member, isAuthenticated, isLoading } = useMember();
  const [partnerProfile, setPartnerProfile] = useState<Partners | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !member?._id) {
      setProfileLoading(false);
      return;
    }

    const fetchPartnerProfile = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Partners>('partners');
        const userPartner = items.find(p => p._id === member._id);
        setPartnerProfile(userPartner || null);
      } catch (error) {
        console.error('Error fetching partner profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchPartnerProfile();
  }, [isAuthenticated, member?._id]);

  if (isLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/partner-login" replace />;
  }

  // If partner exists and profile is complete, show dashboard
  if (partnerProfile && partnerProfile.profileSetupComplete) {
    return <PartnerDashboard partner={partnerProfile} />;
  }

  // Otherwise, show profile setup
  return <PartnerProfileSetup partnerId={member?._id || ''} onProfileComplete={() => {
    setPartnerProfile(prev => prev ? { ...prev, profileSetupComplete: true } : null);
  }} />;
}
