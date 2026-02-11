import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RepaymentCalculator from '@/components/calculators/RepaymentCalculator';
import FAQSection from '@/components/calculators/FAQSection';

export default function RepaymentCalculatorPage() {
  const seoTitle = 'Loan Repayment Calculator Australia | Monthly Payment Calculator';
  const seoDescription = 'Calculate your monthly loan repayments instantly with our Australian loan repayment calculator. Get accurate P&I and interest-only payment estimates.';
  const seoKeywords = 'loan repayment calculator, monthly payment calculator, home loan calculator Australia, mortgage calculator, loan payment calculator';

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
              Loan Repayment <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate your exact monthly loan repayments with our Australian-specific calculator. Compare principal & interest vs interest-only options instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <RepaymentCalculator />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                Understanding Your Loan Repayments
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Our loan repayment calculator helps Australian borrowers understand their monthly payment obligations. Whether you're considering a home loan, personal loan, or car finance, accurate repayment calculations are essential for financial planning.
              </p>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                The calculator supports both principal and interest (P&I) and interest-only loan structures, giving you flexibility to explore different borrowing scenarios.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Accurate monthly, weekly, and fortnightly payment calculations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Compare P&I vs interest-only repayment structures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Instant total interest and repayment calculations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Australian interest rates and loan terms</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-secondary mb-6">
                How to Use This Calculator
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">1. Select Loan Type</h4>
                  <p className="font-paragraph text-gray-700">
                    Choose between Principal & Interest (P&I) or Interest-Only repayment structures based on your borrowing needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">2. Enter Loan Amount</h4>
                  <p className="font-paragraph text-gray-700">
                    Set the total amount you plan to borrow. Our calculator supports loans from $50,000 to $2,000,000.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">3. Set Interest Rate</h4>
                  <p className="font-paragraph text-gray-700">
                    Enter your expected interest rate. Current Australian rates range from 1% to 12% p.a.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">4. Choose Loan Term</h4>
                  <p className="font-paragraph text-gray-700">
                    Select your loan term from 1 to 40 years. Most Australian home loans are 25-30 years.
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
          <FAQSection calculatorType="repayment" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to Get a Loan Quote?
          </h2>
          <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Use our calculator to understand your repayments, then connect with our lending specialists for personalized loan options.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Get Your Loan Quote Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
