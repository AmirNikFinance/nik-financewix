import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, HelpCircle, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/lib/analytics';

export default function CarLoansPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const faqItems = [
    {
      question: 'What is the typical interest rate for car loans in Australia?',
      answer: 'Car loan interest rates in Australia typically range from 4.5% to 8.5% depending on your credit score, loan amount, vehicle age, and lender. We can help you find competitive rates tailored to your situation.'
    },
    {
      question: 'Can I get a car loan with bad credit?',
      answer: 'Yes! We specialize in helping customers with poor credit history secure car financing. While rates may be higher, our network of lenders offers options specifically designed for bad credit situations.'
    },
    {
      question: 'How long does the car loan approval process take?',
      answer: 'Most car loan applications are approved within 24-48 hours. Our streamlined process means you can get behind the wheel faster than traditional bank applications.'
    },
    {
      question: 'What documents do I need for a car loan application?',
      answer: 'You\'ll typically need proof of income (payslips), proof of identity, proof of residence, and bank statements. We\'ll guide you through the exact requirements based on your situation.'
    },
    {
      question: 'Can I refinance my existing car loan?',
      answer: 'Absolutely! If you\'re paying high interest rates, refinancing could save you thousands. We can help you find better rates and potentially reduce your monthly payments.'
    },
    {
      question: 'What\'s the maximum loan amount for a car?',
      answer: 'Loan amounts typically range from $5,000 to $100,000+ depending on the vehicle value, your income, and credit history. We can help determine your borrowing capacity.'
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
        title="Car Loans Australia | Fast & Flexible Car Finance | NIK Finance"
        description="Get approved for car loans fast. Competitive rates, flexible terms, and bad credit options. Apply online today for car finance in Australia."
        canonical="https://nikfinance.com.au/car-loans"
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
                Car Loans Australia
              </h1>
              <p className="font-paragraph text-lg text-white/90 mb-8">
                Get approved for car finance fast with competitive rates and flexible terms. Whether you're buying a new car, used vehicle, or refinancing your existing loan, we have solutions for every situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                  onClick={() => trackButtonClick('car-loans-apply', 'Apply Now')}
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
                { title: 'Fast Approval', desc: 'Get approved in 24-48 hours with our streamlined process' },
                { title: 'Competitive Rates', desc: 'Access rates from 4.5% with our network of lenders' },
                { title: 'Bad Credit OK', desc: 'Specializing in approvals for customers with poor credit' },
                { title: 'Flexible Terms', desc: 'Choose loan terms from 1 to 7 years to suit your budget' },
                { title: 'No Hidden Fees', desc: 'Transparent pricing with no surprise charges' },
                { title: 'Expert Advice', desc: 'Our brokers guide you through every step' }
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
              How Car Loans Work
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {[
                { step: '1', title: 'Apply Online', desc: 'Complete our simple online application in minutes' },
                { step: '2', title: 'Get Approved', desc: 'Receive approval decision within 24-48 hours' },
                { step: '3', title: 'Choose Vehicle', desc: 'Select your car and finalize the details' },
                { step: '4', title: 'Drive Away', desc: 'Get the keys and start enjoying your new car' }
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
                Why Choose NIK Finance for Car Loans?
              </h2>
              <div className="space-y-6 font-paragraph text-gray-700 leading-relaxed">
                <p>
                  At NIK Finance, we understand that getting a car loan shouldn't be complicated. Whether you're a first-time buyer, looking to upgrade your vehicle, or refinancing an existing loan, our team of experienced brokers is here to help you find the best car finance solution.
                </p>
                <p>
                  Our network includes Australia's leading lenders, giving us access to competitive rates and flexible terms that you won't find elsewhere. We work with customers of all credit backgrounds, including those with bad credit, defaults, or previous loan rejections.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Car Loan Options Available
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>New Car Loans:</strong> Finance brand new vehicles with manufacturer warranties</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Used Car Loans:</strong> Get approved for used vehicles up to 10+ years old</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Car Refinancing:</strong> Lower your rate and reduce monthly payments</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Bad Credit Car Loans:</strong> Specialized approvals for poor credit situations</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span><strong>Novated Leases:</strong> Tax-effective car financing for employees</span>
                  </li>
                </ul>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Competitive Car Loan Rates
                </h3>
                <p>
                  Car loan interest rates in Australia vary based on several factors including your credit score, loan amount, vehicle age, and loan term. Our current rates start from 4.5% p.a. for well-qualified applicants, with options available for all credit profiles.
                </p>
                <p>
                  We compare rates from multiple lenders to ensure you get the best deal. Our brokers negotiate on your behalf to secure the lowest possible rate for your situation.
                </p>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
                  Quick Application Process
                </h3>
                <p>
                  Our online application takes just 10-15 minutes to complete. You'll need basic information about your income, employment, and the vehicle you're interested in. Once submitted, our team reviews your application and contacts you with an approval decision within 24-48 hours.
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
              Ready to Get Your Car Loan?
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Apply now and get approved for car finance in as little as 24 hours. No hidden fees, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                onClick={() => trackButtonClick('car-loans-cta', 'Apply Now')}
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
