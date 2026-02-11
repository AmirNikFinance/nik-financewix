import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/lib/analytics';

export default function PersonalLoansPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const faqItems = [
    {
      question: 'What is a personal loan?',
      answer: 'A personal loan is an unsecured loan that you can use for any purpose - debt consolidation, home improvements, holidays, or emergencies. You repay the loan in fixed monthly installments over a set period.'
    },
    {
      question: 'What interest rates are available for personal loans?',
      answer: 'Personal loan interest rates typically range from 5.5% to 15% depending on your credit score, loan amount, and loan term. We help you find competitive rates from our network of lenders.'
    },
    {
      question: 'Can I get a personal loan with bad credit?',
      answer: 'Yes! We specialize in personal loans for customers with poor credit history. While rates may be higher, we have lenders who approve applications from people with bad credit, defaults, or previous rejections.'
    },
    {
      question: 'How much can I borrow?',
      answer: 'Personal loan amounts typically range from $2,000 to $50,000, depending on your income, credit history, and the lender. We can help determine your borrowing capacity.'
    },
    {
      question: 'How fast can I get approved?',
      answer: 'Most personal loan applications are approved within 24-48 hours. Once approved, funds can be deposited into your account within 1-2 business days.'
    },
    {
      question: 'What can I use a personal loan for?',
      answer: 'Personal loans are flexible and can be used for almost any purpose - debt consolidation, home improvements, car repairs, medical expenses, holidays, education, or emergency expenses.'
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
        title="Personal Loans Australia | Fast Approval | Bad Credit OK | NIK Finance"
        description="Get a personal loan fast with competitive rates. Bad credit options available. Borrow $2,000-$50,000 for any purpose. Apply online today."
        canonical="https://nikfinance.com.au/personal-loans"
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
                Personal Loans Australia
              </h1>
              <p className="font-paragraph text-lg text-white/90 mb-8">
                Get the cash you need fast with a personal loan. Flexible amounts, competitive rates, and bad credit options available. Apply online in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                  onClick={() => trackButtonClick('personal-loans-apply', 'Apply Now')}
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
                { title: 'Fast Approval', desc: 'Get approved in 24-48 hours with quick funding' },
                { title: 'Flexible Amounts', desc: 'Borrow $2,000 to $50,000 for any purpose' },
                { title: 'Bad Credit OK', desc: 'Approvals available for poor credit situations' },
                { title: 'No Collateral', desc: 'Unsecured loans - no need to pledge assets' },
                { title: 'Fixed Payments', desc: 'Know exactly what you\'ll pay each month' },
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
              How Personal Loans Work
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
                { step: '4', title: 'Repay', desc: 'Fixed monthly payments over your chosen term' }
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
                Why Choose NIK Finance for Personal Loans?
              </h2>
              <div className="space-y-6 font-paragraph text-gray-700 leading-relaxed">
                <p>
                  At NIK Finance, we understand that life happens. Whether you need cash for an emergency, want to consolidate debt, or have a specific goal in mind, our personal loans provide flexible solutions with competitive rates.
                </p>
                <p>
                  We work with Australia's leading lenders to access rates and products tailored to your situation. Our brokers have helped thousands of Australians get the cash they need quickly and affordably.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Personal Loan Uses
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Debt Consolidation:</strong> Combine multiple debts into one manageable payment</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Home Improvements:</strong> Finance renovations and upgrades</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Emergency Expenses:</strong> Cover unexpected costs quickly</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Holidays & Travel:</strong> Fund your dream vacation</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Education & Training:</strong> Invest in your future</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Medical Expenses:</strong> Cover health-related costs</span>
                  </li>
                </ul>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Competitive Personal Loan Rates
                </h3>
                <p>
                  Personal loan interest rates typically range from 5.5% to 15% depending on your credit score, loan amount, and loan term. Our current rates start from 5.5% p.a. for well-qualified applicants, with options available for all credit profiles.
                </p>
                <p>
                  We compare rates from multiple lenders to ensure you get the best deal. Our brokers negotiate on your behalf to secure the lowest possible rate for your situation.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Flexible Loan Terms
                </h3>
                <p>
                  Choose loan terms from 1 to 7 years to suit your budget. Shorter terms mean less interest paid overall, while longer terms mean lower monthly payments. Our brokers help you find the right balance for your situation.
                </p>
                <p>
                  Most personal loans are unsecured, meaning you don't need to pledge any assets as collateral. This makes the application process faster and simpler.
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
              Get Your Personal Loan Today
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Apply now and get approved in as little as 24 hours. Flexible amounts, competitive rates, and bad credit options available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                onClick={() => trackButtonClick('personal-loans-cta', 'Apply Now')}
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
