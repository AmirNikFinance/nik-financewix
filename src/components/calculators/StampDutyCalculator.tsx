import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

type AustralianState = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

// Simplified stamp duty rates for Australian states (2024)
const stampDutyRates: Record<AustralianState, Array<{ threshold: number; rate: number }>> = {
  NSW: [
    { threshold: 14500, rate: 0 },
    { threshold: 30000, rate: 0.01 },
    { threshold: 130000, rate: 0.015 },
    { threshold: 365000, rate: 0.02 },
    { threshold: 1100000, rate: 0.03 },
    { threshold: Infinity, rate: 0.04 },
  ],
  VIC: [
    { threshold: 25000, rate: 0 },
    { threshold: 100000, rate: 0.014 },
    { threshold: 500000, rate: 0.024 },
    { threshold: 750000, rate: 0.03 },
    { threshold: Infinity, rate: 0.04 },
  ],
  QLD: [
    { threshold: 5000, rate: 0 },
    { threshold: 75000, rate: 0.0075 },
    { threshold: 540000, rate: 0.015 },
    { threshold: 1000000, rate: 0.025 },
    { threshold: Infinity, rate: 0.03 },
  ],
  WA: [
    { threshold: 120000, rate: 0 },
    { threshold: 150000, rate: 0.0125 },
    { threshold: 360000, rate: 0.015 },
    { threshold: 725000, rate: 0.02 },
    { threshold: Infinity, rate: 0.03 },
  ],
  SA: [
    { threshold: 12000, rate: 0 },
    { threshold: 80000, rate: 0.01 },
    { threshold: 320000, rate: 0.02 },
    { threshold: 750000, rate: 0.03 },
    { threshold: Infinity, rate: 0.04 },
  ],
  TAS: [
    { threshold: 3000, rate: 0 },
    { threshold: 25000, rate: 0.01 },
    { threshold: 75000, rate: 0.015 },
    { threshold: 300000, rate: 0.02 },
    { threshold: Infinity, rate: 0.03 },
  ],
  ACT: [
    { threshold: 7500, rate: 0 },
    { threshold: 30000, rate: 0.01 },
    { threshold: 75000, rate: 0.015 },
    { threshold: 230000, rate: 0.02 },
    { threshold: Infinity, rate: 0.03 },
  ],
  NT: [
    { threshold: 14500, rate: 0 },
    { threshold: 40000, rate: 0.01 },
    { threshold: 100000, rate: 0.015 },
    { threshold: 500000, rate: 0.02 },
    { threshold: Infinity, rate: 0.03 },
  ],
};

