import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OffsetCalculator from '@/components/calculators/OffsetCalculator';
import FAQSection from '@/components/calculators/FAQSection';

export default function OffsetCalculatorPage() {
  const seoTitle = 'Offset Account Calculator Australia | Savings Calculator';
  const seoDescription = 'Calculate your offset account savings with our Australian offset calculator. See how much interest you can save with an offset account on your home loan.';
  const seoKeywords = 'offset account calculator, offset calculator Australia, home loan offset calculator, interest savings calculator, offset account benefits';

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
              Offset Account <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Discover how much interest you can save with an offset account. Calculate your potential savings with our Australian offset calculator.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <OffsetCalculator />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                Maximize Your Home Loan Savings
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                An offset account is one of the most powerful tools available to Australian homeowners for reducing interest costs and paying off their mortgage faster. By linking a savings account to your home loan, the balance in your offset account reduces the amount of interest you pay.
              </p>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Our offset calculator shows you exactly how much you can save by using an offset account strategy. Even modest savings in your offset account can result in significant interest reductions over the life of your loan.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Calculate interest savings instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">See how offset accounts reduce loan term</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Compare scenarios with different offset balances</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Understand the power of offset accounts</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-secondary mb-6">
                How Offset Accounts Work
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Offset Calculation</h4>
                  <p className="font-paragraph text-gray-700">
                    Interest is calculated on your loan balance minus your offset account balance. For example, a $500,000 loan with $50,000 in offset is charged interest on $450,000.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Daily Interest</h4>
                  <p className="font-paragraph text-gray-700">
                    Interest is calculated daily, so every dollar in your offset account saves you interest every single day.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Flexibility & Access</h4>
                  <p className="font-paragraph text-gray-700">
                    Most offset accounts offer full access to your funds while still providing the interest-saving benefits of the offset.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Faster Loan Payoff</h4>
                  <p className="font-paragraph text-gray-700">
                    By reducing interest costs, offset accounts help you pay off your home loan years faster than without one.
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
          <FAQSection calculatorType="offset" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Start Saving with an Offset Account
          </h2>
          <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our lending specialists can help you find a home loan with an offset account that maximizes your savings and helps you achieve your financial goals faster.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Find Your Offset Home Loan
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
