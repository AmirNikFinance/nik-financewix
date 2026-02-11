import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LMICalculator from '@/components/calculators/LMICalculator';
import FAQSection from '@/components/calculators/FAQSection';

export default function LMICalculatorPage() {
  const seoTitle = 'LMI Calculator Australia | Lenders Mortgage Insurance Calculator';
  const seoDescription = 'Calculate your LMI (Lenders Mortgage Insurance) costs with our Australian LMI calculator. Understand mortgage insurance premiums and first home buyer costs.';
  const seoKeywords = 'LMI calculator, lenders mortgage insurance calculator, mortgage insurance cost Australia, first home buyer calculator, LMI premium calculator';

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
              LMI <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate your Lenders Mortgage Insurance (LMI) costs instantly. Understand mortgage insurance premiums for your home loan.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <LMICalculator />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                Understand Your LMI Costs
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Lenders Mortgage Insurance (LMI) is a one-time insurance premium that protects lenders when you borrow more than 80% of your property's value. While it's an additional cost, LMI allows first-home buyers and investors to enter the property market with smaller deposits.
              </p>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Our LMI calculator helps you understand the true cost of your home loan, including insurance premiums. This is essential information for budgeting and comparing loan options across different lenders.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Calculate accurate LMI premiums</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Understand LVR (Loan to Value Ratio)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Compare deposit scenarios</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Plan for first home buyer costs</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-secondary mb-6">
                LMI Key Information
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">When Do You Pay LMI?</h4>
                  <p className="font-paragraph text-gray-700">
                    LMI is required when your loan-to-value ratio (LVR) exceeds 80%. This means your deposit is less than 20% of the property value.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">LMI Premium Factors</h4>
                  <p className="font-paragraph text-gray-700">
                    LMI premiums vary based on your LVR, property type, loan amount, and the insurance provider. Higher LVRs result in higher premiums.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Can You Avoid LMI?</h4>
                  <p className="font-paragraph text-gray-700">
                    Yes—by saving a 20% deposit, you can avoid LMI entirely. Alternatively, some lenders offer low-deposit loans without LMI.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">LMI Refunds</h4>
                  <p className="font-paragraph text-gray-700">
                    If you refinance and your LVR drops below 80%, you may be eligible for an LMI refund from some providers.
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
          <FAQSection calculatorType="lmi" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Get a First Home Buyer Loan Quote
          </h2>
          <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our lending specialists can help you find the best loan options with competitive LMI rates and favorable terms for first-time buyers.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Get Your First Home Loan Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
