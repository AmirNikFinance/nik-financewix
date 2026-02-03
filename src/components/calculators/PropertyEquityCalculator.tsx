import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Home, DollarSign, TrendingUp, AlertCircle, PieChart } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function PropertyEquityCalculator() {
  const [propertyValue, setPropertyValue] = useState(750000);
  const [mortgageBalance, setMortgageBalance] = useState(450000);
  const [propertyAppreciation, setPropertyAppreciation] = useState(3);
  const [yearsToProject, setYearsToProject] = useState(5);

  const calculation = useMemo(() => {
    // Current equity
    const currentEquity = propertyValue - mortgageBalance;
    const currentEquityPercentage = (currentEquity / propertyValue) * 100;

    // Projected values
    const projectedPropertyValue = propertyValue * Math.pow(1 + propertyAppreciation / 100, yearsToProject);
    const projectedEquity = projectedPropertyValue - mortgageBalance;
    const projectedEquityPercentage = (projectedEquity / projectedPropertyValue) * 100;

    // Equity growth
    const equityGrowth = projectedEquity - currentEquity;
    const equityGrowthPercentage = ((equityGrowth / currentEquity) * 100).toFixed(1);

    // Borrowing capacity at 80% LVR
    const maxBorrowingCurrent = propertyValue * 0.8;
    const availableToBorrowCurrent = Math.max(0, maxBorrowingCurrent - mortgageBalance);

    const maxBorrowingProjected = projectedPropertyValue * 0.8;
    const availableToBorrowProjected = Math.max(0, maxBorrowingProjected - mortgageBalance);

    return {
      currentEquity: Math.round(currentEquity),
      currentEquityPercentage: currentEquityPercentage.toFixed(1),
      projectedPropertyValue: Math.round(projectedPropertyValue),
      projectedEquity: Math.round(projectedEquity),
      projectedEquityPercentage: projectedEquityPercentage.toFixed(1),
      equityGrowth: Math.round(equityGrowth),
      equityGrowthPercentage,
      availableToBorrowCurrent: Math.round(availableToBorrowCurrent),
      availableToBorrowProjected: Math.round(availableToBorrowProjected),
      additionalBorrowingCapacity: Math.round(availableToBorrowProjected - availableToBorrowCurrent),
    };
  }, [propertyValue, mortgageBalance, propertyAppreciation, yearsToProject]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Property Equity Calculator
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          Understand your current equity position and project future growth potential based on property appreciation.
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
                Current Property Value: ${propertyValue.toLocaleString()}
              </label>
              <Slider
                value={[propertyValue]}
                onValueChange={(value) => setPropertyValue(value[0])}
                min={100000}
                max={5000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$100k</span>
                <span>$5M</span>
              </div>
            </div>

            {/* Mortgage Balance */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Remaining Mortgage: ${mortgageBalance.toLocaleString()}
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

            {/* Annual Appreciation */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Annual Appreciation: {propertyAppreciation}%
              </label>
              <Slider
                value={[propertyAppreciation]}
                onValueChange={(value) => setPropertyAppreciation(value[0])}
                min={0}
                max={10}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0%</span>
                <span>10%</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Australian average: ~3-4% per year
              </p>
            </div>

            {/* Years to Project */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Years to Project: {yearsToProject} years
              </label>
              <Slider
                value={[yearsToProject]}
                onValueChange={(value) => setYearsToProject(value[0])}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1 year</span>
                <span>20 years</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-sm text-blue-900">
                Projections are estimates. Actual property values may vary based on market conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Equity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Current Equity</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.currentEquity.toLocaleString()}
              </div>
              <p className="text-white/70 text-sm">
                {calculation.currentEquityPercentage}% of property value
              </p>
            </motion.div>

            {/* Projected Equity */}
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
                <h4 className="font-heading text-lg font-semibold">Projected Equity</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.projectedEquity.toLocaleString()}
              </div>
              <p className="text-white/70 text-sm">
                In {yearsToProject} year{yearsToProject !== 1 ? 's' : ''} at {propertyAppreciation}% p.a.
              </p>
            </motion.div>

            {/* Equity Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-600 to-green-500 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Equity Growth</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.equityGrowth.toLocaleString()}
              </div>
              <p className="text-white/70 text-sm">
                +{calculation.equityGrowthPercentage}% increase
              </p>
            </motion.div>

            {/* Additional Borrowing Capacity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <PieChart className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Additional Capacity</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.additionalBorrowingCapacity.toLocaleString()}
              </div>
              <p className="text-white/70 text-sm">
                Extra borrowing potential
              </p>
            </motion.div>

            {/* Detailed Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-light-gray rounded-2xl p-8 border border-gray-200 md:col-span-2"
            >
              <h4 className="font-heading text-lg font-semibold text-secondary mb-6">Detailed Breakdown</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current Position */}
                <div>
                  <h5 className="font-paragraph font-semibold text-foreground mb-4 text-sm">Current Position</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                      <span className="font-paragraph text-sm text-gray-600">Property Value:</span>
                      <span className="font-paragraph font-bold text-foreground">
                        ${propertyValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                      <span className="font-paragraph text-sm text-gray-600">Mortgage Balance:</span>
                      <span className="font-paragraph font-bold text-foreground">
                        ${mortgageBalance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-paragraph text-sm text-gray-600">Your Equity:</span>
                      <span className="font-paragraph font-bold text-green-600">
                        ${calculation.currentEquity.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="font-paragraph text-sm text-gray-600">Can Borrow (80% LVR):</span>
                      <span className="font-paragraph font-bold text-blue-600">
                        ${calculation.availableToBorrowCurrent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Projected Position */}
                <div>
                  <h5 className="font-paragraph font-semibold text-foreground mb-4 text-sm">Projected in {yearsToProject} Year{yearsToProject !== 1 ? 's' : ''}</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                      <span className="font-paragraph text-sm text-gray-600">Property Value:</span>
                      <span className="font-paragraph font-bold text-foreground">
                        ${calculation.projectedPropertyValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                      <span className="font-paragraph text-sm text-gray-600">Mortgage Balance:</span>
                      <span className="font-paragraph font-bold text-foreground">
                        ${mortgageBalance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-paragraph text-sm text-gray-600">Your Equity:</span>
                      <span className="font-paragraph font-bold text-green-600">
                        ${calculation.projectedEquity.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="font-paragraph text-sm text-gray-600">Can Borrow (80% LVR):</span>
                      <span className="font-paragraph font-bold text-blue-600">
                        ${calculation.availableToBorrowProjected.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="mt-8 space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-paragraph font-semibold text-gray-600 mb-2">
                    <span>Current Equity Position</span>
                    <span>{calculation.currentEquityPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-300"
                      style={{ width: `${(calculation.currentEquity / propertyValue) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-paragraph font-semibold text-gray-600 mb-2">
                    <span>Projected Equity Position</span>
                    <span>{calculation.projectedEquityPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-accent h-full transition-all duration-300"
                      style={{ width: `${(calculation.projectedEquity / calculation.projectedPropertyValue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl py-6 text-lg font-semibold">
                Explore Your Borrowing Options
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
