import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Zap, DollarSign, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { trackButtonClick } from '@/lib/analytics';

type CalculatorTab = 'new' | 'refinance';
type CreditScore = 'excellent' | 'good' | 'average' | 'below';
type PropertyStatus = 'own' | 'rent';
type VehicleAge = 'new' | 'used-5' | 'used-5plus';

interface CalculatorState {
  purchasePrice: number;
  creditScore: CreditScore;
  propertyStatus: PropertyStatus;
  vehicleAge: VehicleAge;
  isGreenVehicle: boolean;
  loanTerm: number;
}

const initialState: CalculatorState = {
  purchasePrice: 35000,
  creditScore: 'good',
  propertyStatus: 'own',
  vehicleAge: 'new',
  isGreenVehicle: false,
  loanTerm: 5,
};

export default function CarLoanCalculatorPage() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('new');
  const [state, setState] = useState<CalculatorState>(initialState);

  const calculateRate = (): number => {
    let rate = state.propertyStatus === 'own' ? 5.0 : 6.0;

    // Credit score adjustments
    switch (state.creditScore) {
      case 'excellent':
        rate -= 1.0;
        break;
      case 'average':
        rate += 2.0;
        break;
      case 'below':
        rate += 5.0;
        break;
      case 'good':
      default:
        break;
    }

    // Property status adjustment
    if (state.propertyStatus === 'own') {
      rate -= 0.5;
    }

    // Green vehicle discount
    if (state.isGreenVehicle) {
      rate -= 1.5;
    }

    // Vehicle age adjustment
    if (state.vehicleAge === 'used-5plus') {
      rate += 1.5;
    }

    return Math.max(rate, 0); // Ensure rate doesn't go below 0
  };

  const calculations = useMemo(() => {
    const rate = calculateRate();
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = state.loanTerm * 12;
    const principal = state.purchasePrice;

    // Calculate monthly repayment using standard loan formula
    let monthlyRepayment = 0;
    if (monthlyRate > 0) {
      monthlyRepayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyRepayment = principal / numberOfPayments;
    }

    const totalRepaid = monthlyRepayment * numberOfPayments;
    const totalInterest = totalRepaid - principal;

    return {
      rate: rate.toFixed(2),
      monthlyRepayment: monthlyRepayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalRepaid.toFixed(2),
    };
  }, [state]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 0, 5000), 10000000);
    setState({ ...state, purchasePrice: value });
  };

  const handleLoanTermChange = (value: number[]) => {
    setState({ ...state, loanTerm: value[0] });
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
              Car Loan <span className="text-accent">Calculator</span>
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate your estimated monthly repayment for a new car loan or refinance your existing loan. Get an instant rate based on your situation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-6 py-4 font-heading font-bold text-lg transition-all duration-300 border-b-2 ${
                activeTab === 'new'
                  ? 'border-accent text-secondary'
                  : 'border-transparent text-gray-500 hover:text-secondary'
              }`}
            >
              New Car Loan
            </button>
            <button
              onClick={() => setActiveTab('refinance')}
              className={`px-6 py-4 font-heading font-bold text-lg transition-all duration-300 border-b-2 ${
                activeTab === 'refinance'
                  ? 'border-accent text-secondary'
                  : 'border-transparent text-gray-500 hover:text-secondary'
              }`}
            >
              Car Loan Refinance
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Input Form */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-light-gray rounded-2xl p-8 sticky top-24">
                <h2 className="font-heading text-2xl font-bold text-secondary mb-8">
                  {activeTab === 'new' ? 'New Car Details' : 'Refinance Details'}
                </h2>

                {/* Purchase Price */}
                <div className="mb-8">
                  <label className="block font-heading font-semibold text-secondary mb-3">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      min="5000"
                      max="10000000"
                      value={state.purchasePrice}
                      onChange={handlePriceChange}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Range: $5,000 - $10,000,000
                  </p>
                </div>

                {/* Credit Score */}
                <div className="mb-8">
                  <label className="block font-heading font-semibold text-secondary mb-3">
                    Credit Score
                  </label>
                  <div className="relative">
                    <select
                      value={state.creditScore}
                      onChange={(e) =>
                        setState({
                          ...state,
                          creditScore: e.target.value as CreditScore,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph appearance-none bg-white cursor-pointer"
                    >
                      <option value="excellent">Excellent (800+)</option>
                      <option value="good">Good (700-799)</option>
                      <option value="average">Average (600-699)</option>
                      <option value="below">Below Average (&lt;600)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Property Status */}
                <div className="mb-8">
                  <label className="block font-heading font-semibold text-secondary mb-3">
                    Property Status
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setState({ ...state, propertyStatus: 'own' })}
                      className={`flex-1 px-4 py-3 rounded-lg font-paragraph font-semibold transition-all duration-300 border-2 ${
                        state.propertyStatus === 'own'
                          ? 'border-accent bg-accent/10 text-secondary'
                          : 'border-gray-300 text-gray-600 hover:border-accent'
                      }`}
                    >
                      I Own Property
                    </button>
                    <button
                      onClick={() => setState({ ...state, propertyStatus: 'rent' })}
                      className={`flex-1 px-4 py-3 rounded-lg font-paragraph font-semibold transition-all duration-300 border-2 ${
                        state.propertyStatus === 'rent'
                          ? 'border-accent bg-accent/10 text-secondary'
                          : 'border-gray-300 text-gray-600 hover:border-accent'
                      }`}
                    >
                      I'm Renting
                    </button>
                  </div>
                </div>

                {/* Vehicle Age */}
                <div className="mb-8">
                  <label className="block font-heading font-semibold text-secondary mb-3">
                    Vehicle Age
                  </label>
                  <div className="relative">
                    <select
                      value={state.vehicleAge}
                      onChange={(e) =>
                        setState({
                          ...state,
                          vehicleAge: e.target.value as VehicleAge,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-paragraph appearance-none bg-white cursor-pointer"
                    >
                      <option value="new">New/Demo</option>
                      <option value="used-5">Used (&lt;5 years old)</option>
                      <option value="used-5plus">Used (5+ years old)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Green Vehicle Checkbox */}
                <div className="mb-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={state.isGreenVehicle}
                      onChange={(e) =>
                        setState({
                          ...state,
                          isGreenVehicle: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-2 border-gray-300 text-accent focus:ring-2 focus:ring-accent cursor-pointer"
                    />
                    <span className="font-paragraph font-semibold text-secondary group-hover:text-accent transition-colors">
                      This is a Green Vehicle (EV or Hybrid)
                    </span>
                  </label>
                  {state.isGreenVehicle && (
                    <p className="text-sm text-accent font-semibold mt-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      1.5% Green Loan Discount Applied
                    </p>
                  )}
                </div>

                {/* Loan Term Slider */}
                <div className="mb-8">
                  <label className="block font-heading font-semibold text-secondary mb-3">
                    Loan Term: <span className="text-accent">{state.loanTerm} years</span>
                  </label>
                  <Slider
                    value={[state.loanTerm]}
                    onValueChange={handleLoanTermChange}
                    min={1}
                    max={7}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1 year</span>
                    <span>7 years</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              key={`results-${activeTab}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-8 md:p-12 text-white">
                {/* Interest Rate Display */}
                <div className="mb-12 pb-8 border-b border-white/20">
                  <p className="text-gray-300 font-paragraph mb-2">Estimated Interest Rate</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl md:text-7xl font-heading font-bold">
                      {calculations.rate}%
                    </span>
                    <span className="text-xl text-gray-300 font-paragraph">per annum</span>
                  </div>
                </div>

                {/* Monthly Repayment - Main Result */}
                <div className="mb-12">
                  <p className="text-gray-300 font-paragraph text-sm uppercase tracking-wider mb-3">
                    Estimated Monthly Repayment
                  </p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-7xl md:text-8xl font-heading font-bold">
                      ${parseFloat(calculations.monthlyRepayment).toLocaleString('en-AU', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <p className="text-gray-300 font-paragraph">
                    Over {state.loanTerm} years ({state.loanTerm * 12} payments)
                  </p>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-8 border-b border-white/20">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <p className="text-gray-300 font-paragraph text-sm mb-2">Total Interest Paid</p>
                    <p className="text-3xl md:text-4xl font-heading font-bold">
                      ${parseFloat(calculations.totalInterest).toLocaleString('en-AU', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <p className="text-gray-300 font-paragraph text-sm mb-2">Total Loan Cost</p>
                    <p className="text-3xl md:text-4xl font-heading font-bold">
                      ${parseFloat(calculations.totalCost).toLocaleString('en-AU', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
                  onClick={() => trackButtonClick('car-loan-calculator-cta', 'Get Personalised Rate')}
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-secondary rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Get My Personalised Rate
                  </Button>
                </a>

                {/* Disclaimer */}
                <p className="text-xs text-gray-400 mt-6 text-center">
                  This is an estimate based on the information provided. Actual rates and repayments may vary based on your credit assessment and lender requirements.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-light-gray rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-secondary mb-2">Transparent Pricing</h3>
                  <p className="font-paragraph text-sm text-gray-600">
                    No hidden fees. See exactly what you'll pay.
                  </p>
                </div>

                <div className="bg-light-gray rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-secondary mb-2">Green Discounts</h3>
                  <p className="font-paragraph text-sm text-gray-600">
                    Save 1.5% on EV and hybrid vehicles.
                  </p>
                </div>

                <div className="bg-light-gray rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-secondary mb-2">Flexible Terms</h3>
                  <p className="font-paragraph text-sm text-gray-600">
                    Choose loan terms from 1 to 7 years.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                How accurate is this calculator?
              </h3>
              <p className="font-paragraph text-gray-600">
                This calculator provides an estimate based on the information you provide. Actual rates depend on your credit assessment and the lender's requirements.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                What's the green vehicle discount?
              </h3>
              <p className="font-paragraph text-gray-600">
                We offer a 1.5% discount on car loans for electric vehicles (EVs) and hybrid vehicles to support sustainable transport.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                Can I refinance my existing car loan?
              </h3>
              <p className="font-paragraph text-gray-600">
                Yes! Use the "Car Loan Refinance" tab to see if you can get a better rate on your existing loan. We compare rates from 130+ lenders.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                How does property ownership affect my rate?
              </h3>
              <p className="font-paragraph text-gray-600">
                Property owners typically get better rates (0.5% discount) as they have more financial stability. Renters may have slightly higher rates.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                What if I have a poor credit score?
              </h3>
              <p className="font-paragraph text-gray-600">
                Even with a poor credit score, you may still qualify. Our network of 130+ lenders includes specialists in bad credit car loans.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                How do I get my personalised rate?
              </h3>
              <p className="font-paragraph text-gray-600">
                Click "Get My Personalised Rate" to complete a quick application. Our AI will match you with the best lenders in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
