import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function DebtConsolidationCalculator() {
  const [creditCardDebt, setCreditCardDebt] = useState(15000);
  const [personalLoanDebt, setPersonalLoanDebt] = useState(25000);
  const [carLoanDebt, setCarLoanDebt] = useState(20000);
  const [otherDebt, setOtherDebt] = useState(10000);
  const [consolidationRate, setConsolidationRate] = useState(5.5);
  const [consolidationTerm, setConsolidationTerm] = useState(7);

  const calculation = useMemo(() => {
    const totalDebt = creditCardDebt + personalLoanDebt + carLoanDebt + otherDebt;

    // Current interest costs (estimated)
    const creditCardRate = 0.19; // 19% p.a.
    const personalLoanRate = 0.08; // 8% p.a.
    const carLoanRate = 0.065; // 6.5% p.a.
    const otherRate = 0.10; // 10% p.a.

    const currentMonthlyInterest =
      (creditCardDebt * creditCardRate) / 12 +
      (personalLoanDebt * personalLoanRate) / 12 +
      (carLoanDebt * carLoanRate) / 12 +
      (otherDebt * otherRate) / 12;

    // Consolidation loan calculation
    const monthlyRate = consolidationRate / 100 / 12;
    const numberOfPayments = consolidationTerm * 12;

    let monthlyRepayment = 0;
    if (monthlyRate === 0) {
      monthlyRepayment = totalDebt / numberOfPayments;
    } else {
      monthlyRepayment =
        (totalDebt * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalRepayment = monthlyRepayment * numberOfPayments;
    const totalInterest = totalRepayment - totalDebt;

    // Savings calculation
    const currentMonthlyRepayment = currentMonthlyInterest * 2; // Rough estimate
    const monthlySavings = currentMonthlyRepayment - monthlyRepayment;
    const totalSavings = (currentMonthlyRepayment * numberOfPayments) - totalRepayment;

    return {
      totalDebt: Math.round(totalDebt),
      monthlyRepayment: Math.round(monthlyRepayment),
      totalInterest: Math.round(totalInterest),
      totalRepayment: Math.round(totalRepayment),
      currentMonthlyInterest: Math.round(currentMonthlyInterest),
      monthlySavings: Math.round(Math.max(0, monthlySavings)),
      totalSavings: Math.round(Math.max(0, totalSavings)),
    };
  }, [creditCardDebt, personalLoanDebt, carLoanDebt, otherDebt, consolidationRate, consolidationTerm]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Debt Consolidation Calculator
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          See how much you could save by consolidating multiple debts into one loan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-heading text-2xl font-bold text-secondary mb-8">Your Debts</h3>

            {/* Credit Card Debt */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Credit Card: ${creditCardDebt.toLocaleString()}
              </label>
              <Slider
                value={[creditCardDebt]}
                onValueChange={(value) => setCreditCardDebt(value[0])}
                min={0}
                max={100000}
                step={1000}
                className="w-full"
              />
            </div>

            {/* Personal Loan Debt */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Personal Loan: ${personalLoanDebt.toLocaleString()}
              </label>
              <Slider
                value={[personalLoanDebt]}
                onValueChange={(value) => setPersonalLoanDebt(value[0])}
                min={0}
                max={100000}
                step={1000}
                className="w-full"
              />
            </div>

            {/* Car Loan Debt */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Car Loan: ${carLoanDebt.toLocaleString()}
              </label>
              <Slider
                value={[carLoanDebt]}
                onValueChange={(value) => setCarLoanDebt(value[0])}
                min={0}
                max={100000}
                step={1000}
                className="w-full"
              />
            </div>

            {/* Other Debt */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Other Debt: ${otherDebt.toLocaleString()}
              </label>
              <Slider
                value={[otherDebt]}
                onValueChange={(value) => setOtherDebt(value[0])}
                min={0}
                max={100000}
                step={1000}
                className="w-full"
              />
            </div>

            {/* Consolidation Rate */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Consolidation Rate: {consolidationRate.toFixed(2)}%
              </label>
              <Slider
                value={[consolidationRate]}
                onValueChange={(value) => setConsolidationRate(value[0])}
                min={2}
                max={12}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Consolidation Term */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Loan Term: {consolidationTerm} years
              </label>
              <Slider
                value={[consolidationTerm]}
                onValueChange={(value) => setConsolidationTerm(value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            {/* Disclaimer */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-sm text-indigo-900">
                Consolidation can help, but ensure you don't accumulate new debt.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Debt */}
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
                <h4 className="font-heading text-lg font-semibold">Total Debt</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.totalDebt.toLocaleString()}
              </div>
              <p className="text-white/70 text-sm">
                To be consolidated
              </p>
            </motion.div>

            {/* Monthly Savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Monthly Savings</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.monthlySavings.toLocaleString()}
              </div>
              <p className="text-white/70 text-sm">
                Estimated savings
              </p>
            </motion.div>

            {/* Consolidation Loan Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-light-gray rounded-2xl p-8 border border-gray-200 md:col-span-2"
            >
              <h4 className="font-heading text-lg font-semibold text-secondary mb-6">Consolidation Loan</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Monthly Repayment:</span>
                  <span className="font-paragraph font-bold text-foreground text-lg">
                    ${calculation.monthlyRepayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Total Interest:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${calculation.totalInterest.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Total Repayment:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${calculation.totalRepayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-paragraph text-gray-600">Total Savings:</span>
                  <span className="font-paragraph font-bold text-green-600">
                    ${calculation.totalSavings.toLocaleString()}
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
                Consolidate Your Debts
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
