/**
 * AGI/GEO Optimized Content Components
 * 
 * These components structure content for optimal AI parsing and
 * rich snippet generation in Google AI Overviews, ChatGPT, Perplexity, etc.
 */

import { useEffect } from 'react';
import { CheckCircle, Lightbulb, AlertCircle, HelpCircle, List, Clock } from 'lucide-react';

// ============================================
// KEY TAKEAWAYS - AI loves bullet point summaries
// ============================================
interface KeyTakeawaysProps {
  points: string[];
  title?: string;
}

export function KeyTakeaways({ points, title = "Key Takeaways" }: KeyTakeawaysProps) {
  useEffect(() => {
    // Add schema for key points
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": title,
      "itemListElement": points.map((point, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": point
      }))
    };

    let scriptTag = document.getElementById('key-takeaways-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'key-takeaways-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => { scriptTag?.remove(); };
  }, [points, title]);

  return (
    <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 md:p-8 my-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-accent" />
        </div>
        <h2 className="font-heading text-xl font-bold text-secondary">{title}</h2>
      </div>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <span className="font-paragraph text-foreground/80">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// TL;DR SUMMARY - Quick answer for AI extraction
// ============================================
interface TLDRProps {
  summary: string;
  answer?: string; // Direct answer to the main question
}

export function TLDR({ summary, answer }: TLDRProps) {
  return (
    <div className="bg-secondary/5 border-l-4 border-secondary rounded-r-xl p-6 my-8">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-secondary" />
        <span className="font-heading font-bold text-secondary text-sm uppercase tracking-wide">TL;DR</span>
      </div>
      {answer && (
        <p className="font-paragraph text-lg font-semibold text-secondary mb-2">
          {answer}
        </p>
      )}
      <p className="font-paragraph text-foreground/80">{summary}</p>
    </div>
  );
}

// ============================================
// FAQ SECTION - Structured for rich snippets
// ============================================
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  useEffect(() => {
    // FAQ Schema for rich snippets
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    let scriptTag = document.getElementById('faq-section-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'faq-section-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => { scriptTag?.remove(); };
  }, [faqs]);

  return (
    <div className="my-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-accent" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-secondary">{title}</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details 
            key={index} 
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-accent/50 transition-colors"
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer font-heading font-semibold text-secondary hover:text-accent transition-colors">
              <span>{faq.question}</span>
              <span className="ml-4 flex-shrink-0 text-accent group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="px-5 pb-5 pt-0">
              <p className="font-paragraph text-foreground/80 leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

// ============================================
// HOW-TO STEPS - For instructional content
// ============================================
interface HowToStep {
  title: string;
  description: string;
  tip?: string;
}

interface HowToSectionProps {
  title: string;
  description?: string;
  steps: HowToStep[];
  totalTime?: string; // e.g., "30 minutes"
}

export function HowToSection({ title, description, steps, totalTime }: HowToSectionProps) {
  useEffect(() => {
    // HowTo Schema for rich snippets
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": title,
      "description": description,
      ...(totalTime && { "totalTime": totalTime }),
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.title,
        "text": step.description
      }))
    };

    let scriptTag = document.getElementById('howto-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'howto-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => { scriptTag?.remove(); };
  }, [title, description, steps, totalTime]);

  return (
    <div className="my-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
          <List className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-secondary">{title}</h2>
      </div>
      {description && (
        <p className="font-paragraph text-foreground/70 mb-6 ml-13">{description}</p>
      )}
      {totalTime && (
        <div className="flex items-center gap-2 mb-6 ml-13 text-sm text-foreground/60">
          <Clock className="w-4 h-4" />
          <span>Estimated time: {totalTime}</span>
        </div>
      )}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-heading font-bold">
              {index + 1}
            </div>
            <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
              <h3 className="font-heading font-semibold text-secondary mb-2">{step.title}</h3>
              <p className="font-paragraph text-foreground/80">{step.description}</p>
              {step.tip && (
                <div className="mt-3 flex items-start gap-2 text-sm text-accent bg-accent/5 rounded-lg p-3">
                  <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Tip:</strong> {step.tip}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// QUICK ANSWER BOX - Direct answer for featured snippets
// ============================================
interface QuickAnswerProps {
  question: string;
  answer: string;
  details?: string;
}

export function QuickAnswer({ question, answer, details }: QuickAnswerProps) {
  return (
    <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6 md:p-8 my-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">Q</span>
        </div>
        <h3 className="font-heading text-lg font-bold text-secondary">{question}</h3>
      </div>
      <div className="ml-11">
        <p className="font-paragraph text-xl font-semibold text-accent mb-2">{answer}</p>
        {details && (
          <p className="font-paragraph text-foreground/70 text-sm">{details}</p>
        )}
      </div>
    </div>
  );
}

// ============================================
// COMPARISON TABLE - For product/option comparisons
// ============================================
interface ComparisonRow {
  feature: string;
  options: (string | boolean)[];
}

interface ComparisonTableProps {
  title: string;
  headers: string[];
  rows: ComparisonRow[];
}

export function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <h3 className="font-heading text-xl font-bold text-secondary mb-4">{title}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="p-4 text-left font-heading font-semibold">Feature</th>
            {headers.map((header, i) => (
              <th key={i} className="p-4 text-center font-heading font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="p-4 font-paragraph font-medium text-foreground">{row.feature}</td>
              {row.options.map((option, j) => (
                <td key={j} className="p-4 text-center font-paragraph">
                  {typeof option === 'boolean' ? (
                    option ? (
                      <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )
                  ) : (
                    option
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// CALLOUT BOX - Important notes and warnings
// ============================================
interface CalloutProps {
  type: 'info' | 'warning' | 'tip' | 'important';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <AlertCircle className="w-5 h-5 text-blue-500" />,
      titleColor: 'text-blue-700'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      titleColor: 'text-amber-700'
    },
    tip: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <Lightbulb className="w-5 h-5 text-green-500" />,
      titleColor: 'text-green-700'
    },
    important: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: <AlertCircle className="w-5 h-5 text-purple-500" />,
      titleColor: 'text-purple-700'
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl p-5 my-6`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
        <div>
          {title && (
            <h4 className={`font-heading font-semibold ${style.titleColor} mb-1`}>{title}</h4>
          )}
          <div className="font-paragraph text-foreground/80">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// STAT HIGHLIGHT - Key statistics
// ============================================
interface StatHighlightProps {
  stats: { value: string; label: string; }[];
}

export function StatHighlight({ stats }: StatHighlightProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-secondary/5 rounded-xl p-6 text-center">
          <div className="font-heading text-3xl font-bold text-accent mb-1">{stat.value}</div>
          <div className="font-paragraph text-sm text-foreground/60">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
