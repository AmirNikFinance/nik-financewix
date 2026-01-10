import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function BorrowingPowerCalculator() {
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [existingDebts, setExistingDebts] = useState(0);
  const [deposit, setDeposit] = useState(100000);
  const [dependents, setDependents] = useState(0);

  const calculation = useMemo(() => {
    const totalIncome = annualIncome + otherIncome;
    const monthlyIncome = totalIncome / 12;

    // Serviceability calculation (simplified)
    // Typically lenders use 80-90% of income for serviceability
    const serviceabilityRatio = 0.8;
    const availableForRepayment = monthlyIncome * serviceabilityRatio;

    // Deduct existing debts
    const monthlyDebtRepayment = existingDebts / 12;
    const availableAfterDebts = Math.max(0, availableForRepayment - monthlyDebtRepayment);

    // Estimate borrowing capacity (using 6% interest rate as benchmark)
    const interestRate = 0.06;
    const monthlyRate = interestRate / 12;
    const loanTerm = 30;
    const numberOfPayments = loanTerm * 12;

    let borrowingCapacity = 0;
    if (monthlyRate > 0) {
      borrowingCapacity =
        (availableAfterDebts * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
    }

    // Add deposit to borrowing capacity
    const totalPurchasePrice = borrowingCapacity + deposit;

    // LMI threshold (typically 80% LVR)
    const lmiThreshold = totalPurchasePrice * 0.8;
    const requiresLMI = borrowingCapacity > lmiThreshold;

    return {
      borrowingCapacity: Math.round(borrowingCapacity),
      totalPurchasePrice: Math.round(totalPurchasePrice),
      monthlyIncome: Math.round(monthlyIncome),
      availableForRepayment: Math.round(availableForRepayment),
      requiresLMI,
      lvrRatio: ((borrowingCapacity / totalPurchasePrice) * 100).toFixed(1),
    };
  }, [annualIncome, otherIncome, existingDebts, deposit, dependents]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Borrowing Power Calculator
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          Estimate how much you can borrow based on your income and financial situation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-heading text-2xl font-bold text-secondary mb-8">Your Details</h3>

            {/* Annual Income */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Annual Income: ${annualIncome.toLocaleString()}
              </label>
              <Slider
                value={[annualIncome]}
                onValueChange={(value) => setAnnualIncome(value[0])}
                min={30000}
                max={500000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$30k</span>
                <span>$500k</span>
              </div>
            </div>

            {/* Other Income */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Other Income: ${otherIncome.toLocaleString()}
              </label>
              <Slider
                value={[otherIncome]}
                onValueChange={(value) => setOtherIncome(value[0])}
                min={0}
                max={200000}
                step={5000}
                className="w-full"
              />
            </div>

            {/* Existing Debts */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Existing Debts: ${existingDebts.toLocaleString()}
              </label>
              <Slider
                value={[existingDebts]}
                onValueChange={(value) => setExistingDebts(value[0])}
                min={0}
                max={500000}
                step={10000}
                className="w-full"
              />
            </div>

            {/* Deposit */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Deposit Available: ${deposit.toLocaleString()}
              </label>
              <Slider
                value={[deposit]}
                onValueChange={(value) => setDeposit(value[0])}
                min={0}
                max={500000}
                step={10000}
                className="w-full"
              />
            </div>

            {/* Dependents */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Dependents: {dependents}
              </label>
              <Slider
                value={[dependents]}
                onValueChange={(value) => setDependents(value[0])}
                min={0}
                max={5}
                step={1}
                className="w-full"
              />
            </div>

            {/* Disclaimer */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-sm text-purple-900">
                This is an estimate. Actual borrowing capacity depends on your credit history and lender assessment.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Borrowing Capacity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Borrowing Capacity</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.borrowingCapacity.toLocaleString()}
              </div>
              <p className="text-white/70 text-sm">
                Based on your income and debts
              </p>
            </motion.div>

            {/* Total Purchase Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Total Purchase Price</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.totalPurchasePrice.toLocaleString()}
              </div>
              <p className="text-white/70 text-sm">
                Including your deposit
              </p>
            </motion.div>

            {/* LVR Ratio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <h4 className="font-heading text-lg font-semibold mb-4">Loan to Value Ratio</h4>
              <div className="text-5xl font-bold mb-2">
                {calculation.lvrRatio}%
              </div>
              <p className="text-white/70 text-sm">
                {calculation.requiresLMI ? 'LMI Required' : 'No LMI Required'}
              </p>
            </motion.div>

            {/* Income Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-light-gray rounded-2xl p-8 border border-gray-200"
            >
              <h4 className="font-heading text-lg font-semibold text-secondary mb-6">Income Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-paragraph text-gray-600">Monthly Income:</span>
                  <span className="font-paragraph font-semibold text-foreground">
                    ${calculation.monthlyIncome.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-paragraph text-gray-600">Available for Repayment:</span>
                  <span className="font-paragraph font-semibold text-foreground">
                    ${calculation.availableForRepayment.toLocaleString()}
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
                Get Pre-Approved
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
