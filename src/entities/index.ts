/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogarticles
 * Interface for BlogArticles
 */
export interface BlogArticles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType image */
  featuredImage?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publishDate?: Date | string;
  /** @wixFieldType text */
  seoTitle?: string;
  /** @wixFieldType text */
  seoDescription?: string;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: customerreviews
 * Interface for CustomerReviews
 */
export interface CustomerReviews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  starRating?: number;
  /** @wixFieldType text */
  reviewText?: string;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  customerLocation?: string;
  /** @wixFieldType date */
  reviewDate?: Date | string;
}


/**
 * Collection ID: howitworkssteps
 * Interface for HowItWorksSteps
 */
export interface HowItWorksSteps {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  stepNumber?: number;
  /** @wixFieldType text */
  stepTitle?: string;
  /** @wixFieldType text */
  stepDescription?: string;
  /** @wixFieldType text */
  callToActionLabel?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}


/**
 * Collection ID: loanoptions
 * Interface for LoanOptions
 */
export interface LoanOptions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  loanName?: string;
  /** @wixFieldType text */
  startingRate?: string;
  /** @wixFieldType image */
  loanIcon?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  buttonText?: string;
  /** @wixFieldType url */
  quoteFormUrl?: string;
}


/**
 * Collection ID: whychooseusfeatures
 * Interface for WhyChooseUsFeatures
 */
export interface WhyChooseUsFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image */
  icon?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: blogarticles
 * Interface for BlogArticles
 */
export interface BlogArticles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType image */
  featuredImage?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publishDate?: Date | string;
  /** @wixFieldType text */
  seoTitle?: string;
  /** @wixFieldType text */
  seoDescription?: string;
  /** @wixFieldType text */
  category?: string;
}
