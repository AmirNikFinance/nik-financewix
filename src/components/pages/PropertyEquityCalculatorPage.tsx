import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyEquityCalculator from '@/components/calculators/PropertyEquityCalculator';
import FAQSection from '@/components/calculators/FAQSection';

export default function PropertyEquityCalculatorPage() {
  const seoTitle = 'Property Equity Calculator Australia | Investment Property Equity';
  const seoDescription = 'Calculate your investment property equity with our Australian property equity calculator. Understand your investment property value and equity position.';
  const seoKeywords = 'property equity calculator, investment property calculator, property value calculator Australia, equity calculator investment property, rental property calculator';

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
              Property Equity <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate your investment property equity and understand your portfolio's growth. Track your property investment performance.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <PropertyEquityCalculator />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                Track Your Investment Property Growth
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Investment property equity is built through two mechanisms: mortgage principal repayment and property value appreciation. As an investment property owner, understanding your equity position is crucial for portfolio management, refinancing decisions, and planning future property acquisitions.
              </p>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Our property equity calculator helps you track your investment property performance and understand how your equity grows over time. This information is essential for strategic property investment planning and wealth building.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Calculate investment property equity accurately</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Track property value appreciation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Understand your LVR for refinancing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Plan portfolio expansion strategies</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-secondary mb-6">
                Investment Property Equity Strategies
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Equity Release</h4>
                  <p className="font-paragraph text-gray-700">
                    Use your accumulated equity to refinance and access funds for additional property investments or portfolio expansion.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Portfolio Growth</h4>
                  <p className="font-paragraph text-gray-700">
                    Leverage your equity to purchase additional investment properties and diversify your real estate portfolio.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Debt Optimization</h4>
                  <p className="font-paragraph text-gray-700">
                    Refinance investment properties to optimize loan structures and maximize tax deductions on interest.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Wealth Building</h4>
                  <p className="font-paragraph text-gray-700">
                    Build long-term wealth through property appreciation and strategic equity accumulation across multiple properties.
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
          <FAQSection calculatorType="propertyequity" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Grow Your Investment Property Portfolio
          </h2>
          <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our investment property specialists can help you leverage your equity and develop a strategic plan for portfolio expansion.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Discuss Your Investment Strategy
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
