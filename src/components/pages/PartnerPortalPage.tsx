import { useEffect, useState } from 'react';
import { useMember } from '@/integrations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { ReferralPartners } from '@/entities';
import PartnerDashboard from '@/components/partner/PartnerDashboard';

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

  // Show dashboard if partner exists
  if (partnerProfile) {
    return <PartnerDashboard partner={partnerProfile} />;
  }

  // Otherwise, show message that profile needs to be set up in CMS
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="text-center max-w-md px-6">
        <h1 className="font-heading text-2xl font-bold text-secondary mb-4">Partner Profile Not Found</h1>
        <p className="font-paragraph text-gray-600">
          Your partner profile needs to be set up. Please contact the administrator to complete your profile setup.
        </p>
      </div>
    </div>
  );
}
