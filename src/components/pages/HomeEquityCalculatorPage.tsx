import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeEquityCalculator from '@/components/calculators/HomeEquityCalculator';
import FAQSection from '@/components/calculators/FAQSection';

export default function HomeEquityCalculatorPage() {
  const seoTitle = 'Home Equity Calculator Australia | Calculate Your Home Equity';
  const seoDescription = 'Calculate your home equity with our Australian home equity calculator. Find out how much equity you have in your property and your borrowing potential.';
  const seoKeywords = 'home equity calculator, equity calculator Australia, home equity loan calculator, property equity calculator, home value calculator';

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
              Home Equity <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate your home equity instantly. Understand how much of your property you own and your available borrowing capacity.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <HomeEquityCalculator />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                Unlock Your Home Equity Potential
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Home equity is the difference between your property's current market value and the outstanding mortgage balance. As you pay down your mortgage and your property appreciates, your equity grows—creating opportunities for refinancing, home equity loans, or investment property purchases.
              </p>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Our home equity calculator helps you understand your current equity position and explore how you can leverage it for financial goals like debt consolidation, home improvements, or investment property acquisition.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Calculate your exact home equity position</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Understand your LVR (Loan to Value Ratio)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Explore equity release options</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Plan for future property investments</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-secondary mb-6">
                What You Can Do With Your Equity
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Debt Consolidation</h4>
                  <p className="font-paragraph text-gray-700">
                    Use your home equity to consolidate high-interest debts like credit cards and personal loans into a lower-rate home loan.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Home Improvements</h4>
                  <p className="font-paragraph text-gray-700">
                    Finance renovations and improvements that increase your property value and enhance your lifestyle.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Investment Property</h4>
                  <p className="font-paragraph text-gray-700">
                    Use your equity as a deposit for an investment property to build wealth through real estate.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Refinancing</h4>
                  <p className="font-paragraph text-gray-700">
                    Refinance to better loan terms, lower rates, or access additional funds for your financial goals.
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
          <FAQSection calculatorType="equity" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to Leverage Your Equity?
          </h2>
          <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our lending specialists can help you explore equity release options and find the best solution for your financial goals.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Explore Your Equity Options
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
