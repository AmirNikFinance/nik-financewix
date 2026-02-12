import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RepaymentCalculator from '@/components/calculators/RepaymentCalculator';
import BorrowingPowerCalculator from '@/components/calculators/BorrowingPowerCalculator';
import OffsetCalculator from '@/components/calculators/OffsetCalculator';
import HomeEquityCalculator from '@/components/calculators/HomeEquityCalculator';
import PropertyEquityCalculator from '@/components/calculators/PropertyEquityCalculator';
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
  | 'propertyequity'
  | 'lmi' 
  | 'debt' 
  | 'stampduty' 
  | 'report';

const calculators = [
  { id: 'repayment', name: 'Repayment Calculator' },
  { id: 'borrowing', name: 'Borrowing Power Calculator' },
  { id: 'offset', name: 'Offset Calculator' },
  { id: 'equity', name: 'Home Equity Calculator' },
  { id: 'propertyequity', name: 'Property Equity Calculator' },
  { id: 'lmi', name: 'LMI Calculator' },
  { id: 'debt', name: 'Debt Consolidation Calculator' },
  { id: 'stampduty', name: 'Stamp Duty Calculator' },
  { id: 'report', name: 'Free Property Report' },
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
      case 'propertyequity':
        return <PropertyEquityCalculator />;
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
      <section className="bg-light-gray py-8 md:py-12 sticky top-[73px] z-40 border-b border-gray-200">
        <div className="max-w-[100rem] mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id as CalculatorType)}
                className={`px-3 md:px-4 py-2 md:py-3 rounded-lg font-paragraph font-semibold text-xs md:text-sm whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                  activeCalculator === calc.id
                    ? 'bg-secondary text-white shadow-lg'
                    : 'bg-white text-foreground border border-gray-200 hover:border-secondary'
                }`}
              >
                <span className="hidden md:inline">{calc.name}</span>
                <span className="md:hidden">{calc.name.split(' ')[0]}</span>
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
