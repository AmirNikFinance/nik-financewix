import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StampDutyCalculator from '@/components/calculators/StampDutyCalculator';
import FAQSection from '@/components/calculators/FAQSection';

export default function StampDutyCalculatorPage() {
  const seoTitle = 'Stamp Duty Calculator Australia | Property Stamp Duty Calculator';
  const seoDescription = 'Calculate your stamp duty costs with our Australian stamp duty calculator. Get accurate stamp duty estimates for property purchases in all states.';
  const seoKeywords = 'stamp duty calculator, stamp duty Australia, property stamp duty calculator, land tax calculator, conveyancing calculator Australia';

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
              Stamp Duty <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate your stamp duty costs instantly. Get accurate estimates for all Australian states and territories.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <StampDutyCalculator />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                Understand Your Stamp Duty Costs
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Stamp duty is a significant cost when purchasing property in Australia. This tax is levied by state and territory governments on property transfers and varies considerably depending on your location and property value. Understanding your stamp duty obligation is essential for accurate property purchase budgeting.
              </p>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Our stamp duty calculator provides accurate estimates for all Australian states and territories, helping you understand the true cost of your property purchase and plan your finances accordingly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Accurate state-by-state calculations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">First home buyer exemptions included</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Investment property calculations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Updated with current rates and thresholds</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-secondary mb-6">
                Stamp Duty by State
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">NSW & Victoria</h4>
                  <p className="font-paragraph text-gray-700">
                    Higher stamp duty rates with progressive scales. First home buyer concessions available in both states.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Queensland & WA</h4>
                  <p className="font-paragraph text-gray-700">
                    Moderate stamp duty rates with first home buyer exemptions and concessions for eligible properties.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">SA & Tasmania</h4>
                  <p className="font-paragraph text-gray-700">
                    Lower stamp duty rates with generous first home buyer exemptions and concessions.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">ACT & NT</h4>
                  <p className="font-paragraph text-gray-700">
                    Varying rates with specific first home buyer and investment property considerations.
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
          <FAQSection calculatorType="stampduty" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Plan Your Property Purchase
          </h2>
          <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our property specialists can help you understand all costs associated with your property purchase and find the right financing solution.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Get Your Property Loan Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
