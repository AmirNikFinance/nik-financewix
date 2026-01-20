/**
 * SEO Keywords and Metadata for Blog Topics
 * Optimized for Australian mortgage and finance market
 */

export const blogTopicKeywords = {
  'home-loans': {
    primaryKeywords: [
      'home loans Australia',
      'mortgage rates',
      'home loan comparison',
      'best home loans',
      'home loan calculator'
    ],
    secondaryKeywords: [
      'fixed rate home loan',
      'variable rate mortgage',
      'home loan approval',
      'mortgage broker',
      'home loan interest rates'
    ],
    relatedTopics: ['refinancing', 'first-home-buyer', 'investment-property']
  },
  'refinancing': {
    primaryKeywords: [
      'refinance home loan',
      'refinancing tips',
      'mortgage refinancing',
      'refinance rates',
      'home loan refinance calculator'
    ],
    secondaryKeywords: [
      'when to refinance',
      'refinancing costs',
      'break costs refinancing',
      'cash out refinance',
      'debt consolidation refinance'
    ],
    relatedTopics: ['home-loans', 'debt-consolidation', 'equity-release']
  },
  'first-home-buyer': {
    primaryKeywords: [
      'first home buyer',
      'first home buyer grant',
      'first home loan deposit scheme',
      'first home buyer tips',
      'first home buyer checklist'
    ],
    secondaryKeywords: [
      'stamp duty concession',
      'first home super saver scheme',
      'low deposit home loan',
      'guarantor home loan',
      'first home buyer eligibility'
    ],
    relatedTopics: ['home-loans', 'stamp-duty', 'lmi']
  },
  'investment-property': {
    primaryKeywords: [
      'investment property loan',
      'investment home loan',
      'property investment finance',
      'investment property rates',
      'negative gearing'
    ],
    secondaryKeywords: [
      'investment property tax',
      'rental property loan',
      'investment loan calculator',
      'interest only investment loan',
      'property portfolio finance'
    ],
    relatedTopics: ['home-loans', 'refinancing', 'equity-release']
  },
  'car-loans': {
    primaryKeywords: [
      'car loan Australia',
      'new car loan',
      'car finance',
      'car loan rates',
      'car loan calculator'
    ],
    secondaryKeywords: [
      'secured car loan',
      'unsecured car loan',
      'car loan comparison',
      'bad credit car loan',
      'balloon payment car loan'
    ],
    relatedTopics: ['car-refinance', 'personal-loans', 'equipment-finance']
  },
  'car-refinance': {
    primaryKeywords: [
      'refinance car loan',
      'car loan refinancing',
      'refinance car finance',
      'lower car loan rate',
      'car refinance calculator'
    ],
    secondaryKeywords: [
      'car loan consolidation',
      'reduce car payments',
      'car refinance savings',
      'switch car loan',
      'car refinance eligibility'
    ],
    relatedTopics: ['car-loans', 'personal-loans', 'debt-consolidation']
  },
  'business-loans': {
    primaryKeywords: [
      'business loan Australia',
      'small business loan',
      'business finance',
      'business loan rates',
      'startup business loan'
    ],
    secondaryKeywords: [
      'business loan calculator',
      'unsecured business loan',
      'business line of credit',
      'business loan requirements',
      'business working capital'
    ],
    relatedTopics: ['equipment-finance', 'fitout-loans', 'commercial-property']
  },
  'equipment-finance': {
    primaryKeywords: [
      'equipment finance',
      'equipment loan',
      'business equipment finance',
      'equipment leasing',
      'machinery finance'
    ],
    secondaryKeywords: [
      'chattel mortgage',
      'equipment finance lease',
      'commercial equipment loan',
      'equipment finance calculator',
      'tax benefits equipment finance'
    ],
    relatedTopics: ['business-loans', 'fitout-loans', 'commercial-finance']
  },
  'personal-loans': {
    primaryKeywords: [
      'personal loan Australia',
      'personal loan rates',
      'personal loan calculator',
      'quick personal loan',
      'best personal loans'
    ],
    secondaryKeywords: [
      'secured personal loan',
      'unsecured personal loan',
      'personal loan comparison',
      'bad credit personal loan',
      'personal loan eligibility'
    ],
    relatedTopics: ['unsecured-loans', 'debt-consolidation', 'car-loans']
  },
  'unsecured-loans': {
    primaryKeywords: [
      'unsecured loan',
      'unsecured personal loan',
      'no security loan',
      'unsecured loan rates',
      'unsecured business loan'
    ],
    secondaryKeywords: [
      'unsecured loan calculator',
      'unsecured loan approval',
      'unsecured loan requirements',
      'fast unsecured loan',
      'unsecured loan comparison'
    ],
    relatedTopics: ['personal-loans', 'business-loans', 'debt-consolidation']
  },
  'motorbike-loan': {
    primaryKeywords: [
      'motorbike loan',
      'motorcycle finance',
      'bike loan Australia',
      'motorbike loan rates',
      'motorcycle loan calculator'
    ],
    secondaryKeywords: [
      'new motorbike loan',
      'used bike finance',
      'secured motorcycle loan',
      'motorbike loan comparison',
      'bike finance approval'
    ],
    relatedTopics: ['car-loans', 'personal-loans', 'recreational-vehicle-finance']
  },
  'boat-loan': {
    primaryKeywords: [
      'boat loan',
      'marine finance',
      'boat finance Australia',
      'boat loan rates',
      'boat loan calculator'
    ],
    secondaryKeywords: [
      'new boat loan',
      'used boat finance',
      'yacht finance',
      'boat loan comparison',
      'marine finance approval'
    ],
    relatedTopics: ['car-loans', 'personal-loans', 'recreational-vehicle-finance']
  },
  'fitout-loans': {
    primaryKeywords: [
      'fitout loan',
      'fitout finance',
      'shop fitout loan',
      'office fitout finance',
      'commercial fitout loan'
    ],
    secondaryKeywords: [
      'retail fitout finance',
      'restaurant fitout loan',
      'fitout finance calculator',
      'business fitout loan',
      'fitout lease finance'
    ],
    relatedTopics: ['business-loans', 'equipment-finance', 'commercial-finance']
  },
  'debt-consolidation': {
    primaryKeywords: [
      'debt consolidation loan',
      'consolidate debt',
      'debt consolidation Australia',
      'debt consolidation calculator',
      'consolidate credit cards'
    ],
    secondaryKeywords: [
      'debt consolidation refinance',
      'consolidate personal loans',
      'debt consolidation rates',
      'debt consolidation benefits',
      'debt consolidation eligibility'
    ],
    relatedTopics: ['refinancing', 'personal-loans', 'home-loans']
  }
};

/**
 * Get SEO keywords for a specific blog topic
 */
export function getKeywordsForTopic(topic: string) {
  const normalizedTopic = topic.toLowerCase().replace(/\s+/g, '-');
  return blogTopicKeywords[normalizedTopic as keyof typeof blogTopicKeywords] || null;
}

/**
 * Generate meta description with keywords
 */
export function generateMetaDescription(topic: string, customText?: string): string {
  const keywords = getKeywordsForTopic(topic);
  if (!keywords) return customText || '';

  const primaryKeyword = keywords.primaryKeywords[0];
  if (customText) {
    return `${customText} Learn about ${primaryKeyword} and more.`;
  }

  return `Expert guide on ${primaryKeyword}. Compare rates, get tips, and find the best options for your needs. Updated ${new Date().getFullYear()}.`;
}

/**
 * Get related article suggestions based on topic
 */
export function getRelatedTopics(topic: string): string[] {
  const keywords = getKeywordsForTopic(topic);
  return keywords?.relatedTopics || [];
}
