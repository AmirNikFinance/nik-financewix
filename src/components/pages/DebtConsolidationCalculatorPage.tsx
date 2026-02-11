import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DebtConsolidationCalculator from '@/components/calculators/DebtConsolidationCalculator';
import FAQSection from '@/components/calculators/FAQSection';

export default function DebtConsolidationCalculatorPage() {
  const seoTitle = 'Debt Consolidation Calculator Australia | Consolidate Your Debts';
  const seoDescription = 'Calculate your debt consolidation savings with our Australian debt consolidation calculator. See how much you can save by consolidating debts into one loan.';
  const seoKeywords = 'debt consolidation calculator, consolidate debt Australia, debt consolidation loan calculator, credit card consolidation, personal loan consolidation';

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
              Debt Consolidation <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate your debt consolidation savings instantly. See how much you can save by consolidating multiple debts into one manageable loan.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <DebtConsolidationCalculator />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                Take Control of Your Debt
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Debt consolidation is a powerful financial strategy that combines multiple high-interest debts into a single, lower-interest loan. This approach can significantly reduce your monthly payments, lower your total interest costs, and simplify your financial life by having just one payment to manage.
              </p>
              <p className="font-paragraph text-lg text-gray-700 mb-4">
                Our debt consolidation calculator shows you exactly how much you can save by consolidating credit cards, personal loans, car loans, and other debts into one manageable payment.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Calculate consolidation savings instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Compare multiple debt scenarios</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">See monthly payment reductions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="font-paragraph text-gray-700">Understand total interest savings</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-secondary mb-6">
                Benefits of Debt Consolidation
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Lower Interest Rates</h4>
                  <p className="font-paragraph text-gray-700">
                    Consolidation loans typically offer lower interest rates than credit cards, reducing your overall interest costs significantly.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Simplified Payments</h4>
                  <p className="font-paragraph text-gray-700">
                    Instead of managing multiple payments to different creditors, you make one simple monthly payment.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Improved Cash Flow</h4>
                  <p className="font-paragraph text-gray-700">
                    Lower monthly payments free up cash for other financial goals and improve your monthly budget.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Better Credit Score</h4>
                  <p className="font-paragraph text-gray-700">
                    Consolidation can improve your credit score by reducing credit utilization and demonstrating responsible debt management.
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
          <FAQSection calculatorType="debt" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Consolidate Your Debts Today
          </h2>
          <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our debt consolidation specialists can help you find the right solution to reduce your debt burden and improve your financial health.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Get Your Consolidation Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
