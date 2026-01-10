import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function OffsetCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [offsetBalance, setOffsetBalance] = useState(50000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculation = useMemo(() => {
    const effectiveLoanAmount = Math.max(0, loanAmount - offsetBalance);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate repayment with offset
    let monthlyRepaymentWithOffset = 0;
    if (monthlyRate === 0) {
      monthlyRepaymentWithOffset = effectiveLoanAmount / numberOfPayments;
    } else {
      monthlyRepaymentWithOffset =
        (effectiveLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    // Calculate repayment without offset
    let monthlyRepaymentWithoutOffset = 0;
    if (monthlyRate === 0) {
      monthlyRepaymentWithoutOffset = loanAmount / numberOfPayments;
    } else {
      monthlyRepaymentWithoutOffset =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const monthlySavings = monthlyRepaymentWithoutOffset - monthlyRepaymentWithOffset;
    const annualSavings = monthlySavings * 12;
    const totalSavings = monthlySavings * numberOfPayments;

    // Calculate interest saved
    const totalInterestWithOffset = monthlyRepaymentWithOffset * numberOfPayments - effectiveLoanAmount;
    const totalInterestWithoutOffset = monthlyRepaymentWithoutOffset * numberOfPayments - loanAmount;
    const interestSaved = totalInterestWithoutOffset - totalInterestWithOffset;

    return {
      monthlyRepaymentWithOffset: Math.round(monthlyRepaymentWithOffset * 100) / 100,
      monthlyRepaymentWithoutOffset: Math.round(monthlyRepaymentWithoutOffset * 100) / 100,
      monthlySavings: Math.round(monthlySavings * 100) / 100,
      annualSavings: Math.round(annualSavings * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100,
      interestSaved: Math.round(interestSaved * 100) / 100,
      effectiveLoanAmount: Math.round(effectiveLoanAmount),
    };
  }, [loanAmount, offsetBalance, interestRate, loanTerm]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Offset Account Calculator
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          See how much you can save with an offset account reducing your loan interest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-heading text-2xl font-bold text-secondary mb-8">Loan Details</h3>

            {/* Loan Amount */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Loan Amount: ${loanAmount.toLocaleString()}
              </label>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                min={100000}
                max={2000000}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$100k</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Offset Balance */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Offset Balance: ${offsetBalance.toLocaleString()}
              </label>
              <Slider
                value={[offsetBalance]}
                onValueChange={(value) => setOffsetBalance(value[0])}
                min={0}
                max={loanAmount}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>${loanAmount.toLocaleString()}</span>
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-sm text-green-900">
                Offset accounts reduce the amount of interest you pay by offsetting your savings against your loan balance.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Monthly Savings</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.monthlySavings.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
              </div>
              <p className="text-white/70 text-sm">
                Annual: ${calculation.annualSavings.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
              </p>
            </motion.div>

            {/* Interest Saved */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Total Interest Saved</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.interestSaved.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
              </div>
              <p className="text-white/70 text-sm">
                Over {loanTerm} years
              </p>
            </motion.div>

            {/* Repayment Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-light-gray rounded-2xl p-8 border border-gray-200 md:col-span-2"
            >
              <h4 className="font-heading text-lg font-semibold text-secondary mb-6">Repayment Comparison</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Without Offset:</span>
                  <span className="font-paragraph font-bold text-foreground text-lg">
                    ${calculation.monthlyRepaymentWithoutOffset.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-paragraph text-gray-600">With Offset:</span>
                  <span className="font-paragraph font-bold text-green-600 text-lg">
                    ${calculation.monthlyRepaymentWithOffset.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="font-paragraph text-gray-600">Monthly Difference:</span>
                  <span className="font-paragraph font-bold text-blue-600 text-lg">
                    ${calculation.monthlySavings.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
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
              <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-6 text-lg font-semibold">
                Find a Loan with Offset
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
