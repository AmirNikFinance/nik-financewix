import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, Target, Heart, Zap, Shield, Cpu, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import { trackButtonClick } from '@/lib/analytics';

export default function AboutPageClient() {
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
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'NIK Finance',
          'url': 'https://www.nik.finance',
          'founder': {
            '@type': 'Person',
            'name': 'Amir Nikibin',
            'jobTitle': 'Founder',
            'description': 'Founder of NIK Finance with expertise in finance and technology'
          },
          'sameAs': [
            'https://www.nik.finance'
          ]
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-20 md:py-32">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                About NIK Finance
              </h1>
              <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
                Australia's trusted finance brokers helping thousands get approved for loans with competitive rates.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-6">
                  Our Mission
                </h2>
                <p className="font-paragraph text-lg text-gray-600 mb-6 leading-relaxed">
                  At NIK Finance, we believe everyone deserves access to fair, transparent, and competitive loan options. Our mission is to simplify the lending process and connect Australians with the right financial solutions for their unique circumstances.
                </p>
                <p className="font-paragraph text-lg text-gray-600 leading-relaxed">
                  With over 10 years of experience and relationships with 50+ lenders, we've helped over 5,000 customers arrange more than $500 million in loans.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { icon: TrendingUp, label: '5000+', desc: 'Customers Served' },
                  { icon: Award, label: '$500M+', desc: 'Loans Arranged' },
                  { icon: Users, label: '50+', desc: 'Lender Partners' },
                  { icon: CheckCircle, label: '10+', desc: 'Years Experience' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-light-gray rounded-2xl p-6 text-center">
                    <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                    <div className="font-heading text-2xl font-bold text-secondary mb-1">{stat.label}</div>
                    <div className="font-paragraph text-sm text-gray-600">{stat.desc}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-32 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-6">
                Our Core Values
              </h2>
              <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { icon: Heart, title: 'Customer First', desc: 'Your needs come before everything else' },
                { icon: Shield, title: 'Transparency', desc: 'No hidden fees or surprises' },
                { icon: Zap, title: 'Speed', desc: 'Fast approvals and efficient service' },
                { icon: Target, title: 'Expertise', desc: 'Knowledgeable advisors ready to help' },
                { icon: Cpu, title: 'Innovation', desc: 'Leveraging technology for better outcomes' },
                { icon: Award, title: 'Excellence', desc: 'Committed to the highest standards' }
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <value.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-secondary mb-3">{value.title}</h3>
                  <p className="font-paragraph text-gray-600">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-secondary text-white">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="font-paragraph text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let our experts help you find the perfect loan solution for your needs.
              </p>
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('about-get-started', 'Get Started')}
                className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-10 py-4 rounded-full transition-all hover:scale-105"
              >
                Get Started Today
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
