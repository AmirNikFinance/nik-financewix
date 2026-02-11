import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, Target, Heart, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { trackButtonClick } from '@/lib/analytics';

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
        title="About NIK Finance | Australian Mortgage & Finance Brokers"
        description="Learn about NIK Finance. We're Australia's trusted finance brokers helping thousands get approved for loans with competitive rates."
        canonical="https://www.nik.finance/about"
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
                About NIK Finance
              </h1>
              <p className="font-paragraph text-lg text-white/90 mb-8">
                We're Australia's trusted finance brokers, helping thousands of customers access competitive loans and achieve their financial goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 font-paragraph text-gray-700 leading-relaxed">
                  <p>
                    NIK Finance was founded with a simple mission: to make finance accessible to every Australian. We believe that everyone deserves access to competitive loans, regardless of their credit history or financial background.
                  </p>
                  <p>
                    For over a decade, we've been helping customers across Australia access home loans, car finance, personal loans, and business financing. Our team of experienced brokers has built strong relationships with Australia's leading lenders, giving us access to rates and products you won't find elsewhere.
                  </p>
                  <p>
                    What started as a small brokerage has grown into one of Australia's most trusted finance brokers. But our core values remain the same: integrity, transparency, and putting our customers first.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-light-gray rounded-lg p-8"
              >
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">10+</div>
                    <p className="font-paragraph text-gray-600">Years of Experience</p>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">5,000+</div>
                    <p className="font-paragraph text-gray-600">Customers Helped</p>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">$500M+</div>
                    <p className="font-paragraph text-gray-600">In Loans Arranged</p>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">50+</div>
                    <p className="font-paragraph text-gray-600">Lender Partnerships</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Core Values
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Heart,
                  title: 'Customer First',
                  desc: 'Your success is our success. We put your needs first in every decision we make.'
                },
                {
                  icon: Award,
                  title: 'Excellence',
                  desc: 'We strive for excellence in everything we do, from service to outcomes.'
                },
                {
                  icon: Zap,
                  title: 'Innovation',
                  desc: 'We continuously innovate to provide faster, better solutions for our customers.'
                },
                {
                  icon: CheckCircle,
                  title: 'Integrity',
                  desc: 'We operate with complete transparency and honesty in all our dealings.'
                },
                {
                  icon: Users,
                  title: 'Community',
                  desc: 'We\'re committed to supporting the Australian communities we serve.'
                },
                {
                  icon: Target,
                  title: 'Results',
                  desc: 'We focus on delivering measurable results and real value for our customers.'
                }
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Icon className="w-8 h-8 text-accent mb-4" />
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="font-paragraph text-gray-600">
                      {value.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Choose NIK Finance?
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {[
                {
                  title: 'Expert Brokers',
                  desc: 'Our team has decades of combined experience in finance and lending.'
                },
                {
                  title: 'Lender Network',
                  desc: 'Access to 50+ lenders means we find the best rates for your situation.'
                },
                {
                  title: 'Fast Approval',
                  desc: 'Most applications approved within 24-48 hours with quick funding.'
                },
                {
                  title: 'Transparent Pricing',
                  desc: 'No hidden fees or surprises. You know exactly what you\'re paying.'
                },
                {
                  title: 'Bad Credit Welcome',
                  desc: 'We specialize in approvals for customers with poor credit history.'
                },
                {
                  title: 'Personalized Service',
                  desc: 'Each customer gets a dedicated broker who understands their needs.'
                },
                {
                  title: 'Competitive Rates',
                  desc: 'We negotiate on your behalf to get the lowest possible rates.'
                },
                {
                  title: 'Full Support',
                  desc: 'We guide you through every step of the application and approval process.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Services
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                {
                  title: 'Home Loans',
                  desc: 'First-time buyers, investors, and refinancing options available.'
                },
                {
                  title: 'Car Finance',
                  desc: 'New and used car loans with competitive rates and flexible terms.'
                },
                {
                  title: 'Personal Loans',
                  desc: 'Flexible personal loans for any purpose with fast approval.'
                },
                {
                  title: 'Business Loans',
                  desc: 'Term loans, equipment finance, and working capital solutions.'
                },
                {
                  title: 'Refinancing',
                  desc: 'Switch to better rates and save thousands on your existing loans.'
                },
                {
                  title: 'Bad Credit Loans',
                  desc: 'Specialized approvals for customers with poor credit history.'
                }
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="font-paragraph text-gray-600 mb-4">
                    {service.desc}
                  </p>
                  <Link
                    to={`/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-accent font-paragraph font-semibold hover:text-primary transition-colors"
                  >
                    Learn More →
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Let our expert brokers help you find the perfect loan. Get in touch today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                onClick={() => trackButtonClick('about-apply', 'Apply Now')}
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
