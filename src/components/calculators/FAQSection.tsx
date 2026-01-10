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
      answer: 'Principal is the original loan amount you borrowed. Interest is the cost of borrowing that money, calculated as a percentage of the principal. In early repayments, most of your payment goes towards interest, while later payments go more towards principal. Over a 30-year loan, you may pay nearly as much in interest as the original principal amount.',
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
      answer: 'An offset account is a savings account linked to your mortgage that reduces the interest you pay on your loan. The balance in the offset account is "offset" against your mortgage balance for interest calculation purposes. For example, if you have a $500,000 mortgage and $50,000 in your offset account, you only pay interest on $450,000 ($500,000 - $50,000). The interest you save depends on the offset balance and your mortgage interest rate. If your rate is 6% and you have $50,000 in offset, you save approximately $3,000 per year in interest.',
    },
    {
      question: 'How much interest can I save with an offset account?',
      answer: 'The interest savings depend on two factors: your offset balance and your mortgage interest rate. For example: A $500,000 mortgage at 6% with $50,000 in offset saves approximately $3,000 per year. A $500,000 mortgage at 6% with $100,000 in offset saves approximately $6,000 per year. A $500,000 mortgage at 6% with $200,000 in offset saves approximately $12,000 per year. Over a 30-year loan, these savings compound significantly. Even small balances help—$10,000 in offset at 6% saves $600 per year. The key is to keep your offset balance as high as possible to maximize savings.',
    },
    {
      question: 'Is an offset account worth it?',
      answer: 'Yes, offset accounts are generally worth it if you have a regular income and can maintain a healthy balance. The benefits include: 1) Tax-free savings—interest savings are not taxable income, unlike interest earned in a regular savings account, 2) Flexibility—you can withdraw money anytime without affecting your loan, 3) Compound savings—the longer you maintain a balance, the more interest you save, 4) Psychological benefit—seeing your offset balance grow can motivate you to save more. However, offset accounts may have higher fees than regular savings accounts. Compare the fees against your expected interest savings to determine if it\'s worthwhile for your situation.',
    },
    {
      question: 'Can I withdraw money from my offset account?',
      answer: 'Yes, offset accounts function like regular savings accounts. You can deposit and withdraw money freely without any restrictions. However, each withdrawal reduces your offset balance and therefore reduces your interest savings. For example, if you have $50,000 in offset and withdraw $10,000, you now only save interest on $40,000. It\'s best to keep your offset balance as high as possible to maximize interest savings. Some people use their offset account as an emergency fund, which provides both financial security and interest savings.',
    },
    {
      question: 'What\'s the difference between offset and redraw?',
      answer: 'Both offset accounts and redraw facilities can help reduce interest, but they work differently: Offset Account: A separate savings account linked to your mortgage. Money in the offset reduces your loan balance for interest calculation. You can withdraw money anytime without affecting your loan. Interest savings are immediate and tax-free. Redraw Facility: Allows you to access extra payments you\'ve made on your loan. When you pay extra on your mortgage, that amount becomes available to redraw. Redrawing reduces the principal you\'ve paid down. You can only redraw money you\'ve actually paid into the loan. Key differences: Offset is more flexible—you can withdraw without affecting your loan balance. Redraw requires you to have made extra payments first. Offset provides immediate interest savings. Redraw only saves interest if you don\'t redraw the money. Many borrowers use both—maintaining an offset account for regular savings and using redraw for extra loan payments.',
    },
    {
      question: 'Do offset accounts have fees?',
      answer: 'Yes, many offset accounts have fees, though some lenders offer fee-free offset accounts. Common fees include: Monthly account fee (typically $5-$15), Transaction fees for deposits or withdrawals, Inactivity fees if you don\'t use the account. Before opening an offset account, compare the fees against your expected interest savings. For example, if you save $3,000 per year in interest but pay $120 in annual fees, your net saving is $2,880. For small balances, fees may outweigh the benefits. Always ask your lender about fee-free offset options or negotiate fee waivers.',
    },
    {
      question: 'Can I have multiple offset accounts?',
      answer: 'This depends on your lender\'s policy. Some lenders allow multiple offset accounts linked to a single mortgage, while others only allow one. Multiple offset accounts can be useful if you want to separate savings for different purposes (e.g., emergency fund, holiday savings, home renovation fund). However, each offset account may have separate fees. Check with your lender about their policy on multiple offset accounts and whether there are additional fees for each account.',
    },
    {
      question: 'What\'s the best way to use an offset account?',
      answer: 'Here are some strategies to maximize your offset account benefits: 1) Keep your salary deposited in the offset account—this maximizes your offset balance throughout the month, 2) Pay bills from the offset account—this keeps money in offset longer before it leaves your account, 3) Build an emergency fund in offset—this provides both financial security and interest savings, 4) Avoid unnecessary withdrawals—every dollar in offset saves you interest, 5) Use it alongside extra repayments—combine offset savings with extra loan payments for faster debt reduction, 6) Review your balance regularly—monitor your offset balance and adjust your savings strategy as needed. The most effective approach is to treat your offset account as your primary transaction account and keep as much money in it as possible.',
    },
  ],
  equity: [
    {
      question: 'What is home equity?',
      answer: 'Home equity is the difference between your property\'s current market value and the amount you still owe on your mortgage. For example, if your home is worth $800,000 and you owe $500,000 on your mortgage, your equity is $300,000 ($800,000 - $500,000). Equity represents the portion of your home that you truly own. As you pay down your mortgage and your property value increases, your equity grows. Home equity is one of the most valuable financial assets most Australians build over time.',
    },
    {
      question: 'How much equity do I have in my home?',
      answer: 'To calculate your home equity, subtract your outstanding mortgage balance from your property\'s current market value: Home Equity = Property Value - Outstanding Mortgage Balance. For example: If your property is worth $600,000 and you owe $400,000, your equity is $200,000. If your property is worth $1,000,000 and you owe $300,000, your equity is $700,000. You can estimate your property\'s value using online tools, recent comparable sales, or by getting a professional valuation. Your mortgage statement shows your outstanding balance. This calculator helps you determine your equity quickly.',
    },
    {
      question: 'What is the difference between equity and usable equity?',
      answer: 'Equity is the total amount of ownership you have in your property (Property Value - Outstanding Mortgage). Usable equity is the portion of your equity that you can actually borrow against. Most lenders allow you to borrow up to 80% of your property\'s value. Example: If your property is worth $500,000 and you owe $200,000: Your total equity = $300,000. Your usable equity = (80% of $500,000) - $200,000 = $400,000 - $200,000 = $200,000. So while you have $300,000 in total equity, you can only borrow $200,000 without paying Lenders Mortgage Insurance (LMI). The difference between total and usable equity is important when planning to borrow against your home.',
    },
    {
      question: 'How much can I borrow against my home equity?',
      answer: 'The amount you can borrow against your home equity depends on your usable equity and lender policies. Most lenders allow you to borrow up to 80% of your property\'s value (the 80% LVR threshold). Example calculations: Property worth $500,000, owing $200,000: Maximum borrowing = (80% × $500,000) - $200,000 = $200,000. Property worth $800,000, owing $300,000: Maximum borrowing = (80% × $800,000) - $300,000 = $340,000. If you want to borrow more than 80% LVR, you\'ll need to pay Lenders Mortgage Insurance (LMI), which increases your costs. Your actual borrowing capacity also depends on your income, credit score, and ability to service the additional debt.',
    },
    {
      question: 'What is LVR and how does it affect my borrowing?',
      answer: 'LVR (Loan-to-Value Ratio) is the percentage of your property\'s value that you\'re borrowing. It\'s calculated as: LVR = (Total Loan Amount ÷ Property Value) × 100. Example: If your property is worth $500,000 and you borrow $400,000, your LVR is 80%. LVR is crucial because: 1) Most lenders prefer LVR of 80% or less (no LMI required), 2) Borrowing above 80% LVR requires LMI, which adds cost, 3) Higher LVR means higher risk for lenders and higher costs for you, 4) LVR affects interest rates—higher LVR may mean higher rates. To reduce your LVR, you can: increase your deposit, pay down your existing mortgage, or wait for property appreciation.',
    },
    {
      question: 'How does equity build over time?',
      answer: 'Equity builds in two primary ways: 1) Mortgage Principal Repayment: As you make monthly mortgage payments, a portion goes toward paying down the principal (the amount you borrowed). This directly increases your equity. For example, paying an extra $100/month on a $400,000 loan at 6% can save you over $50,000 in interest and build equity faster. 2) Property Value Appreciation: When your property value increases due to market conditions, renovations, or neighborhood improvements, your equity increases automatically. For example, if your property appreciates from $500,000 to $550,000, you gain $50,000 in equity without making any additional payments. Both factors work together to build wealth. Over a 30-year mortgage, you\'ll build significant equity through repayments, and property appreciation can further accelerate this growth.',
    },
    {
      question: 'What can I use a home equity loan for?',
      answer: 'Home equity loans and lines of credit can be used for various purposes: 1) Home Renovations: Kitchen, bathroom, or extension renovations that increase property value, 2) Debt Consolidation: Consolidating high-interest credit cards and personal loans into a lower-interest home loan, 3) Investment Property Purchase: Buying an investment property using your home equity as security, 4) Education: Funding university or vocational training, 5) Business Investment: Starting or expanding a business, 6) Major Expenses: Vehicles, medical procedures, or other significant costs, 7) Wealth Building: Investment in shares or managed funds. Home equity loans typically have lower interest rates than personal loans because they\'re secured against your property. However, remember that you\'re putting your home at risk, so borrow responsibly.',
    },
    {
      question: 'Should I borrow against my home equity?',
      answer: 'Borrowing against your home equity can be beneficial in certain situations, but it\'s important to consider carefully: Benefits: 1) Lower interest rates compared to personal loans or credit cards, 2) Tax deductibility if used for investment purposes, 3) Larger borrowing capacity, 4) Flexible repayment options. Risks: 1) You\'re putting your home at risk if you can\'t repay, 2) Increased total debt may affect your financial security, 3) Interest rate rises could increase repayments significantly. Best practices: 1) Only borrow what you need and can afford to repay, 2) Use borrowed funds for investments or improvements that generate returns, 3) Avoid using home equity for consumption (holidays, cars) unless absolutely necessary, 4) Ensure you have an emergency fund before borrowing, 5) Consider your long-term financial goals. Speak with a financial advisor to determine if borrowing against your equity is right for your situation.',
    },
    {
      question: 'What happens to my equity if property values fall?',
      answer: 'If property values decline, your equity decreases proportionally. Example: If your property was worth $500,000 with $300,000 equity, and it falls to $450,000, your equity drops to $150,000 (assuming your mortgage balance stays the same). This situation is called "negative equity" if your mortgage exceeds your property value. Negative equity occurs when: Property values fall significantly, You borrowed at a high LVR (e.g., 95%), Market conditions deteriorate. Implications: 1) You can\'t borrow against your equity, 2) You may be unable to sell without a loss, 3) Refinancing becomes difficult. However, property values typically recover over time. If you have a long investment horizon and stable income, short-term value fluctuations are usually not a major concern. Focus on paying down your mortgage to build equity regardless of market conditions.',
    },
    {
      question: 'How does a home equity line of credit (HELOC) work?',
      answer: 'A Home Equity Line of Credit (HELOC) is a flexible borrowing arrangement secured against your home equity. How it works: 1) You establish a credit limit based on your usable equity (typically up to 80% LVR), 2) You can borrow and repay funds as needed, similar to a credit card, 3) You only pay interest on the amount you\'ve borrowed, not the full credit limit, 4) Interest rates are typically variable and linked to the bank\'s base rate. Example: If you have a $200,000 HELOC and borrow $50,000, you only pay interest on $50,000. You can repay that $50,000 and borrow again without reapplying. Benefits: Flexibility, lower interest rates than credit cards, interest-only payment options. Drawbacks: Variable rates mean payments can increase, temptation to over-borrow, risk to your home. HELOCs are useful for managing cash flow or funding planned expenses.',
    },
  ],
  lmi: [
    {
      question: 'What is LMI (Lenders Mortgage Insurance)?',
      answer: 'LMI (Lenders Mortgage Insurance) is insurance that protects the lender (not you) if you default on your loan. It\'s required when you borrow more than 80% of the property value, which means you have less than a 20% deposit. LMI is a one-time cost that is typically added to your loan amount and paid off over the life of the loan. For example, if you buy a $500,000 property with a $50,000 deposit (10% LVR), you\'ll need to pay LMI on the $450,000 loan. It\'s important to understand that LMI protects the lender\'s interests, not yours—it doesn\'t reduce your risk or provide you with any direct benefit.',
    },
    {
      question: 'How much does LMI cost?',
      answer: 'LMI costs vary significantly based on your Loan-to-Value Ratio (LVR) and loan amount. Generally, LMI ranges from 1.5% to 5% (or sometimes higher) of the loan amount. The higher your LVR, the higher your LMI cost. Example costs: A $400,000 loan at 85% LVR might cost $8,000-$12,000 in LMI. A $400,000 loan at 95% LVR might cost $20,000-$30,000 in LMI. A $400,000 loan at 80% LVR requires no LMI. LMI costs also depend on your credit score, employment type, and the lender\'s policies. This calculator provides estimates based on typical rates, but actual costs may vary. Always ask your lender for a specific LMI quote before committing to a loan.',
    },
    {
      question: 'Why do I have to pay LMI if I\'m the one taking the risk?',
      answer: 'This is a common frustration among borrowers. LMI protects the lender\'s interests, not yours. From the lender\'s perspective, a smaller deposit means higher risk—if property values fall or you default, the lender may not recover their full loan amount. LMI compensates the lender for this risk. However, you pay the cost, which can seem unfair. The reality is that lenders are willing to lend to borrowers with smaller deposits because LMI protects them. Without LMI, most lenders wouldn\'t offer loans with less than 20% deposits. So while it\'s an additional cost, it enables you to purchase property sooner rather than waiting to save a 20% deposit.',
    },
    {
      question: 'Can I avoid LMI?',
      answer: 'Yes, there are several ways to avoid paying LMI: 1) Save a larger deposit: If you can save 20% or more of the property price, you won\'t need LMI. For a $500,000 property, this means saving $100,000. 2) First home buyer schemes: Many states offer first home buyer programs that waive or reduce LMI requirements. Eligibility varies by state and property price. 3) Low-deposit loans without LMI: Some lenders offer special low-deposit loans (e.g., 10-15% deposit) without requiring LMI, though these typically come with higher interest rates. 4) Guarantor loans: If a family member can guarantee part of your loan, some lenders may waive LMI. 5) Wait for property appreciation: If you already own a property, waiting for it to appreciate can increase your equity and reduce your LVR on a new purchase. 6) Combination strategies: Some borrowers use a combination of savings, family gifts, and guarantors to reach 20% deposit and avoid LMI.',
    },
    {
      question: 'Can I remove LMI later?',
      answer: 'Yes, you can remove LMI once your loan balance falls to 80% of the property\'s value. This can happen through: 1) Mortgage repayments: As you pay down your loan, your LVR decreases. 2) Property appreciation: If your property value increases, your LVR decreases automatically. 3) Combination: A mix of repayments and property appreciation. To remove LMI, you must: Request LMI removal from your lender (usually in writing), Provide evidence of the property\'s current value (typically a professional valuation), Pay any valuation costs (usually $300-$600). Example: You bought a $500,000 property with a $50,000 deposit (10% LVR). After 5 years of repayments and property appreciation, your loan balance is $350,000 and the property is worth $550,000 (63.6% LVR). You can request LMI removal. Important: LMI removal is not automatic—you must request it. Some borrowers forget and continue paying LMI unnecessarily. Check your LVR regularly and request removal as soon as you reach 80%.',
    },
    {
      question: 'How long does it take to reach 80% LVR?',
      answer: 'The time to reach 80% LVR depends on several factors: 1) Your initial LVR: Starting at 95% LVR takes longer than starting at 85% LVR. 2) Your repayment rate: Making extra repayments accelerates the process. 3) Property appreciation: Market growth can significantly reduce your LVR. 4) Interest rates: Higher rates mean more of your payment goes to interest, slowing principal reduction. Example timeline: Starting at 90% LVR on a $400,000 loan at 6% interest: With standard repayments: 8-10 years to reach 80% LVR. With extra $200/month payments: 5-7 years to reach 80% LVR. With 3% annual property appreciation: 6-8 years to reach 80% LVR. With extra payments + property appreciation: 4-5 years to reach 80% LVR. The key is to make extra repayments whenever possible and monitor your property\'s value to request LMI removal as soon as you\'re eligible.',
    },
    {
      question: 'Is LMI tax deductible?',
      answer: 'LMI is generally not tax deductible for owner-occupied properties (your primary residence). However, if you borrow to invest in property or other income-producing assets, the LMI on that investment loan may be tax deductible. For example: Owner-occupied home: LMI is not deductible. Investment property: LMI on the investment loan is deductible. Mixed-purpose loan: Only the portion of LMI relating to the investment component is deductible. You should consult with a tax accountant or financial advisor to understand the tax implications of LMI in your specific situation, as tax laws are complex and individual circumstances vary.',
    },
    {
      question: 'What\'s the difference between LMI and mortgage protection insurance?',
      answer: 'LMI and mortgage protection insurance are different products: LMI (Lenders Mortgage Insurance): Protects the lender if you default. You pay the cost. It\'s mandatory when borrowing above 80% LVR. It doesn\'t protect you. Mortgage Protection Insurance: Protects you (the borrower) by paying off your mortgage if you die, become disabled, or lose your job. It\'s optional and you choose whether to purchase it. It protects your family and home. Example: If you have LMI and lose your job, LMI won\'t help you—you still owe the mortgage. If you have mortgage protection insurance, it may pay off your mortgage, protecting your family. Many borrowers confuse these two products. LMI is mandatory for high-LVR loans, while mortgage protection insurance is optional but highly recommended for financial security.',
    },
    {
      question: 'Can I negotiate LMI costs?',
      answer: 'LMI costs are largely determined by standardised insurance company rates based on your LVR, loan amount, and credit profile. However, there are some ways to potentially reduce LMI: 1) Improve your credit score: A better credit score may qualify you for lower LMI rates. 2) Increase your deposit: Even a small increase (e.g., from 10% to 12%) can significantly reduce LMI costs. 3) Shop around: Different lenders use different LMI providers with different rates. Compare quotes from multiple lenders. 4) Consider lender-paid LMI: Some lenders offer to pay LMI on your behalf in exchange for a slightly higher interest rate. This may be beneficial if you plan to refinance soon. 5) First home buyer schemes: If eligible, these can reduce or eliminate LMI. 6) Guarantor arrangements: A family guarantor may help you access lower LMI rates. While you can\'t directly negotiate with the LMI provider, shopping around for lenders and improving your financial profile can help reduce costs.',
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
