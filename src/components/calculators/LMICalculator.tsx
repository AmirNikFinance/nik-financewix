import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function LMICalculator() {
  const [propertyPrice, setPropertyPrice] = useState(600000);
  const [deposit, setDeposit] = useState(60000);
  const [loanAmount, setLoanAmount] = useState(540000);

  // LMI rates based on LVR (simplified Australian rates)
  const lmiRates: Record<string, number> = {
    '80-85': 0.0145,
    '85-90': 0.0245,
    '90-95': 0.0365,
    '95-100': 0.0485,
  };

  const calculation = useMemo(() => {
    const lvr = (loanAmount / propertyPrice) * 100;
    const actualDeposit = propertyPrice - loanAmount;
    const depositPercentage = (actualDeposit / propertyPrice) * 100;

    let lmiRate = 0;
    let lmiCategory = '';

    if (lvr <= 80) {
      return {
        lvr: lvr.toFixed(1),
        depositPercentage: depositPercentage.toFixed(1),
        lmiRequired: false,
        lmiAmount: 0,
        lmiRate: 0,
        lmiCategory: 'No LMI Required',
        totalLoanWithLMI: loanAmount,
        monthlyRepayment: 0,
      };
    } else if (lvr <= 85) {
      lmiRate = lmiRates['80-85'];
      lmiCategory = '80-85% LVR';
    } else if (lvr <= 90) {
      lmiRate = lmiRates['85-90'];
      lmiCategory = '85-90% LVR';
    } else if (lvr <= 95) {
      lmiRate = lmiRates['90-95'];
      lmiCategory = '90-95% LVR';
    } else {
      lmiRate = lmiRates['95-100'];
      lmiCategory = '95-100% LVR';
    }

    const lmiAmount = Math.round(loanAmount * lmiRate);
    const totalLoanWithLMI = loanAmount + lmiAmount;

    // Estimate monthly repayment at 6.5% interest over 30 years
    const interestRate = 0.065;
    const monthlyRate = interestRate / 12;
    const numberOfPayments = 30 * 12;
    const monthlyRepayment =
      (totalLoanWithLMI * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return {
      lvr: lvr.toFixed(1),
      depositPercentage: depositPercentage.toFixed(1),
      lmiRequired: true,
      lmiAmount,
      lmiRate: (lmiRate * 100).toFixed(2),
      lmiCategory,
      totalLoanWithLMI: Math.round(totalLoanWithLMI),
      monthlyRepayment: Math.round(monthlyRepayment),
    };
  }, [propertyPrice, loanAmount]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          LMI Calculator
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate Lenders Mortgage Insurance costs for loans with less than 20% deposit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-heading text-2xl font-bold text-secondary mb-8">Loan Details</h3>

            {/* Property Price */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Property Price: ${propertyPrice.toLocaleString()}
              </label>
              <Slider
                value={[propertyPrice]}
                onValueChange={(value) => setPropertyPrice(value[0])}
                min={200000}
                max={2000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$200k</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Deposit */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Deposit: ${deposit.toLocaleString()} ({((deposit / propertyPrice) * 100).toFixed(1)}%)
              </label>
              <Slider
                value={[deposit]}
                onValueChange={(value) => setDeposit(value[0])}
                min={0}
                max={propertyPrice * 0.5}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>${(propertyPrice * 0.5).toLocaleString()}</span>
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
                min={propertyPrice * 0.5}
                max={propertyPrice}
                step={10000}
                className="w-full"
              />
            </div>

            {/* Disclaimer */}
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-sm text-pink-900">
                LMI rates are indicative. Actual rates vary by lender and loan features.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LMI Amount */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-2xl p-8 text-white shadow-lg ${
                calculation.lmiRequired
                  ? 'bg-gradient-to-br from-pink-600 to-pink-400'
                  : 'bg-gradient-to-br from-green-600 to-green-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">
                  {calculation.lmiRequired ? 'LMI Cost' : 'No LMI Required'}
                </h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.lmiAmount.toLocaleString()}
              </div>
              <p className={`text-sm ${calculation.lmiRequired ? 'text-pink-100' : 'text-green-100'}`}>
                {calculation.lmiCategory}
              </p>
            </motion.div>

            {/* LVR Ratio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-2xl p-8 text-white shadow-lg"
            >
              <h4 className="font-heading text-lg font-semibold mb-4">Loan to Value Ratio</h4>
              <div className="text-5xl font-bold mb-2">
                {calculation.lvr}%
              </div>
              <p className="text-indigo-100 text-sm">
                Deposit: {calculation.depositPercentage}%
              </p>
            </motion.div>

            {/* Loan Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-light-gray rounded-2xl p-8 border border-gray-200 md:col-span-2"
            >
              <h4 className="font-heading text-lg font-semibold text-secondary mb-6">Loan Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Property Price:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${propertyPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Deposit:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${deposit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Loan Amount:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${loanAmount.toLocaleString()}
                  </span>
                </div>
                {calculation.lmiRequired && (
                  <>
                    <div className="flex justify-between items-center p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <span className="font-paragraph text-gray-600">LMI Cost:</span>
                      <span className="font-paragraph font-bold text-pink-600">
                        ${calculation.lmiAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="font-paragraph text-gray-600">Total Loan (with LMI):</span>
                      <span className="font-paragraph font-bold text-blue-600">
                        ${calculation.totalLoanWithLMI.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
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
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl py-6 text-lg font-semibold">
                Get a Loan Quote
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
