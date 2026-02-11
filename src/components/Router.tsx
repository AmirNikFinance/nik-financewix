import React, { Suspense } from 'react';
import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

// Lazy load all page components for code-splitting
const HomePage = React.lazy(() => import('@/components/pages/HomePage'));
const ContactPage = React.lazy(() => import('@/components/pages/ContactPage'));
const ApplyPage = React.lazy(() => import('@/components/pages/ApplyPage'));
const PrivacyPolicyPage = React.lazy(() => import('@/components/pages/PrivacyPolicyPage'));
const BlogPage = React.lazy(() => import('@/components/pages/BlogPage'));
const BlogArticlePage = React.lazy(() => import('@/components/pages/BlogArticlePage'));
const CalculatorsPage = React.lazy(() => import('@/components/pages/CalculatorsPage'));
const CarLoanCalculatorPage = React.lazy(() => import('@/components/pages/CarLoanCalculatorPage'));
const RepaymentCalculatorPage = React.lazy(() => import('@/components/pages/RepaymentCalculatorPage'));
const BorrowingPowerCalculatorPage = React.lazy(() => import('@/components/pages/BorrowingPowerCalculatorPage'));
const OffsetCalculatorPage = React.lazy(() => import('@/components/pages/OffsetCalculatorPage'));
const HomeEquityCalculatorPage = React.lazy(() => import('@/components/pages/HomeEquityCalculatorPage'));
const PropertyEquityCalculatorPage = React.lazy(() => import('@/components/pages/PropertyEquityCalculatorPage'));
const LMICalculatorPage = React.lazy(() => import('@/components/pages/LMICalculatorPage'));
const DebtConsolidationCalculatorPage = React.lazy(() => import('@/components/pages/DebtConsolidationCalculatorPage'));
const StampDutyCalculatorPage = React.lazy(() => import('@/components/pages/StampDutyCalculatorPage'));
const PartnerLoginPage = React.lazy(() => import('@/components/pages/PartnerLoginPage'));
const PartnerPortalPage = React.lazy(() => import('@/components/pages/PartnerPortalPage'));
const CarLoansPage = React.lazy(() => import('@/components/pages/CarLoansPage'));
const HomeLoansPage = React.lazy(() => import('@/components/pages/HomeLoansPage'));
const PersonalLoansPage = React.lazy(() => import('@/components/pages/PersonalLoansPage'));
const BusinessLoansPage = React.lazy(() => import('@/components/pages/BusinessLoansPage'));
const BadCreditLoansPage = React.lazy(() => import('@/components/pages/BadCreditLoansPage'));
const RefinancingPage = React.lazy(() => import('@/components/pages/RefinancingPage'));
const AboutPage = React.lazy(() => import('@/components/pages/AboutPage'));
const FAQPage = React.lazy(() => import('@/components/pages/FAQPage'));
const NotFoundPage = React.lazy(() => import('@/components/pages/NotFoundPage'));
const PartnerCommissionsPage = React.lazy(() => import('@/components/partner/PartnerCommissionsPage'));
const PartnerReferralsPage = React.lazy(() => import('@/components/partner/PartnerReferralsPage'));
const PartnerProfilePage = React.lazy(() => import('@/components/partner/PartnerProfilePage'));
const PartnerSubmitReferralPage = React.lazy(() => import('@/components/partner/PartnerSubmitReferralPage'));

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "apply",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ApplyPage />
          </Suspense>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivacyPolicyPage />
          </Suspense>
        ),
      },
      {
        path: "blog",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: "blog/:slug",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BlogArticlePage />
          </Suspense>
        ),
      },
      {
        path: "calculators",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CalculatorsPage />
          </Suspense>
        ),
      },
      {
        path: "car-loan-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CarLoanCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "repayment-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RepaymentCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "borrowing-power-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BorrowingPowerCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "offset-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OffsetCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "home-equity-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomeEquityCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "property-equity-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PropertyEquityCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "lmi-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LMICalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "debt-consolidation-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DebtConsolidationCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "stamp-duty-calculator",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <StampDutyCalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "car-loans",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CarLoansPage />
          </Suspense>
        ),
      },
      {
        path: "home-loans",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomeLoansPage />
          </Suspense>
        ),
      },
      {
        path: "personal-loans",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PersonalLoansPage />
          </Suspense>
        ),
      },
      {
        path: "business-loans",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BusinessLoansPage />
          </Suspense>
        ),
      },
      {
        path: "bad-credit-loans",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BadCreditLoansPage />
          </Suspense>
        ),
      },
      {
        path: "refinancing",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RefinancingPage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "faq",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: "partner-login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PartnerLoginPage />
          </Suspense>
        ),
      },
      {
        path: "partner-portal",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PartnerPortalPage />
          </Suspense>
        ),
      },
      {
        path: "partner-commissions",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PartnerCommissionsPage />
          </Suspense>
        ),
      },
      {
        path: "partner-referrals",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PartnerReferralsPage />
          </Suspense>
        ),
      },
      {
        path: "partner-profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PartnerProfilePage />
          </Suspense>
        ),
      },
      {
        path: "partner-submit-referral",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PartnerSubmitReferralPage />
          </Suspense>
        ),
      },
      {
        path: "404",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
