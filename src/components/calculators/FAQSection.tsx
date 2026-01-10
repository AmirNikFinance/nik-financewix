import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type CalculatorType = 
  | 'repayment' 
  | 'borrowing' 
  | 'offset' 
  | 'equity' 
  | 'lmi' 
  | 'debt' 
  | 'stampduty' 
  | 'report';

const faqs: Record<CalculatorType, Array<{ question: string; answer: string }>> = {
  repayment: [
    {
      question: 'What is the difference between P&I and Interest-Only loans?',
      answer: 'Principal & Interest (P&I) loans require you to pay both the loan amount and interest each month, building equity over time. Interest-Only loans require you to pay only interest for a set period (usually 5 years), after which you must switch to P&I. P&I is generally better for home purchases, while Interest-Only may suit investors.',
    },
    {
      question: 'How accurate is this calculator?',
      answer: 'This calculator provides estimates based on standard calculations. Actual repayments may vary depending on your lender, loan features (offset accounts, redraw facilities), interest rate changes, and any additional fees. Always confirm exact figures with your lender.',
    },
    {
      question: 'Can I pay fortnightly or weekly instead of monthly?',
      answer: 'Yes, many lenders offer flexible payment options. Paying fortnightly or weekly can help you pay off your loan faster and reduce total interest. This calculator shows the equivalent amounts for different payment frequencies.',
    },
    {
      question: 'What happens if interest rates rise?',
      answer: 'If interest rates increase, your monthly repayment will also increase (unless you have a fixed rate). A 1% increase in interest rates can significantly impact your repayments. It\'s important to budget for potential rate rises.',
    },
  ],
  borrowing: [
    {
      question: 'How is borrowing capacity calculated?',
      answer: 'Lenders typically use a serviceability ratio (usually 80% of gross income) minus existing debts to determine how much you can borrow. They also consider your credit history, employment stability, and other financial commitments.',
    },
    {
      question: 'What is LVR (Loan to Value Ratio)?',
      answer: 'LVR is the percentage of the property value you\'re borrowing. For example, if you\'re borrowing $400,000 for a $500,000 property, your LVR is 80%. Lower LVR (higher deposit) means lower risk for lenders and no LMI required.',
    },
    {
      question: 'Why do I need a larger deposit?',
      answer: 'A larger deposit (lower LVR) reduces the lender\'s risk, may eliminate LMI costs, and gives you more equity in the property. It also reduces your monthly repayments and total interest paid over the loan term.',
    },
    {
      question: 'Can I borrow more than the calculator shows?',
      answer: 'Possibly, but it depends on your individual circumstances. Some lenders may approve higher amounts based on strong credit history, stable employment, or other factors. Always speak with a mortgage broker for personalized advice.',
    },
  ],
  offset: [
    {
      question: 'How does an offset account work?',
      answer: 'An offset account is a savings account linked to your mortgage. The balance in the offset account reduces the amount of interest you pay. For example, if you have a $500,000 loan and $50,000 in offset, you only pay interest on $450,000.',
    },
    {
      question: 'Is an offset account worth it?',
      answer: 'Yes, offset accounts can save significant interest over time, especially if you maintain a healthy balance. The savings depend on your offset balance and interest rate. Even small balances can help reduce interest.',
    },
    {
      question: 'Can I withdraw money from my offset account?',
      answer: 'Yes, offset accounts function like regular savings accounts. You can deposit and withdraw money freely. However, withdrawals reduce your interest savings, so it\'s best to keep the balance as high as possible.',
    },
    {
      question: 'What\'s the difference between offset and redraw?',
      answer: 'An offset account is a separate savings account that reduces interest. A redraw facility allows you to access extra payments you\'ve made on your loan. Both can help reduce interest, but offset accounts are generally more flexible.',
    },
  ],
  equity: [
    {
      question: 'What is home equity?',
      answer: 'Home equity is the difference between your property\'s value and the amount you still owe on your mortgage. For example, if your home is worth $800,000 and you owe $500,000, your equity is $300,000.',
    },
    {
      question: 'Can I borrow against my home equity?',
      answer: 'Yes, you can use a home equity loan or line of credit to borrow against your equity. Most lenders allow you to borrow up to 80% of your property\'s value. Borrowing beyond 80% may require LMI.',
    },
    {
      question: 'What can I use a home equity loan for?',
      answer: 'Home equity loans can be used for various purposes including home renovations, debt consolidation, investment property purchases, or other major expenses. The interest rates are typically lower than personal loans because the loan is secured against your property.',
    },
    {
      question: 'How does equity build over time?',
      answer: 'Equity builds in two ways: 1) As you pay down your mortgage principal, and 2) As your property value increases. Both factors increase your equity and your borrowing capacity.',
    },
  ],
  lmi: [
    {
      question: 'What is LMI (Lenders Mortgage Insurance)?',
      answer: 'LMI is insurance that protects the lender if you default on your loan. It\'s required when you borrow more than 80% of the property value (less than 20% deposit). The cost is added to your loan amount.',
    },
    {
      question: 'How much does LMI cost?',
      answer: 'LMI costs vary based on your LVR and loan amount. Generally, it ranges from 1.5% to 5% of the loan amount. Higher LVR means higher LMI costs. This calculator provides estimates based on typical rates.',
    },
    {
      question: 'Can I avoid LMI?',
      answer: 'Yes, by saving a larger deposit (20% or more). Alternatively, some lenders offer low-deposit loans without LMI, or you might qualify for first home buyer schemes that waive LMI.',
    },
    {
      question: 'Can I remove LMI later?',
      answer: 'Yes, once your loan balance falls to 80% of the property value (through repayments and/or property appreciation), you can request LMI removal. This requires a property revaluation.',
    },
  ],
  debt: [
    {
      question: 'Is debt consolidation a good idea?',
      answer: 'Debt consolidation can be beneficial if it reduces your overall interest rate and monthly repayments. However, ensure you don\'t accumulate new debt after consolidating, as this defeats the purpose.',
    },
    {
      question: 'What debts can be consolidated?',
      answer: 'Most unsecured debts can be consolidated, including credit cards, personal loans, car loans, and buy-now-pay-later debts. Some lenders may also consolidate secured debts.',
    },
    {
      question: 'Will consolidation affect my credit score?',
      answer: 'Initially, consolidation may slightly impact your credit score due to the new loan inquiry and hard credit check. However, consolidating high-interest debts and improving your payment history can improve your score long-term.',
    },
    {
      question: 'How long does consolidation take?',
      answer: 'The process typically takes 1-2 weeks from application to settlement. Some lenders offer faster approval for existing customers or those with strong credit histories.',
    },
  ],
  stampduty: [
    {
      question: 'What is stamp duty?',
      answer: 'Stamp duty is a tax imposed by state governments on property purchases. It\'s calculated as a percentage of the property price and varies by state. It\'s a one-time cost paid at settlement.',
    },
    {
      question: 'Who pays stamp duty?',
      answer: 'The buyer is responsible for paying stamp duty. It\'s typically paid at settlement and is a significant cost to budget for when purchasing property.',
    },
    {
      question: 'Are there first home buyer exemptions?',
      answer: 'Yes, most states offer stamp duty exemptions or concessions for first home buyers. Eligibility and amounts vary by state. This calculator includes these concessions where applicable.',
    },
    {
      question: 'How can I reduce stamp duty?',
      answer: 'The main ways to reduce stamp duty are: 1) Qualify for first home buyer concessions, 2) Purchase a property below the exemption threshold, or 3) In some states, purchase an off-the-plan property which may have lower rates.',
    },
  ],
  report: [
    {
      question: 'How long does it take to receive my report?',
      answer: 'Most property reports are generated and sent within 24-48 hours of submission. You\'ll receive it via email along with detailed analysis and recommendations.',
    },
    {
      question: 'Is the property valuation accurate?',
      answer: 'The valuation is an estimate based on comparable sales data and market trends. For a formal valuation, you\'ll need a licensed valuer. Our estimate is useful for planning purposes.',
    },
    {
      question: 'Can I share this report with my lender?',
      answer: 'Yes, you can share the report with your lender or mortgage broker. However, lenders typically require their own formal valuation for loan approval.',
    },
    {
      question: 'Is my information kept private?',
      answer: 'Yes, your information is kept strictly confidential and used only to generate your property report. We comply with all privacy laws and never share your details with third parties without consent.',
    },
  ],
};

export default function FAQSection({ calculatorType }: { calculatorType: CalculatorType }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const currentFAQs = faqs[calculatorType] || [];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          Frequently Asked Questions
        </h2>
        <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about this calculator and related financial topics.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {currentFAQs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-accent transition-colors"
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-light-gray transition-colors"
            >
              <h3 className="font-heading text-lg font-semibold text-secondary text-left">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 ml-4"
              >
                <ChevronDown className="w-5 h-5 text-accent" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200"
                >
                  <p className="font-paragraph text-gray-600 px-6 py-5 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-gradient-to-r from-secondary to-primary rounded-2xl p-8 md:p-12 text-white text-center"
      >
        <h3 className="font-heading text-3xl font-bold mb-4">Still have questions?</h3>
        <p className="font-paragraph text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          Our team of financial experts is here to help. Get personalized advice tailored to your situation.
        </p>
        <a href="/contact" className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
          Contact Our Experts
        </a>
      </motion.div>
    </div>
  );
}
