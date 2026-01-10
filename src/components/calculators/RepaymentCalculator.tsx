import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Percent, Calendar, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

type LoanType = 'principal-interest' | 'interest-only';

export default function RepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [loanType, setLoanType] = useState<LoanType>('principal-interest');

  const calculation = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyRepayment = 0;
    let totalInterest = 0;
    let totalRepayment = 0;

    if (loanType === 'principal-interest') {
      if (monthlyRate === 0) {
        monthlyRepayment = principal / numberOfPayments;
      } else {
        monthlyRepayment =
          (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }
      totalRepayment = monthlyRepayment * numberOfPayments;
      totalInterest = totalRepayment - principal;
    } else {
      // Interest-only
      monthlyRepayment = principal * monthlyRate;
      totalInterest = monthlyRepayment * numberOfPayments;
      totalRepayment = principal + totalInterest;
    }

    return {
      monthlyRepayment: Math.round(monthlyRepayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalRepayment: Math.round(totalRepayment * 100) / 100,
      weeklyRepayment: Math.round((monthlyRepayment / 4.33) * 100) / 100,
      fortnightlyRepayment: Math.round((monthlyRepayment / 2.17) * 100) / 100,
    };
  }, [loanAmount, interestRate, loanTerm, loanType]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Loan Repayment Calculator
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate your monthly loan repayments with principal and interest or interest-only options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-heading text-2xl font-bold text-secondary mb-8">Loan Details</h3>

            {/* Loan Type Selection */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Loan Type
              </label>
              <div className="flex gap-4">
                {(['principal-interest', 'interest-only'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setLoanType(type)}
                    className={`flex-1 px-4 py-3 rounded-lg font-paragraph font-semibold transition-all ${
                      loanType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-foreground hover:bg-gray-200'
                    }`}
                  >
                    {type === 'principal-interest' ? 'P&I' : 'Interest Only'}
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Amount */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Loan Amount: ${loanAmount.toLocaleString()}
              </label>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                min={50000}
                max={2000000}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$50k</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Interest Rate: {interestRate.toFixed(2)}%
              </label>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                min={1}
                max={12}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1%</span>
                <span>12%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Loan Term: {loanTerm} years
              </label>
              <Slider
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
                min={1}
                max={40}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1 year</span>
                <span>40 years</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-sm text-blue-900">
                Rates are indicative. Actual repayments may vary based on your lender and loan features.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Repayment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Monthly Repayment</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.monthlyRepayment.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
              </div>
              <p className="text-white/70 text-sm">
                Weekly: ${calculation.weeklyRepayment.toLocaleString('en-AU', { maximumFractionDigits: 0 })} | 
                Fortnightly: ${calculation.fortnightlyRepayment.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
              </p>
            </motion.div>

            {/* Total Interest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Percent className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Total Interest</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.totalInterest.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
              </div>
              <p className="text-white/70 text-sm">
                Over {loanTerm} years
              </p>
            </motion.div>

            {/* Total Repayment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Total Repayment</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.totalRepayment.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
              </div>
              <p className="text-white/70 text-sm">
                Principal + Interest
              </p>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-light-gray rounded-2xl p-8 border border-gray-200"
            >
              <h4 className="font-heading text-lg font-semibold text-secondary mb-6">Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-paragraph text-gray-600">Loan Amount:</span>
                  <span className="font-paragraph font-semibold text-foreground">
                    ${loanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-paragraph text-gray-600">Interest Rate:</span>
                  <span className="font-paragraph font-semibold text-foreground">
                    {interestRate.toFixed(2)}% p.a.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-paragraph text-gray-600">Loan Term:</span>
                  <span className="font-paragraph font-semibold text-foreground">
                    {loanTerm} years
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-300">
                  <span className="font-paragraph text-gray-600">Loan Type:</span>
                  <span className="font-paragraph font-semibold text-foreground">
                    {loanType === 'principal-interest' ? 'Principal & Interest' : 'Interest Only'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl py-6 text-lg font-semibold">
                Get a Loan Quote
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
