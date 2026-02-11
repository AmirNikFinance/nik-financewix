import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';
import ApplyPage from '@/components/pages/ApplyPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import BlogPage from '@/components/pages/BlogPage';
import BlogArticlePage from '@/components/pages/BlogArticlePage';
import CalculatorsPage from '@/components/pages/CalculatorsPage';
import CarLoanCalculatorPage from '@/components/pages/CarLoanCalculatorPage';
import RepaymentCalculatorPage from '@/components/pages/RepaymentCalculatorPage';
import BorrowingPowerCalculatorPage from '@/components/pages/BorrowingPowerCalculatorPage';
import OffsetCalculatorPage from '@/components/pages/OffsetCalculatorPage';
import HomeEquityCalculatorPage from '@/components/pages/HomeEquityCalculatorPage';
import PropertyEquityCalculatorPage from '@/components/pages/PropertyEquityCalculatorPage';
import LMICalculatorPage from '@/components/pages/LMICalculatorPage';
import DebtConsolidationCalculatorPage from '@/components/pages/DebtConsolidationCalculatorPage';
import StampDutyCalculatorPage from '@/components/pages/StampDutyCalculatorPage';
import PartnerLoginPage from '@/components/pages/PartnerLoginPage';
import PartnerPortalPage from '@/components/pages/PartnerPortalPage';
import PartnerCommissionsPage from '@/components/partner/PartnerCommissionsPage';
import PartnerReferralsPage from '@/components/partner/PartnerReferralsPage';
import PartnerProfilePage from '@/components/partner/PartnerProfilePage';
import PartnerSubmitReferralPage from '@/components/partner/PartnerSubmitReferralPage';
import CarLoansPage from '@/components/pages/CarLoansPage';
import HomeLoansPage from '@/components/pages/HomeLoansPage';
import PersonalLoansPage from '@/components/pages/PersonalLoansPage';
import BusinessLoansPage from '@/components/pages/BusinessLoansPage';
import BadCreditLoansPage from '@/components/pages/BadCreditLoansPage';
import RefinancingPage from '@/components/pages/RefinancingPage';
import AboutPage from '@/components/pages/AboutPage';
import FAQPage from '@/components/pages/FAQPage';
import NotFoundPage from '@/components/pages/NotFoundPage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { initializeGoogleSheets } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/config/googleSheets.config';

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
        element: <HomePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "apply",
        element: <ApplyPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogArticlePage />,
      },
      {
        path: "calculators",
        element: <CalculatorsPage />,
      },
      {
        path: "car-loan-calculator",
        element: <CarLoanCalculatorPage />,
      },
      {
        path: "repayment-calculator",
        element: <RepaymentCalculatorPage />,
      },
      {
        path: "borrowing-power-calculator",
        element: <BorrowingPowerCalculatorPage />,
      },
      {
        path: "offset-calculator",
        element: <OffsetCalculatorPage />,
      },
      {
        path: "home-equity-calculator",
        element: <HomeEquityCalculatorPage />,
      },
      {
        path: "property-equity-calculator",
        element: <PropertyEquityCalculatorPage />,
      },
      {
        path: "lmi-calculator",
        element: <LMICalculatorPage />,
      },
      {
        path: "debt-consolidation-calculator",
        element: <DebtConsolidationCalculatorPage />,
      },
      {
        path: "stamp-duty-calculator",
        element: <StampDutyCalculatorPage />,
      },
      {
        path: "car-loans",
        element: <CarLoansPage />,
      },
      {
        path: "home-loans",
        element: <HomeLoansPage />,
      },
      {
        path: "personal-loans",
        element: <PersonalLoansPage />,
      },
      {
        path: "business-loans",
        element: <BusinessLoansPage />,
      },
      {
        path: "bad-credit-loans",
        element: <BadCreditLoansPage />,
      },
      {
        path: "refinancing",
        element: <RefinancingPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "partner-login",
        element: <PartnerLoginPage />,
      },
      {
        path: "partner-portal",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access the partner portal">
            <PartnerPortalPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "partner-portal/commissions",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view commissions">
            <PartnerCommissionsPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "partner-portal/referrals",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view referrals">
            <PartnerReferralsPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "partner-portal/profile",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to manage your profile">
            <PartnerProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "partner-portal/submit-referral",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to submit a referral">
            <PartnerSubmitReferralPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "404",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  useEffect(() => {
    // Initialize Google Sheets integration on app startup (client-side only)
    if (GOOGLE_SHEETS_CONFIG.enabled && GOOGLE_SHEETS_CONFIG.scriptUrl) {
      try {
        initializeGoogleSheets(GOOGLE_SHEETS_CONFIG.scriptUrl, GOOGLE_SHEETS_CONFIG.sheetName);
      } catch (error) {
        console.warn('Failed to initialize Google Sheets:', error);
      }
    }
  }, []);

  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
