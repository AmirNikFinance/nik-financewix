import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Import all page components
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ApplyPage from '@/components/pages/ApplyPage';
import BadCreditLoansPage from '@/components/pages/BadCreditLoansPage';
import BlogArticlePage from '@/components/pages/BlogArticlePage';
import BlogPage from '@/components/pages/BlogPage';
import BorrowingPowerCalculatorPage from '@/components/pages/BorrowingPowerCalculatorPage';
import BusinessLoansPage from '@/components/pages/BusinessLoansPage';
import CalculatorsPage from '@/components/pages/CalculatorsPage';
import CarLoanCalculatorPage from '@/components/pages/CarLoanCalculatorPage';
import CarLoansPage from '@/components/pages/CarLoansPage';
import ContactPage from '@/components/pages/ContactPage';
import DebtConsolidationCalculatorPage from '@/components/pages/DebtConsolidationCalculatorPage';
import ErrorPage from '@/components/pages/ErrorPage';
import FAQPage from '@/components/pages/FAQPage';
import HomeEquityCalculatorPage from '@/components/pages/HomeEquityCalculatorPage';
import HomeLoansPage from '@/components/pages/HomeLoansPage';
import LMICalculatorPage from '@/components/pages/LMICalculatorPage';
import NotFoundPage from '@/components/pages/NotFoundPage';
import OffsetCalculatorPage from '@/components/pages/OffsetCalculatorPage';
import PersonalLoansPage from '@/components/pages/PersonalLoansPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import PropertyEquityCalculatorPage from '@/components/pages/PropertyEquityCalculatorPage';
import RefinancingPage from '@/components/pages/RefinancingPage';
import RepaymentCalculatorPage from '@/components/pages/RepaymentCalculatorPage';
import StampDutyCalculatorPage from '@/components/pages/StampDutyCalculatorPage';

// Layout component that wraps all routes
function Layout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

// Create router with all routes
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
        {
          path: 'apply',
          element: <ApplyPage />,
        },
        {
          path: 'bad-credit-loans',
          element: <BadCreditLoansPage />,
        },
        {
          path: 'blog',
          element: <BlogPage />,
        },
        {
          path: 'blog/:slug',
          element: <BlogArticlePage />,
        },
        {
          path: 'borrowing-power-calculator',
          element: <BorrowingPowerCalculatorPage />,
        },
        {
          path: 'business-loans',
          element: <BusinessLoansPage />,
        },
        {
          path: 'calculators',
          element: <CalculatorsPage />,
        },
        {
          path: 'car-loan-calculator',
          element: <CarLoanCalculatorPage />,
        },
        {
          path: 'car-loans',
          element: <CarLoansPage />,
        },
        {
          path: 'contact',
          element: <ContactPage />,
        },
        {
          path: 'debt-consolidation-calculator',
          element: <DebtConsolidationCalculatorPage />,
        },
        {
          path: 'faq',
          element: <FAQPage />,
        },
        {
          path: 'home-equity-calculator',
          element: <HomeEquityCalculatorPage />,
        },
        {
          path: 'home-loans',
          element: <HomeLoansPage />,
        },
        {
          path: 'lmi-calculator',
          element: <LMICalculatorPage />,
        },
        {
          path: 'offset-calculator',
          element: <OffsetCalculatorPage />,
        },
        {
          path: 'personal-loans',
          element: <PersonalLoansPage />,
        },
        {
          path: 'privacy-policy',
          element: <PrivacyPolicyPage />,
        },
        {
          path: 'property-equity-calculator',
          element: <PropertyEquityCalculatorPage />,
        },
        {
          path: 'refinancing',
          element: <RefinancingPage />,
        },
        {
          path: 'repayment-calculator',
          element: <RepaymentCalculatorPage />,
        },
        {
          path: 'stamp-duty-calculator',
          element: <StampDutyCalculatorPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL || '/',
  }
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
