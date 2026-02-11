import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/lib/analytics';

export default function BusinessLoansPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const faqItems = [
    {
      question: 'What types of business loans are available?',
      answer: 'We offer term loans, equipment financing, invoice financing, lines of credit, and working capital loans. Each is designed for different business needs and growth stages.'
    },
    {
      question: 'How much can I borrow for my business?',
      answer: 'Business loan amounts typically range from $10,000 to $500,000+, depending on your business turnover, credit history, and the purpose of the loan. We help determine your borrowing capacity.'
    },
    {
      question: 'What interest rates are available?',
      answer: 'Business loan interest rates typically range from 6% to 12% depending on loan type, amount, term, and your business profile. We help you find competitive rates from our lender network.'
    },
    {
      question: 'Do I need collateral for a business loan?',
      answer: 'Some business loans are unsecured, while others may require collateral such as business assets or personal guarantees. We help you find options that suit your situation.'
    },
    {
      question: 'How long does business loan approval take?',
      answer: 'Most business loan applications are approved within 5-10 business days. We manage all documentation and lender communication to expedite the process.'
    },
    {
      question: 'Can I get a business loan with bad credit?',
      answer: 'Yes! We work with lenders who specialize in business loans for owners with poor personal credit. We focus on your business performance and cash flow.'
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
        title="Business Loans Australia | Fast Approval | SME Financing | NIK Finance"
        description="Get business financing fast. Term loans, equipment finance, working capital. Bad credit options. Borrow up to $500,000+. Apply today."
        canonical="https://www.nik.finance/business-loans"
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
                Business Loans Australia
              </h1>
              <p className="font-paragraph text-lg text-white/90 mb-8">
                Fuel your business growth with flexible business financing. Fast approval, competitive rates, and tailored solutions for SMEs and startups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                  onClick={() => trackButtonClick('business-loans-apply', 'Apply Now')}
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
                { title: 'Fast Approval', desc: 'Get approved in 5-10 business days' },
                { title: 'Flexible Terms', desc: 'Loan terms tailored to your cash flow' },
                { title: 'Competitive Rates', desc: 'Rates from 6% for qualified businesses' },
                { title: 'Multiple Options', desc: 'Term loans, equipment, working capital' },
                { title: 'Bad Credit OK', desc: 'Focus on business performance, not credit' },
                { title: 'Expert Guidance', desc: 'Brokers experienced in business finance' }
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
              Our Business Loan Process
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {[
                { step: '1', title: 'Consultation', desc: 'Discuss your business needs and goals' },
                { step: '2', title: 'Assessment', desc: 'We evaluate your business and borrowing capacity' },
                { step: '3', title: 'Approval', desc: 'Get approved and receive loan offer' },
                { step: '4', title: 'Funding', desc: 'Funds deposited into your business account' }
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
                Why Choose NIK Finance for Business Loans?
              </h2>
              <div className="space-y-6 font-paragraph text-gray-700 leading-relaxed">
                <p>
                  At NIK Finance, we understand the unique challenges of running a business. Our experienced brokers have helped hundreds of Australian businesses access the financing they need to grow, expand, and succeed.
                </p>
                <p>
                  We work with Australia's leading business lenders to access competitive rates and flexible terms. Whether you're a startup, established SME, or growing enterprise, we have solutions tailored to your needs.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Business Loan Types
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Term Loans:</strong> Fixed-term loans for business expansion and growth</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Equipment Finance:</strong> Spread the cost of equipment purchases</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Working Capital:</strong> Manage cash flow and seasonal variations</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Invoice Financing:</strong> Get cash quickly from outstanding invoices</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Lines of Credit:</strong> Flexible access to funds as needed</span>
                  </li>
                </ul>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Competitive Business Loan Rates
                </h3>
                <p>
                  Business loan interest rates typically range from 6% to 12% depending on loan type, amount, term, and your business profile. We help you find competitive rates from our network of lenders.
                </p>
                <p>
                  Our brokers negotiate on your behalf to secure the lowest possible rate for your situation. We focus on your business performance and cash flow, not just personal credit history.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  What We Need From You
                </h3>
                <p>
                  To assess your business loan application, we typically need recent business financials (profit and loss statements, balance sheets), tax returns, bank statements, and details about the purpose of the loan. We'll guide you through the exact requirements.
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
              Grow Your Business Today
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get the financing your business needs. Fast approval, competitive rates, and expert guidance from our experienced brokers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                onClick={() => trackButtonClick('business-loans-cta', 'Apply Now')}
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
