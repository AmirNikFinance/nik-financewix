import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/lib/analytics';

export default function HomeLoansPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const faqItems = [
    {
      question: 'What is the typical interest rate for home loans in Australia?',
      answer: 'Home loan interest rates in Australia typically range from 5.5% to 7.5% depending on loan type, LVR, credit score, and current market conditions. We help you find competitive rates from our network of lenders.'
    },
    {
      question: 'How much can I borrow for a home loan?',
      answer: 'Borrowing capacity depends on your income, expenses, credit history, and the property value. Most lenders allow borrowing up to 80-95% of the property value. Use our borrowing power calculator to estimate your capacity.'
    },
    {
      question: 'What is LMI and when do I need it?',
      answer: 'Lenders Mortgage Insurance (LMI) protects the lender if you default. It\'s typically required when borrowing more than 80% of the property value. We can help minimize LMI costs through strategic structuring.'
    },
    {
      question: 'Can I get a home loan with bad credit?',
      answer: 'Yes! We work with lenders who specialize in home loans for customers with poor credit history, defaults, or previous rejections. Rates may be higher, but options are available.'
    },
    {
      question: 'How long does home loan approval take?',
      answer: 'Most home loan applications take 2-4 weeks from application to settlement. We expedite the process by managing all documentation and lender communication on your behalf.'
    },
    {
      question: 'What are the different types of home loans?',
      answer: 'Common types include fixed-rate loans, variable-rate loans, split loans, interest-only loans, and offset account loans. We help you choose the right structure for your situation.'
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
        title="Home Loans Australia | Mortgage Broker | Best Rates | NIK Finance"
        description="Find the best home loan rates in Australia. Expert mortgage brokers helping first-time buyers, investors, and refinancers. Get approved fast."
        canonical="https://www.nik.finance/home-loans"
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
                Home Loans Australia
              </h1>
              <p className="font-paragraph text-lg text-white/90 mb-8">
                Get expert mortgage advice and competitive home loan rates. Whether you're a first-time buyer, investor, or refinancing, our brokers find the best loan for your situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                  onClick={() => trackButtonClick('home-loans-apply', 'Apply Now')}
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
                { title: 'Expert Advice', desc: 'Experienced brokers guide you through every step' },
                { title: 'Best Rates', desc: 'Access rates from major and specialist lenders' },
                { title: 'Fast Approval', desc: 'Streamlined process for quick settlement' },
                { title: 'First Home Help', desc: 'Specialized support for first-time buyers' },
                { title: 'Investment Loans', desc: 'Expert strategies for investment properties' },
                { title: 'Refinancing', desc: 'Save money by refinancing to better rates' }
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
              Our Home Loan Process
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {[
                { step: '1', title: 'Initial Consultation', desc: 'Discuss your goals and financial situation' },
                { step: '2', title: 'Pre-Approval', desc: 'Get pre-approved and understand your borrowing capacity' },
                { step: '3', title: 'Find Property', desc: 'Search for your ideal property with confidence' },
                { step: '4', title: 'Final Approval', desc: 'Complete documentation and settle on your new home' }
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
                Why Choose NIK Finance for Home Loans?
              </h2>
              <div className="space-y-6 font-paragraph text-gray-700 leading-relaxed">
                <p>
                  At NIK Finance, we're committed to helping Australians achieve their property dreams. Our experienced mortgage brokers have helped thousands of customers secure home loans with competitive rates and favorable terms.
                </p>
                <p>
                  We work with Australia's leading banks and specialist lenders to access rates and products you won't find on your own. Whether you're a first-time buyer, property investor, or looking to refinance, we have solutions tailored to your needs.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Home Loan Types We Offer
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>First Home Buyer Loans:</strong> Special programs and assistance for first-time buyers</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Investment Property Loans:</strong> Tailored solutions for property investors</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Refinancing:</strong> Switch to better rates and save thousands</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Construction Loans:</strong> Finance your new build project</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Bad Credit Home Loans:</strong> Options available for poor credit situations</span>
                  </li>
                </ul>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Competitive Home Loan Rates
                </h3>
                <p>
                  Home loan interest rates vary based on loan type, loan-to-value ratio (LVR), credit score, and current market conditions. Our current rates start from 5.5% p.a. for well-qualified applicants on variable loans, with fixed-rate options also available.
                </p>
                <p>
                  We compare rates from multiple lenders to ensure you get the best deal. Our brokers negotiate on your behalf to secure the lowest possible rate for your situation.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Understanding Your Borrowing Capacity
                </h3>
                <p>
                  Your borrowing capacity depends on several factors including your income, expenses, credit history, and the property value. Most lenders allow borrowing up to 80-95% of the property value, with the difference being your deposit.
                </p>
                <p>
                  Use our free borrowing power calculator to estimate how much you can borrow. Our brokers can then help you explore options to maximize your borrowing capacity if needed.
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
              Ready to Get Your Home Loan?
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Let our expert brokers help you find the perfect home loan. Get pre-approved today and start your property journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                onClick={() => trackButtonClick('home-loans-cta', 'Apply Now')}
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
