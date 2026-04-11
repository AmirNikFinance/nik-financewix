import { useEffect, useState } from 'react';
import { useMember } from '@/integrations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { ReferralPartners } from '@/entities';
import PartnerDashboard from '@/components/partner/PartnerDashboard';
import PartnerProfileSetup from '@/components/partner/PartnerProfileSetup';

export default function PartnerPortalPage() {
  const { member } = useMember();
  const [partnerProfile, setPartnerProfile] = useState<ReferralPartners | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!member?.loginEmail) {
      setProfileLoading(false);
      return;
    }

    const fetchPartnerProfile = async () => {
      try {
        const { items } = await BaseCrudService.getAll<ReferralPartners>('partners');
        // Match partner by email since Member doesn't have _id
        const userPartner = items.find(p => p._id === member.loginEmail);
        setPartnerProfile(userPartner || null);
      } catch (error) {
        console.error('Error fetching partner profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchPartnerProfile();
  }, [member?.loginEmail]);

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <LoadingSpinner />
      </div>
    );
  }

  // If partner exists and profile is complete, show dashboard
  if (partnerProfile && partnerProfile.profileSetupComplete) {
    return <PartnerDashboard partner={partnerProfile} />;
  }

  // Otherwise, show profile setup
  return <PartnerProfileSetup partnerId={member?.loginEmail || ''} onProfileComplete={() => {
    setPartnerProfile(prev => prev ? { ...prev, profileSetupComplete: true } : null);
  }} />;
}
