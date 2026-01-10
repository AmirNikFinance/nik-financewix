import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Home, TrendingUp, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function HomeEquityCalculator() {
  const [propertyValue, setPropertyValue] = useState(800000);
  const [mortgageBalance, setMortgageBalance] = useState(500000);
  const [equityPercentage, setEquityPercentage] = useState(80);

  const calculation = useMemo(() => {
    const equity = propertyValue - mortgageBalance;
    const equityPercentageActual = (equity / propertyValue) * 100;
    
    // Maximum borrowing at 80% LVR
    const maxBorrowingAt80LVR = propertyValue * 0.8;
    const availableToBorrow = Math.max(0, maxBorrowingAt80LVR - mortgageBalance);
    
    // At custom equity percentage
    const maxBorrowingAtCustom = propertyValue * (equityPercentage / 100);
    const availableToborrowCustom = Math.max(0, maxBorrowingAtCustom - mortgageBalance);

    return {
      equity: Math.round(equity),
      equityPercentageActual: equityPercentageActual.toFixed(1),
      availableToBorrow: Math.round(availableToBorrow),
      availableTo借rowCustom: Math.round(availableToborrowCustom),
      maxBorrowingAt80LVR: Math.round(maxBorrowingAt80LVR),
    };
  }, [propertyValue, mortgageBalance, equityPercentage]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Home Equity Calculator
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate your home equity and see how much you can borrow against it.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-heading text-2xl font-bold text-secondary mb-8">Property Details</h3>

            {/* Property Value */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Property Value: ${propertyValue.toLocaleString()}
              </label>
              <Slider
                value={[propertyValue]}
                onValueChange={(value) => setPropertyValue(value[0])}
                min={200000}
                max={3000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$200k</span>
                <span>$3M</span>
              </div>
            </div>

            {/* Mortgage Balance */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Mortgage Balance: ${mortgageBalance.toLocaleString()}
              </label>
              <Slider
                value={[mortgageBalance]}
                onValueChange={(value) => setMortgageBalance(value[0])}
                min={0}
                max={propertyValue}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>${propertyValue.toLocaleString()}</span>
              </div>
            </div>

            {/* Equity Percentage */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Max LVR: {equityPercentage}%
              </label>
              <Slider
                value={[equityPercentage]}
                onValueChange={(value) => setEquityPercentage(value[0])}
                min={50}
                max={95}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>50%</span>
                <span>95%</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-sm text-orange-900">
                Most lenders cap at 80% LVR. Higher LVRs may require LMI.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Equity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-600 to-orange-400 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Home Equity</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.equity.toLocaleString()}
              </div>
              <p className="text-orange-100 text-sm">
                {calculation.equityPercentageActual}% of property value
              </p>
            </motion.div>

            {/* Available to Borrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Available to Borrow</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.availableToBorrow.toLocaleString()}
              </div>
              <p className="text-blue-100 text-sm">
                At 80% LVR (no LMI)
              </p>
            </motion.div>

            {/* Equity Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-light-gray rounded-2xl p-8 border border-gray-200 md:col-span-2"
            >
              <h4 className="font-heading text-lg font-semibold text-secondary mb-6">Equity Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Property Value:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${propertyValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Mortgage Balance:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${mortgageBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-paragraph text-gray-600">Your Equity:</span>
                  <span className="font-paragraph font-bold text-green-600">
                    ${calculation.equity.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{ width: `${(calculation.equity / propertyValue) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Mortgage</span>
                  <span>Your Equity</span>
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
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-6 text-lg font-semibold">
                Borrow Against Your Equity
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
