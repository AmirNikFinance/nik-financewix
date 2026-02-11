import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BorrowingPowerCalculator from '@/components/calculators/BorrowingPowerCalculator';
import FAQSection from '@/components/calculators/FAQSection';

export default function BorrowingPowerCalculatorPage() {
  const seoTitle = 'Borrowing Power Calculator Australia | How Much Can I Borrow?';
  const seoDescription = 'Calculate your borrowing power with our Australian borrowing capacity calculator. Find out how much you can borrow based on income, expenses, and credit profile.';
  const seoKeywords = 'borrowing power calculator, how much can I borrow, borrowing capacity calculator Australia, home loan borrowing power, loan amount calculator';

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              Borrowing Power <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Discover how much you can borrow with our Australian borrowing power calculator. Get an instant estimate based on your income and expenses.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <BorrowingPowerCalculator />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                Understand Your Borrowing Capacity
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Your borrowing power is determined by several key factors that Australian lenders assess when evaluating your loan application. Our calculator uses industry-standard lending criteria to provide an accurate estimate of how much you can borrow.
              </p>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Lenders typically assess your income, existing debts, living expenses, and credit profile to determine your maximum borrowing capacity. Understanding this figure is crucial for your property search and financial planning.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Based on Australian lending standards and criteria</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Considers income, expenses, and existing debts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Accounts for stress testing at higher interest rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Helps you set realistic property search parameters</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-secondary mb-6">
                Factors That Affect Your Borrowing Power
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Income & Employment</h4>
                  <p className="font-paragraph text-gray-700">
                    Lenders assess your gross annual income and employment stability. Self-employed individuals may need additional documentation.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Existing Debts</h4>
                  <p className="font-paragraph text-gray-700">
                    Credit cards, car loans, and personal loans reduce your available borrowing capacity through debt servicing ratios.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Living Expenses</h4>
                  <p className="font-paragraph text-gray-700">
                    Lenders account for essential living costs including utilities, groceries, insurance, and transport.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Deposit & Savings</h4>
                  <p className="font-paragraph text-gray-700">
                    Your deposit size and savings history demonstrate financial responsibility and reduce lender risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <FAQSection calculatorType="borrowing" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Know Your Borrowing Power
          </h2>
          <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Get a personalized loan assessment from our lending specialists to maximize your borrowing capacity and find the best loan options for your situation.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Get Your Borrowing Assessment
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