export default function StampDutyCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(600000);
  const [selectedState, setSelectedState] = useState<AustralianState>('NSW');
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState(false);

  const calculation = useMemo(() => {
    const rates = stampDutyRates[selectedState];
    let stampDuty = 0;

    // Calculate stamp duty based on property price
    for (let i = 0; i < rates.length; i++) {
      const currentThreshold = rates[i].threshold;
      const nextThreshold = rates[i + 1]?.threshold || Infinity;

      if (propertyPrice > currentThreshold) {
        const taxableAmount = Math.min(propertyPrice, nextThreshold) - currentThreshold;
        stampDuty += taxableAmount * rates[i].rate;
      }
    }

    // First home buyer concessions (varies by state)
    let concession = 0;
    if (isFirstHomeBuyer) {
      switch (selectedState) {
        case 'NSW':
          if (propertyPrice <= 600000) {
            concession = stampDuty;
          } else if (propertyPrice <= 750000) {
            concession = stampDuty * 0.5;
          }
          break;
        case 'VIC':
          if (propertyPrice <= 600000) {
            concession = stampDuty;
          } else if (propertyPrice <= 750000) {
            concession = stampDuty * 0.5;
          }
          break;
        case 'QLD':
          if (propertyPrice <= 500000) {
            concession = stampDuty;
          }
          break;
        case 'WA':
          if (propertyPrice <= 430000) {
            concession = stampDuty;
          }
          break;
        case 'SA':
          if (propertyPrice <= 450000) {
            concession = stampDuty;
          }
          break;
        default:
          concession = stampDuty * 0.5;
      }
    }

    const finalStampDuty = Math.max(0, stampDuty - concession);

    return {
      stampDuty: Math.round(stampDuty),
      concession: Math.round(concession),
      finalStampDuty: Math.round(finalStampDuty),
      effectiveRate: ((finalStampDuty / propertyPrice) * 100).toFixed(2),
    };
  }, [propertyPrice, selectedState, isFirstHomeBuyer]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Stamp Duty Calculator
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate stamp duty for your property purchase in Australia. Includes first home buyer concessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-heading text-2xl font-bold text-secondary mb-8">Property Details</h3>

            {/* Property Price */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                Property Price: ${propertyPrice.toLocaleString()}
              </label>
              <Slider
                value={[propertyPrice]}
                onValueChange={(value) => setPropertyPrice(value[0])}
                min={100000}
                max={2000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$100k</span>
                <span>$2M</span>
              </div>
            </div>

            {/* State Selection */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 block">
                State/Territory
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value as AustralianState)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="NSW">New South Wales (NSW)</option>
                <option value="VIC">Victoria (VIC)</option>
                <option value="QLD">Queensland (QLD)</option>
                <option value="WA">Western Australia (WA)</option>
                <option value="SA">South Australia (SA)</option>
                <option value="TAS">Tasmania (TAS)</option>
                <option value="ACT">Australian Capital Territory (ACT)</option>
                <option value="NT">Northern Territory (NT)</option>
              </select>
            </div>

            {/* First Home Buyer */}
            <div className="mb-8">
              <label className="font-paragraph font-semibold text-foreground mb-4 flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFirstHomeBuyer}
                  onChange={(e) => setIsFirstHomeBuyer(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent"
                />
                First Home Buyer
              </label>
              <p className="font-paragraph text-sm text-gray-600">
                Eligible for concessions or exemptions
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-sm text-red-900">
                Rates are indicative. Check with your state revenue office for current rates and eligibility.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stamp Duty */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-red-600 to-red-400 rounded-2xl p-8 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold">Stamp Duty</h4>
              </div>
              <div className="text-5xl font-bold mb-2">
                ${calculation.finalStampDuty.toLocaleString()}
              </div>
              <p className="text-red-100 text-sm">
                {calculation.effectiveRate}% of property price
              </p>
            </motion.div>

            {/* First Home Buyer Concession */}
            {isFirstHomeBuyer && calculation.concession > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-green-600 to-green-400 rounded-2xl p-8 text-white shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-lg font-semibold">Concession Saved</h4>
                </div>
                <div className="text-5xl font-bold mb-2">
                  ${calculation.concession.toLocaleString()}
                </div>
                <p className="text-green-100 text-sm">
                  First home buyer benefit
                </p>
              </motion.div>
            )}

            {/* Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-light-gray rounded-2xl p-8 border border-gray-200 md:col-span-2"
            >
              <h4 className="font-heading text-lg font-semibold text-secondary mb-6">Calculation Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Property Price:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${propertyPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">State:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    {selectedState}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-paragraph text-gray-600">Standard Stamp Duty:</span>
                  <span className="font-paragraph font-bold text-foreground">
                    ${calculation.stampDuty.toLocaleString()}
                  </span>
                </div>
                {isFirstHomeBuyer && calculation.concession > 0 && (
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-paragraph text-gray-600">Less: FHB Concession:</span>
                    <span className="font-paragraph font-bold text-green-600">
                      -${calculation.concession.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <span className="font-paragraph text-gray-600 font-semibold">Total Stamp Duty:</span>
                  <span className="font-paragraph font-bold text-red-600 text-lg">
                    ${calculation.finalStampDuty.toLocaleString()}
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
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6 text-lg font-semibold">
                Get a Loan Quote
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
