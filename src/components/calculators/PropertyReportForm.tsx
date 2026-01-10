import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PropertyReportForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    suburb: '',
    state: 'NSW',
    postcode: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Free Property Report
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          Get a comprehensive property report including valuation insights, market trends, and borrowing capacity analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-heading text-2xl font-bold text-secondary mb-8">Your Details</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label className="font-paragraph font-semibold text-foreground mb-2 block">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="font-paragraph font-semibold text-foreground mb-2 block">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-paragraph font-semibold text-foreground mb-2 block">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-paragraph font-semibold text-foreground mb-2 block">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="0412 345 678"
              />
            </div>

            {/* Property Address */}
            <div>
              <label className="font-paragraph font-semibold text-foreground mb-2 block">
                Property Address *
              </label>
              <input
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="123 Main Street"
              />
            </div>

            {/* Suburb */}
            <div>
              <label className="font-paragraph font-semibold text-foreground mb-2 block">
                Suburb *
              </label>
              <input
                type="text"
                name="suburb"
                value={formData.suburb}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Sydney"
              />
            </div>

            {/* State */}
            <div>
              <label className="font-paragraph font-semibold text-foreground mb-2 block">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="NSW">New South Wales</option>
                <option value="VIC">Victoria</option>
                <option value="QLD">Queensland</option>
                <option value="WA">Western Australia</option>
                <option value="SA">South Australia</option>
                <option value="TAS">Tasmania</option>
                <option value="ACT">ACT</option>
                <option value="NT">Northern Territory</option>
              </select>
            </div>

            {/* Postcode */}
            <div>
              <label className="font-paragraph font-semibold text-foreground mb-2 block">
                Postcode *
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="2000"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-4 text-lg font-semibold"
            >
              Get Your Free Report
            </Button>

            {/* Success Message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="font-paragraph text-sm text-green-900">
                  Thank you! Your property report request has been submitted. We'll send it to your email shortly.
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-2xl font-semibold">What's Included</h4>
            </div>
            <div className="space-y-4">
              {[
                'Property Valuation Estimate',
                'Market Trends & Analysis',
                'Borrowing Capacity Assessment',
                'Comparable Sales Data',
                'Suburb Growth Potential',
                'Investment Insights',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-paragraph">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-light-gray rounded-2xl border border-gray-200 p-8">
            <h4 className="font-heading text-xl font-semibold text-secondary mb-6">Why Get a Report?</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-paragraph font-semibold text-foreground mb-2">Make Informed Decisions</h5>
                <p className="font-paragraph text-gray-600 text-sm">
                  Understand your property's true value and market position before making financial decisions.
                </p>
              </div>
              <div>
                <h5 className="font-paragraph font-semibold text-foreground mb-2">Maximize Your Borrowing</h5>
                <p className="font-paragraph text-gray-600 text-sm">
                  Know exactly how much you can borrow against your property's equity.
                </p>
              </div>
              <div>
                <h5 className="font-paragraph font-semibold text-foreground mb-2">Plan Your Future</h5>
                <p className="font-paragraph text-gray-600 text-sm">
                  Get insights into your suburb's growth potential and investment opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-sm text-blue-900">
              Your information is secure and will only be used to generate your property report. We respect your privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
