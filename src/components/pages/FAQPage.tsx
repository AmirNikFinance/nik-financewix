import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { trackButtonClick } from '@/lib/analytics';

export default function FAQPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const faqCategories = [
    {
      category: 'General Questions',
      items: [
        {
          question: 'What is NIK Finance?',
          answer: 'NIK Finance is an Australian mortgage and finance brokerage. We help customers access competitive loans including home loans, car finance, personal loans, and business financing. Our brokers work with 50+ lenders to find the best rates and terms for your situation.'
        },
        {
          question: 'How do finance brokers work?',
          answer: 'Finance brokers like NIK Finance act as intermediaries between you and lenders. We assess your financial situation, compare options from multiple lenders, and help you find the best loan for your needs. We handle all the paperwork and communication with lenders.'
        },
        {
          question: 'Do I have to pay for your services?',
          answer: 'Most of our services are free for customers. We\'re paid commissions by lenders when we arrange loans. This means you get expert advice and access to competitive rates at no cost to you.'
        },
        {
          question: 'How long have you been in business?',
          answer: 'NIK Finance has over 10 years of experience in the finance industry. We\'ve helped over 5,000 customers arrange more than $500 million in loans.'
        }
      ]
    },
    {
      category: 'Application & Approval',
      items: [
        {
          question: 'How do I apply for a loan?',
          answer: 'You can apply online through our website in just 10-15 minutes. You\'ll need basic information about your income, employment, and the loan purpose. Once submitted, our team reviews your application and contacts you with an approval decision.'
        },
        {
          question: 'How long does approval take?',
          answer: 'Most loan applications are approved within 24-48 hours. The exact timeline depends on the loan type and how quickly you provide required documentation. We expedite the process by managing all communication with lenders.'
        },
        {
          question: 'What documents do I need?',
          answer: 'Required documents typically include proof of income (payslips), proof of identity, proof of residence, and bank statements. For home loans, you\'ll also need property details. We\'ll provide a complete list based on your specific situation.'
        },
        {
          question: 'Can I apply if I\'m self-employed?',
          answer: 'Yes! We work with lenders who approve self-employed applicants. You\'ll typically need to provide 2 years of tax returns and financial statements. Our brokers can guide you through the process.'
        }
      ]
    },
    {
      category: 'Credit & Eligibility',
      items: [
        {
          question: 'Can I get a loan with bad credit?',
          answer: 'Yes! We specialize in loans for customers with poor credit history. We work with lenders who focus on your current situation and ability to repay, rather than just your credit history. Options are available for defaults, missed payments, and previous rejections.'
        },
        {
          question: 'What credit score do I need?',
          answer: 'There\'s no minimum credit score requirement. We work with lenders across the credit spectrum. Even with a low credit score, you may be eligible for a loan. We assess your overall financial situation.'
        },
        {
          question: 'Will applying affect my credit score?',
          answer: 'When you apply for a loan, lenders perform a credit check which may temporarily lower your score by a few points. However, this impact is minimal and temporary. Multiple applications within a short period may have a larger impact.'
        },
        {
          question: 'Can I get a loan if I\'ve been rejected before?',
          answer: 'Yes! Previous rejections don\'t disqualify you. We have access to lenders who may approve applications that other lenders have rejected. We\'ll work with you to find options.'
        }
      ]
    },
    {
      category: 'Rates & Fees',
      items: [
        {
          question: 'How are interest rates determined?',
          answer: 'Interest rates depend on several factors including loan type, amount, term, your credit score, income, and current market conditions. We compare rates from multiple lenders to ensure you get the best available rate.'
        },
        {
          question: 'Are there hidden fees?',
          answer: 'No! We believe in transparent pricing. We\'ll provide a complete breakdown of all fees including application fees, valuation fees, and legal fees. You\'ll know exactly what you\'re paying before you commit.'
        },
        {
          question: 'Can I negotiate the interest rate?',
          answer: 'Yes! Our brokers negotiate on your behalf with lenders. We work to secure the lowest possible rate for your situation. In many cases, we can negotiate better rates than you\'d get applying directly to a lender.'
        },
        {
          question: 'What fees do you charge?',
          answer: 'We don\'t charge customers any fees. We\'re paid commissions by lenders. This means you get expert advice and access to competitive rates at no cost to you.'
        }
      ]
    },
    {
      category: 'Loan Types',
      items: [
        {
          question: 'What types of loans do you offer?',
          answer: 'We offer home loans, car finance, personal loans, business loans, refinancing, and bad credit loans. Each loan type has different terms, rates, and eligibility requirements. We help you find the right loan for your needs.'
        },
        {
          question: 'What\'s the difference between fixed and variable rates?',
          answer: 'Fixed-rate loans have the same interest rate for the entire loan term, providing certainty in your payments. Variable-rate loans have rates that can change based on market conditions. We help you choose the right option for your situation.'
        },
        {
          question: 'Can I refinance my existing loan?',
          answer: 'Yes! Refinancing allows you to switch to a better interest rate or more favorable terms. Many customers save thousands by refinancing. We compare options from multiple lenders to find the best refinancing deal.'
        },
        {
          question: 'What\'s the difference between secured and unsecured loans?',
          answer: 'Secured loans require collateral (like a property or vehicle) and typically have lower interest rates. Unsecured loans don\'t require collateral but may have higher rates. We help you understand the pros and cons of each.'
        }
      ]
    },
    {
      category: 'Specific Situations',
      items: [
        {
          question: 'Can first-time home buyers get a loan?',
          answer: 'Yes! We specialize in first-time buyer loans. We can help with deposit assistance, explain LMI, and find lenders with first-time buyer programs. Our brokers guide you through the entire process.'
        },
        {
          question: 'Can I get a loan as a contractor or casual worker?',
          answer: 'Yes! We work with lenders who approve contractors and casual workers. You\'ll typically need to provide evidence of consistent income. We help assess your eligibility.'
        },
        {
          question: 'Can I get a loan if I\'m on a pension or benefits?',
          answer: 'Yes! Some lenders approve applicants receiving pensions or government benefits. We assess your situation and connect you with appropriate lenders.'
        },
        {
          question: 'Can I get a loan if I\'ve had a bankruptcy?',
          answer: 'Yes! We work with lenders who approve applicants with previous bankruptcies. The time since the bankruptcy and your current financial situation are important factors.'
        }
      ]
    },
    {
      category: 'After Approval',
      items: [
        {
          question: 'What happens after I\'m approved?',
          answer: 'After approval, you\'ll receive a formal loan offer. Once you accept, we arrange settlement (for home loans) or funding. For most loans, funds are deposited within 1-2 business days.'
        },
        {
          question: 'Can I pay off my loan early?',
          answer: 'Yes! Most loans allow early repayment. Some loans may have early repayment fees, but many don\'t. We\'ll explain any fees before you commit to the loan.'
        },
        {
          question: 'Can I change my loan terms after approval?',
          answer: 'In some cases, yes. You may be able to adjust your loan term, switch between fixed and variable rates, or make other changes. Contact your lender to discuss options.'
        },
        {
          question: 'What if I have trouble making payments?',
          answer: 'If you\'re having difficulty with payments, contact your lender immediately. Many lenders offer hardship assistance including payment deferrals or loan restructuring. We can help you navigate this process.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <SEO 
        title="FAQ | Frequently Asked Questions | NIK Finance"
        description="Find answers to common questions about loans, finance, and NIK Finance services. Get expert guidance on home loans, car finance, and more."
        canonical="https://www.nik.finance/faq"
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
                Frequently Asked Questions
              </h1>
              <p className="font-paragraph text-lg text-white/90">
                Find answers to common questions about loans, finance, and our services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="font-paragraph text-gray-600">
                  No results found. Try a different search term.
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-12"
              >
                {filteredCategories.map((category, catIdx) => (
                  <motion.div key={catIdx} variants={itemVariants}>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                      {category.category}
                    </h2>
                    <div className="space-y-4">
                      {category.items.map((item, itemIdx) => (
                        <motion.details
                          key={itemIdx}
                          variants={itemVariants}
                          className="bg-light-gray rounded-lg p-6 cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          <summary className="flex items-start gap-3 font-heading font-semibold text-foreground">
                            <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                            <span>{item.question}</span>
                          </summary>
                          <p className="font-paragraph text-gray-700 mt-4 ml-8">
                            {item.answer}
                          </p>
                        </motion.details>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Didn't Find Your Answer?
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Our expert brokers are here to help. Get in touch with any questions about loans or our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-accent text-white font-paragraph font-semibold px-8 py-3 rounded-lg hover:bg-accent/90 transition-all duration-300"
              >
                Contact Us
              </Link>
              <a
                href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                onClick={() => trackButtonClick('faq-apply', 'Apply Now')}
                className="bg-white text-primary font-paragraph font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                Apply Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
