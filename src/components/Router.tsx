'use client';

import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
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
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
