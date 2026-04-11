import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
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
import LendingAssistantPage from '@/components/pages/LendingAssistantPage';
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
        path: "lending-assistant",
        element: <LendingAssistantPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  // Initialize Google Sheets integration on app startup
  if (GOOGLE_SHEETS_CONFIG.enabled && GOOGLE_SHEETS_CONFIG.scriptUrl) {
    initializeGoogleSheets(GOOGLE_SHEETS_CONFIG.scriptUrl, GOOGLE_SHEETS_CONFIG.sheetName);
  }

  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
