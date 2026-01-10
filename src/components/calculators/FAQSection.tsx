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
      question: 'How is my monthly repayment calculated?',
      answer: 'Your monthly repayment is calculated using the loan amount, interest rate, and loan term. The formula divides the total loan cost (principal + interest) across the number of months. For example, a $400,000 loan at 6% over 30 years results in approximately $2,398 per month. The calculator uses standard amortization formulas to provide accurate estimates.',
    },
    {
      question: 'What is the difference between principal and interest?',
      answer: 'Principal is the original loan amount you borrowed. Interest is the cost of borrowing that money, calculated as a percentage of the principal. In early repayments, most of your payment goes toward interest, while later payments go more toward principal. Over a 30-year loan, you may pay nearly as much in interest as the original principal amount.',
    },
    {
      question: 'How do extra repayments help reduce my loan?',
      answer: 'Extra repayments go directly toward reducing your principal balance, which decreases the total interest you pay over the loan term. For example, paying an extra $100 per month on a $400,000 loan at 6% can save you over $50,000 in interest and reduce your loan term by several years. The earlier you make extra payments, the more interest you save.',
    },
    {
      question: 'Can I pay fortnightly or weekly instead of monthly?',
      answer: 'Yes, many lenders offer flexible payment options including fortnightly and weekly payments. Paying more frequently can help you pay off your loan faster because you make 26 fortnightly payments or 52 weekly payments per year (compared to 12 monthly payments). This accelerates principal reduction and saves interest. This calculator shows equivalent amounts for different payment frequencies.',
    },
    {
      question: 'How much total interest will I pay over the loan term?',
      answer: 'Total interest depends on your loan amount, interest rate, and loan term. For example, a $400,000 loan at 6% over 30 years costs approximately $463,000 in total interest. A shorter loan term (e.g., 20 years) reduces total interest significantly. This calculator displays your total interest payable, helping you understand the true cost of borrowing.',
    },
    {
      question: 'What happens if interest rates rise?',
      answer: 'If interest rates increase, your monthly repayment will also increase (unless you have a fixed rate loan). A 1% increase in interest rates can add $300-400+ to your monthly repayment on a $400,000 loan. It\'s important to budget for potential rate rises and consider whether you can afford repayments at higher rates. Fixed-rate loans protect you from rate increases for the fixed period.',
    },
  ],
  borrowing: [
    {
      question: 'How much can I borrow?',
      answer: 'The amount you can borrow depends on your income, existing debts, credit score, employment stability, and the property value. Most lenders use a serviceability ratio of 80% of your gross income to determine your maximum borrowing capacity. For example, if you earn $100,000 per year, you may be able to borrow up to $400,000-$500,000 depending on your other financial commitments. This calculator provides an estimate based on standard lending criteria.',
    },
    {
      question: 'What factors affect my borrowing capacity?',
      answer: 'Several key factors influence how much you can borrow: 1) Income - higher income increases borrowing capacity, 2) Existing debts - credit cards, car loans, and personal loans reduce capacity, 3) Credit score - a better credit score may allow higher borrowing, 4) Employment stability - permanent employment is viewed more favorably than casual work, 5) Deposit size - a larger deposit increases borrowing capacity, 6) Interest rates - higher rates reduce serviceability, 7) Dependents - more dependents may reduce capacity due to living expenses, 8) Age - lenders consider your age relative to loan term.',
    },
    {
      question: 'How do lenders calculate borrowing capacity?',
      answer: 'Lenders use a serviceability assessment to determine borrowing capacity. They typically calculate: (Gross Annual Income × Serviceability Ratio) - Existing Monthly Debt Commitments = Maximum Borrowing Capacity. The serviceability ratio is usually 80% of gross income, though some lenders use 85% for strong applicants. For example, if you earn $100,000 annually with $500/month in existing debts: ($100,000 × 0.80 ÷ 12) - $500 = approximately $5,167 monthly repayment capacity. This translates to a borrowing capacity of around $400,000-$500,000 depending on interest rates and loan term.',
    },
    {
      question: 'How does my credit score affect borrowing capacity?',
      answer: 'Your credit score significantly impacts your borrowing capacity. A strong credit score (above 700) demonstrates responsible financial management and may allow you to borrow more, access better interest rates, and qualify for larger loans. A poor credit score (below 600) may result in lower borrowing capacity, higher interest rates, or loan rejection. Late payments, defaults, and high credit utilization damage your score. Improving your credit score by paying bills on time and reducing debt can increase your borrowing capacity.',
    },
    {
      question: 'How do dependents affect my borrowing capacity?',
      answer: 'Dependents reduce your borrowing capacity because lenders account for living expenses when calculating serviceability. Each dependent increases your estimated living costs, which reduces the amount available for loan repayments. For example, a single person may have lower living expenses than someone with a spouse and two children. Lenders typically use standard expense guidelines that increase with the number of dependents. However, if your partner has income, their income can be added to yours to increase total borrowing capacity.',
    },
    {
      question: 'Can I borrow more than the calculator shows?',
      answer: 'Possibly, but it depends on your individual circumstances. Some lenders may approve higher amounts based on strong credit history, stable employment, additional income sources, or other factors. Conversely, some lenders may approve less if you have adverse credit history or unstable employment. Always speak with a mortgage broker or lender for personalized advice, as borrowing capacity varies between lenders and their specific lending criteria.',
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
