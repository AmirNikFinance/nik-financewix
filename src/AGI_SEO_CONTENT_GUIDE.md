# AGI & SEO Content Optimization Guide

## Overview

This guide explains how to create content optimized for both traditional SEO and AI-generated search results (Google AI Overviews, ChatGPT, Perplexity, etc.).

---

## 🤖 AGI-Optimized Components

Import these components for your blog articles:

```tsx
import {
  KeyTakeaways,
  TLDR,
  FAQSection,
  HowToSection,
  QuickAnswer,
  ComparisonTable,
  Callout,
  StatHighlight
} from '@/components/blog';
```

---

## 1. Key Takeaways

**Purpose:** Bullet point summary that AI can easily extract for quick answers.

```tsx
<KeyTakeaways 
  points={[
    "You can refinance your car loan anytime",
    "Typical savings: $50-200 per month",
    "No fees to apply through Nik Finance",
    "Most approvals within 24 hours"
  ]}
/>
```

**Best Practices:**
- 4-6 points maximum
- Start each with an action verb or key fact
- Include numbers/stats when possible
- Place at the TOP of the article

---

## 2. TL;DR Summary

**Purpose:** Quick answer for AI extraction and impatient readers.

```tsx
<TLDR 
  answer="Yes, you can refinance your car loan at any time."
  summary="Most car loans have no lock-in period, meaning you can refinance whenever you find a better rate. The typical savings range from $50-200 per month depending on your loan size and current rate."
/>
```

**Best Practices:**
- `answer` = Direct answer (1 sentence)
- `summary` = Brief explanation (2-3 sentences)
- Place immediately after the intro paragraph

---

## 3. FAQ Section

**Purpose:** Generates FAQ rich snippets in Google search results.

```tsx
<FAQSection 
  faqs={[
    {
      question: "Can I refinance my car loan with bad credit?",
      answer: "Yes, many lenders offer car loan refinancing for people with less-than-perfect credit. You may pay a slightly higher rate, but can still save money compared to your current loan."
    },
    {
      question: "How long does car refinancing take?",
      answer: "Most car refinance applications are approved within 24-48 hours. The entire process from application to settlement typically takes 3-7 business days."
    },
    {
      question: "Are there fees for refinancing a car loan?",
      answer: "Nik Finance charges no fees for our service. However, check if your current lender charges early exit fees or if your new lender has establishment fees."
    }
  ]}
/>
```

**Best Practices:**
- Answer in 2-4 sentences
- Use natural language (how people actually ask)
- Include the most searched questions
- 3-7 FAQs per article

---

## 4. How-To Section

**Purpose:** Generates "How to" rich snippets with step-by-step instructions.

```tsx
<HowToSection 
  title="How to Refinance Your Car Loan"
  description="Follow these simple steps to switch to a better car loan rate."
  totalTime="PT30M" // ISO 8601 duration format
  steps={[
    {
      title: "Check Your Current Loan Details",
      description: "Find your current interest rate, remaining balance, and any exit fees. This information is on your latest statement.",
      tip: "Call your lender if you can't find your rate"
    },
    {
      title: "Compare New Loan Options",
      description: "Use our AI-powered comparison tool to instantly see rates from 130+ lenders based on your profile.",
    },
    {
      title: "Submit Your Application",
      description: "Fill out our simple online form. Most applications take under 5 minutes to complete.",
    },
    {
      title: "Get Approved & Settle",
      description: "Once approved, we handle the settlement process including paying out your old loan.",
      tip: "Keep making payments on your old loan until settlement is confirmed"
    }
  ]}
/>
```

---

## 5. Quick Answer Box

**Purpose:** Featured snippet optimization for direct question queries.

```tsx
<QuickAnswer 
  question="What is the average car loan interest rate in Australia?"
  answer="The average car loan rate in Australia is 7.5-9.5% (2024)"
  details="Rates vary based on credit score, loan amount, and whether the loan is secured or unsecured. The best rates start from around 5.99% for excellent credit."
/>
```

---

## 6. Comparison Table

**Purpose:** Side-by-side comparisons that AI can easily parse.

```tsx
<ComparisonTable 
  title="Secured vs Unsecured Car Loans"
  headers={['Secured', 'Unsecured']}
  rows={[
    { feature: 'Interest Rate', options: ['Lower (5-9%)', 'Higher (9-15%)'] },
    { feature: 'Requires Asset Security', options: [true, false] },
    { feature: 'Approval Speed', options: ['1-3 days', 'Same day possible'] },
    { feature: 'Best For', options: ['Lower rates', 'Flexibility'] },
  ]}
/>
```

---

## 7. Callout Boxes

**Purpose:** Highlight important information, warnings, and tips.

```tsx
<Callout type="tip" title="Pro Tip">
  Apply for pre-approval before visiting the dealership. This gives you negotiating power and prevents dealer finance pressure.
</Callout>

<Callout type="warning" title="Watch Out">
  Some lenders charge early exit fees. Always check your current loan terms before refinancing.
</Callout>

<Callout type="important" title="Important">
  Your car must be worth more than your loan balance to refinance with most lenders.
</Callout>
```

Types: `tip`, `warning`, `info`, `important`

---

## 8. Stat Highlights

**Purpose:** Eye-catching statistics that build authority.

```tsx
<StatHighlight 
  stats={[
    { value: '$157', label: 'Average monthly savings' },
    { value: '24hrs', label: 'Typical approval time' },
    { value: '130+', label: 'Lender partners' },
    { value: '$0', label: 'Our service fee' },
  ]}
/>
```

---

## 📝 Article Structure Template

For optimal AGI/SEO performance, structure articles like this:

```
1. Title (H1) - Include primary keyword
2. Key Takeaways - Bullet summary
3. TL;DR - Quick answer
4. Introduction (2-3 paragraphs)
5. Main Content with H2/H3 headings
   - How-To sections where applicable
   - Comparison tables where applicable
   - Callouts for important points
6. FAQ Section
7. Conclusion with CTA
```

---

## 🎯 SEO Checklist

For every article:

- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] Meta description (150-160 chars) with keyword
- [ ] At least 3 FAQ questions
- [ ] Key Takeaways section
- [ ] TL;DR summary
- [ ] Internal links to related articles (3-5)
- [ ] External links to authoritative sources (1-2)
- [ ] Alt text on all images
- [ ] Schema markup via components

---

## 🔑 High-Value Keywords by Topic

### Car Refinance
- "can I refinance my car loan" (high intent)
- "refinance car loan calculator"
- "how to refinance car loan with bad credit"
- "car loan refinance rates"

### Home Loans
- "home loan calculator"
- "first home buyer grant [state]"
- "mortgage broker near me"
- "home loan comparison"

### Business Loans
- "small business loan Australia"
- "equipment finance"
- "business loan calculator"

---

## 💡 Content Ideas That Rank

1. **"Can I..." questions** - High intent, easy to answer
2. **"How to..." guides** - Step-by-step content
3. **"Best..." lists** - Comparison content
4. **"[Year] guide to..."** - Fresh, dated content
5. **Calculator pages** - Interactive tools
6. **State-specific content** - "First home buyer grant NSW"

---

*Last updated: February 2026*
