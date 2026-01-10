import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RepaymentCalculator from '@/components/calculators/RepaymentCalculator';
import BorrowingPowerCalculator from '@/components/calculators/BorrowingPowerCalculator';
import OffsetCalculator from '@/components/calculators/OffsetCalculator';
import HomeEquityCalculator from '@/components/calculators/HomeEquityCalculator';
import LMICalculator from '@/components/calculators/LMICalculator';
import DebtConsolidationCalculator from '@/components/calculators/DebtConsolidationCalculator';
import StampDutyCalculator from '@/components/calculators/StampDutyCalculator';
import PropertyReportForm from '@/components/calculators/PropertyReportForm';
import FAQSection from '@/components/calculators/FAQSection';

type CalculatorType = 
  | 'repayment' 
  | 'borrowing' 
  | 'offset' 
  | 'equity' 
  | 'lmi' 
  | 'debt' 
  | 'stampduty' 
  | 'report';

const calculators = [
  { id: 'repayment', name: 'Repayment Calculator', color: 'from-blue-600 to-blue-400' },
  { id: 'borrowing', name: 'Borrowing Power Calculator', color: 'from-purple-600 to-purple-400' },
  { id: 'offset', name: 'Offset Calculator', color: 'from-green-600 to-green-400' },
  { id: 'equity', name: 'Home Equity Calculator', color: 'from-orange-600 to-orange-400' },
  { id: 'lmi', name: 'LMI Calculator', color: 'from-pink-600 to-pink-400' },
  { id: 'debt', name: 'Debt Consolidation Calculator', color: 'from-indigo-600 to-indigo-400' },
  { id: 'stampduty', name: 'Stamp Duty Calculator', color: 'from-red-600 to-red-400' },
  { id: 'report', name: 'Free Property Report', color: 'from-emerald-600 to-emerald-400' },
];

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('repayment');

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'repayment':
        return <RepaymentCalculator />;
      case 'borrowing':
        return <BorrowingPowerCalculator />;
      case 'offset':
        return <OffsetCalculator />;
      case 'equity':
        return <HomeEquityCalculator />;
      case 'lmi':
        return <LMICalculator />;
      case 'debt':
        return <DebtConsolidationCalculator />;
      case 'stampduty':
        return <StampDutyCalculator />;
      case 'report':
        return <PropertyReportForm />;
      default:
        return <RepaymentCalculator />;
    }
  };

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

      {/* Calculator Navigation */}
      <section className="bg-light-gray py-12 sticky top-[73px] z-40 border-b border-gray-200">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id as CalculatorType)}
                className={`px-4 py-3 rounded-lg font-paragraph font-semibold text-sm transition-all duration-300 ${
                  activeCalculator === calc.id
                    ? `bg-gradient-to-r ${calc.color} text-white shadow-lg`
                    : 'bg-white text-foreground border border-gray-200 hover:border-accent'
                }`}
              >
                {calc.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Calculator */}
      <section className="py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderCalculator()}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <FAQSection calculatorType={activeCalculator} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
