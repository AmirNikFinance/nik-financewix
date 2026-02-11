import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, HelpCircle, TrendingDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/lib/analytics';

export default function RefinancingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const faqItems = [
    {
      question: 'What is loan refinancing?',
      answer: 'Refinancing means replacing your existing loan with a new one, typically at a better interest rate or with different terms. This can save you money on interest and reduce your monthly payments.'
    },
    {
      question: 'How much can I save by refinancing?',
      answer: 'Savings depend on the interest rate difference, remaining loan term, and refinancing costs. Many customers save thousands of dollars over the life of their loan. We calculate your potential savings.'
    },
    {
      question: 'What types of loans can I refinance?',
      answer: 'You can refinance home loans, car loans, personal loans, and business loans. We help with all types of refinancing to get you better rates and terms.'
    },
    {
      question: 'Are there costs associated with refinancing?',
      answer: 'Refinancing may involve application fees, valuation fees, and legal fees. However, these are often offset by the interest savings. We provide a full cost-benefit analysis.'
    },
    {
      question: 'How long does refinancing take?',
      answer: 'Refinancing typically takes 2-4 weeks depending on the loan type. We manage all documentation and lender communication to expedite the process.'
    },
    {
      question: 'Can I refinance with bad credit?',
      answer: 'Yes! We work with lenders who offer refinancing options for customers with poor credit. While rates may be higher, you can still benefit from refinancing to better terms.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <SEO 
        title="Loan Refinancing Australia | Save Money | Better Rates | NIK Finance"
        description="Refinance your home loan, car loan, or personal loan to save money. Lower rates, better terms. Get a free refinancing quote today."
        canonical="https://nikfinance.com.au/refinancing"
      />
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                Loan Refinancing Australia
              </h1>
              <p className="font-paragraph text-lg text-white/90 mb-8">
                Save thousands by refinancing to better rates. Whether it's your home loan, car loan, or personal loan, we help you find the best refinancing options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                  onClick={() => trackButtonClick('refinancing-apply', 'Apply Now')}
                  className="bg-accent text-white font-paragraph font-semibold px-8 py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 text-center"
                >
                  Apply Now
                </a>
                <Link
                  to="/contact"
                  className="bg-white text-primary font-paragraph font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 text-center"
                >
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { title: 'Lower Rates', desc: 'Get better interest rates and reduce monthly payments' },
                { title: 'Save Money', desc: 'Thousands in interest savings over the loan term' },
                { title: 'Better Terms', desc: 'Adjust loan terms to suit your current situation' },
                { title: 'Fast Process', desc: 'Streamlined refinancing in 2-4 weeks' },
                { title: 'Expert Advice', desc: 'Our brokers guide you through every step' },
                { title: 'Bad Credit OK', desc: 'Refinancing options available for all credit profiles' }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {idx === 0 ? (
                    <TrendingDown className="w-8 h-8 text-accent mb-4" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-accent mb-4" />
                  )}
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-paragraph text-gray-600">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Refinancing Process
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {[
                { step: '1', title: 'Assessment', desc: 'Review your current loan and financial situation' },
                { step: '2', title: 'Comparison', desc: 'Compare refinancing options from multiple lenders' },
                { step: '3', title: 'Application', desc: 'Submit refinancing application with new lender' },
                { step: '4', title: 'Settlement', desc: 'Old loan paid off and new loan activated' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-heading font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-gray-600">
                    {item.desc}
                  </p>
                  {idx < 3 && (
                    <ArrowRight className="hidden md:block absolute -right-8 top-6 text-accent w-6 h-6" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Refinance Your Loan?
              </h2>
              <div className="space-y-6 font-paragraph text-gray-700 leading-relaxed">
                <p>
                  Refinancing can be one of the smartest financial decisions you make. By switching to a better interest rate or more favorable terms, you can save thousands of dollars over the life of your loan.
                </p>
                <p>
                  At NIK Finance, we help customers across Australia refinance their loans to better rates and terms. Our brokers compare options from multiple lenders to ensure you get the best deal.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Types of Refinancing
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Home Loan Refinancing:</strong> Switch to better rates and reduce monthly payments</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Car Loan Refinancing:</strong> Lower your car loan rate and save on interest</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Personal Loan Refinancing:</strong> Consolidate debts or get better terms</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Business Loan Refinancing:</strong> Improve cash flow with better rates</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Debt Consolidation:</strong> Combine multiple loans into one</span>
                  </li>
                </ul>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  When Should You Refinance?
                </h3>
                <p>
                  The best time to refinance is when interest rates have dropped significantly since you took out your original loan. A general rule is that refinancing makes sense if you can save 0.5-1% or more on your interest rate.
                </p>
                <p>
                  Other reasons to refinance include changing your loan term, switching from variable to fixed rates, or consolidating multiple debts into one loan.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Refinancing Costs
                </h3>
                <p>
                  Refinancing typically involves some costs including application fees, valuation fees, legal fees, and potential early repayment fees on your existing loan. However, these costs are usually offset by the interest savings over time.
                </p>
                <p>
                  We provide a detailed cost-benefit analysis so you can see exactly how much you'll save by refinancing. In most cases, the savings far outweigh the costs.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Refinancing with Bad Credit
                </h3>
                <p>
                  Even if your credit has deteriorated since you took out your original loan, refinancing options may still be available. We work with lenders who consider your current situation and ability to repay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, idx) => (
                <motion.details
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-light-gray rounded-lg p-6 cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <summary className="flex items-center gap-3 font-heading font-semibold text-foreground">
                    <HelpCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    {item.question}
                  </summary>
                  <p className="font-paragraph text-gray-700 mt-4 ml-8">
                    {item.answer}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Start Saving Today
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free refinancing quote and see how much you could save. Our brokers will compare options from multiple lenders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                onClick={() => trackButtonClick('refinancing-cta', 'Apply Now')}
                className="bg-accent text-white font-paragraph font-semibold px-8 py-3 rounded-lg hover:bg-accent/90 transition-all duration-300"
              >
                Apply Now
              </a>
              <Link
                to="/contact"
                className="bg-white text-primary font-paragraph font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
