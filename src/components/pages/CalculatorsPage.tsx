import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const calculators = [
  { 
    id: 'repayment', 
    name: 'Loan Repayment Calculator', 
    description: 'Calculate your monthly loan repayments with principal and interest or interest-only options.',
    path: '/repayment-calculator'
  },
  { 
    id: 'borrowing', 
    name: 'Borrowing Power Calculator', 
    description: 'Discover how much you can borrow based on your income and expenses.',
    path: '/borrowing-power-calculator'
  },
  { 
    id: 'offset', 
    name: 'Offset Account Calculator', 
    description: 'Calculate how much interest you can save with an offset account.',
    path: '/offset-calculator'
  },
  { 
    id: 'equity', 
    name: 'Home Equity Calculator', 
    description: 'Calculate your home equity and understand your borrowing potential.',
    path: '/home-equity-calculator'
  },
  { 
    id: 'propertyequity', 
    name: 'Property Equity Calculator', 
    description: 'Track your investment property equity and portfolio growth.',
    path: '/property-equity-calculator'
  },
  { 
    id: 'lmi', 
    name: 'LMI Calculator', 
    description: 'Calculate your Lenders Mortgage Insurance costs instantly.',
    path: '/lmi-calculator'
  },
  { 
    id: 'debt', 
    name: 'Debt Consolidation Calculator', 
    description: 'See how much you can save by consolidating your debts.',
    path: '/debt-consolidation-calculator'
  },
  { 
    id: 'stampduty', 
    name: 'Stamp Duty Calculator', 
    description: 'Calculate your stamp duty costs for all Australian states.',
    path: '/stamp-duty-calculator'
  },
];

export default function CalculatorsPage() {

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              Financial <span className="text-accent">Calculators</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Use our Australian-specific financial calculators to plan your borrowing, understand your repayments, and make informed financial decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc, index) => (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={calc.path} className="group">
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 h-full hover:shadow-lg hover:border-secondary transition-all duration-300">
                    <h3 className="font-heading text-2xl font-bold text-secondary mb-4 group-hover:text-accent transition-colors">
                      {calc.name}
                    </h3>
                    <p className="font-paragraph text-gray-700 mb-6">
                      {calc.description}
                    </p>
                    <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                      <span>Access Calculator</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-6">
            Need Expert Guidance?
          </h2>
          <p className="font-paragraph text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Our lending specialists can help you interpret your calculator results and find the perfect loan solution for your financial goals.
          </p>
          <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer" className="inline-block bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-colors">
            Get Expert Advice
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
