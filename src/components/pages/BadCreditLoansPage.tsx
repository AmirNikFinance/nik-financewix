import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/lib/analytics';

export default function BadCreditLoansPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const faqItems = [
    {
      question: 'What is considered bad credit?',
      answer: 'Bad credit typically includes missed payments, defaults, county court judgments (CCJs), bankruptcies, or a poor credit score. We work with lenders who specialize in approving applications from people with these issues.'
    },
    {
      question: 'Can I get a loan with bad credit?',
      answer: 'Yes! We specialize in bad credit loans. We have access to lenders who focus on your current situation and ability to repay, rather than just your credit history.'
    },
    {
      question: 'What interest rates are available for bad credit loans?',
      answer: 'Bad credit loan rates typically range from 8% to 15% depending on the loan type, amount, and your current financial situation. While higher than prime rates, we work to get you the best possible rate.'
    },
    {
      question: 'Will getting a bad credit loan help improve my credit score?',
      answer: 'Yes! Making regular on-time payments on a bad credit loan demonstrates financial responsibility and can help improve your credit score over time.'
    },
    {
      question: 'How much can I borrow with bad credit?',
      answer: 'Bad credit loan amounts typically range from $2,000 to $50,000 depending on your income and the lender. We help determine your borrowing capacity based on your current situation.'
    },
    {
      question: 'How fast can I get approved for a bad credit loan?',
      answer: 'Most bad credit loan applications are approved within 24-48 hours. Our streamlined process means you can get the cash you need quickly, even with poor credit.'
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
        title="Bad Credit Loans Australia | Get Approved Fast | NIK Finance"
        description="Get approved for a bad credit loan even with poor credit history. Fast approval, flexible terms. Borrow $2,000-$50,000. Apply today."
        canonical="https://nikfinance.com.au/bad-credit-loans"
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
                Bad Credit Loans Australia
              </h1>
              <p className="font-paragraph text-lg text-white/90 mb-8">
                Don't let bad credit stop you. Get approved for a loan even with poor credit history, defaults, or previous rejections. Fast approval, flexible terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                  onClick={() => trackButtonClick('bad-credit-loans-apply', 'Apply Now')}
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
                { title: 'Bad Credit OK', desc: 'We specialize in approvals for poor credit situations' },
                { title: 'Fast Approval', desc: 'Get approved in 24-48 hours with quick funding' },
                { title: 'No Judgment', desc: 'We focus on your current situation, not your past' },
                { title: 'Flexible Terms', desc: 'Choose terms that fit your budget' },
                { title: 'Build Credit', desc: 'Improve your credit score with on-time payments' },
                { title: 'Expert Support', desc: 'Our brokers guide you through the process' }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="w-8 h-8 text-accent mb-4" />
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
              How Bad Credit Loans Work
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {[
                { step: '1', title: 'Apply Online', desc: 'Complete our simple application in 10 minutes' },
                { step: '2', title: 'Get Approved', desc: 'Receive approval decision within 24-48 hours' },
                { step: '3', title: 'Receive Funds', desc: 'Money deposited into your account quickly' },
                { step: '4', title: 'Build Credit', desc: 'Make on-time payments to improve your score' }
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
                Why Choose NIK Finance for Bad Credit Loans?
              </h2>
              <div className="space-y-6 font-paragraph text-gray-700 leading-relaxed">
                <p>
                  At NIK Finance, we believe everyone deserves a second chance. Bad credit doesn't define you or your financial future. Our brokers have helped thousands of Australians with poor credit history access the loans they need.
                </p>
                <p>
                  We work with lenders who specialize in bad credit loans and focus on your current situation and ability to repay, rather than just your credit history. We understand that life happens, and past financial difficulties don't mean you can't borrow today.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  What Counts as Bad Credit?
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Missed Payments:</strong> Late or missed loan or credit card payments</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Defaults:</strong> Accounts sent to collection agencies</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Bankruptcy:</strong> Previous bankruptcy or insolvency</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>County Court Judgments:</strong> Legal judgments against you</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Low Credit Score:</strong> Credit score below 600</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Previous Rejections:</strong> Rejected by other lenders</span>
                  </li>
                </ul>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Bad Credit Loan Rates
                </h3>
                <p>
                  Bad credit loan interest rates typically range from 8% to 15% depending on the loan type, amount, term, and your current financial situation. While these rates are higher than prime rates, they're competitive for bad credit lending.
                </p>
                <p>
                  Our brokers negotiate on your behalf to secure the lowest possible rate for your situation. We focus on your current ability to repay and income stability.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  How to Improve Your Credit Score
                </h3>
                <p>
                  Taking out a bad credit loan and making on-time payments is one of the best ways to improve your credit score. Each successful payment demonstrates financial responsibility and helps rebuild your credit history.
                </p>
                <p>
                  Other steps include paying down existing debts, checking your credit report for errors, and avoiding new credit applications. Our brokers can provide guidance on credit improvement strategies.
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
              Get Your Bad Credit Loan Today
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Don't let bad credit hold you back. Apply now and get approved in as little as 24 hours. We believe in second chances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                onClick={() => trackButtonClick('bad-credit-loans-cta', 'Apply Now')}
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
