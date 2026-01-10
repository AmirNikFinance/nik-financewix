import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Last Updated: January 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none font-paragraph text-foreground/80 space-y-8">
            
            {/* Section 1 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                About This Privacy Policy
              </h2>
              <p>
                At nik.finance ("we", "us", "our"), we are committed to protecting your privacy and handling your personal information responsibly and in accordance with the Privacy Act 1988 (Cth) and other applicable privacy laws. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services, including loan brokerage, financial comparison services, direct lending, investment advice, financial planning, and budgeting tools.
              </p>
              <p>
                By using our services, you agree to the collection and use of your information as described in this Privacy Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Key Privacy Principles
              </h2>
              <p>We want you to know:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We will take reasonable steps to protect your personal information</li>
                <li>We will never sell your personal information to third parties</li>
                <li>We will comply with notification requirements if your information is lost or compromised</li>
                <li>We use your information to provide services to you and improve our operations</li>
                <li>We may record calls and online interactions for quality assurance, training, and compliance purposes</li>
                <li>You have rights to access, correct, and control how we use your information</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                What Information We Collect
              </h2>
              
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                3.1 Personal and Contact Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name, date of birth, and contact details (email, phone, address)</li>
                <li>Australian Government identifiers (driver's licence, passport, Medicare card)</li>
                <li>Foreign government identifiers for non-Australian residents</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                3.2 Financial Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Employment details and income information</li>
                <li>Assets and liabilities</li>
                <li>Bank statements, loan statements, and credit card statements</li>
                <li>Tax returns and financial statements</li>
                <li>Credit history and credit reports</li>
                <li>Information about your financial goals and objectives</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                3.3 Credit Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Credit enquiries and credit applications</li>
                <li>Repayment history on existing loans</li>
                <li>Defaults, bankruptcies, or other credit infringements</li>
                <li>Credit scores and credit assessments</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                3.4 Sensitive Information
              </h3>
              <p>
                Where relevant and with your consent, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Health information (for insurance assessments or hardship applications)</li>
                <li>Information about vulnerabilities or financial hardship circumstances</li>
                <li>Details about personal circumstances that may affect your financial situation</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                3.5 Technical and Usage Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address, browser type, and device information</li>
                <li>Website and app usage data through cookies and analytics tools</li>
                <li>Call recordings and chat transcripts</li>
                <li>AI chatbot interaction data</li>
                <li>Location data when you use our services</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                3.6 Other Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Information about your interactions with our services</li>
                <li>Feedback, survey responses, and complaint details</li>
                <li>Social media and publicly available information</li>
                <li>Information about your dependents and family circumstances (when relevant to financial planning)</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                How We Collect Your Information
              </h2>
              <p>We collect information:</p>
              
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                Directly from you when you:
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Enquire about or apply for our services</li>
                <li>Use our website, mobile app, or digital tools</li>
                <li>Speak with our advisors or customer service team</li>
                <li>Submit forms, applications, or use our calculators</li>
                <li>Participate in surveys or provide feedback</li>
                <li>Communicate with us via email, phone, or chat</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                From third parties including:
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Credit reporting bodies (Equifax, illion, Experian)</li>
                <li>Referral partners in Australia, UAE, UK, and USA</li>
                <li>Your representatives (accountants, lawyers, financial advisors)</li>
                <li>Joint applicants, co-applicants, or guarantors</li>
                <li>Your employer (when verifying employment and income)</li>
                <li>Lenders and financial institutions</li>
                <li>Publicly available sources and social media</li>
                <li>Service providers and data aggregators</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                Through technology:
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cookies and web analytics (including Google Analytics)</li>
                <li>Call recording systems</li>
                <li>AI chatbots and automated systems</li>
                <li>Consumer Data Right (CDR) data sharing with your consent</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                4.1 Consumer Data Right (CDR)
              </h3>
              <p>
                We are an accredited data recipient under the Consumer Data Right regime. With your consent, we can securely access your banking and financial data from participating financial institutions to help assess your financial situation and provide tailored advice. We will only use your CDR data for the specific purposes you have consented to, and in accordance with CDR rules and this Privacy Policy.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                How We Use Your Information
              </h2>
              <p>We use your personal information to:</p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                5.1 Provide Our Services
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Verify your identity and assess your eligibility for financial products</li>
                <li>Process loan applications and submit them to lenders</li>
                <li>Provide financial comparison services and recommendations</li>
                <li>Deliver investment advice and financial planning services</li>
                <li>Offer budgeting tools and financial management resources</li>
                <li>Manage our relationship with you and respond to your enquiries</li>
                <li>Process payments and manage billing</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                5.2 Improve Our Business
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Conduct internal research, analytics, and reporting</li>
                <li>Test and develop our systems and services</li>
                <li>Understand customer needs and preferences</li>
                <li>Train our staff and AI systems</li>
                <li>Monitor service quality and compliance</li>
                <li>Manage risk and prevent fraud</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                5.3 Communicate With You
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Send you information about your applications and services</li>
                <li>Provide customer support and respond to complaints</li>
                <li>Send service updates and important notices</li>
                <li>Conduct direct marketing (with your consent - see Section 8)</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                5.4 Comply With Legal Obligations
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Meet regulatory and legal requirements</li>
                <li>Respond to law enforcement and government requests</li>
                <li>Prevent and investigate fraud, crime, and misconduct</li>
                <li>Manage disputes and legal proceedings</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                5.5 De-identified Data
              </h3>
              <p>
                We may de-identify your information to create anonymised datasets for research, analytics, and insights that cannot be linked back to you personally.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Who We Share Your Information With
              </h2>
              <p>
                We will never sell your personal information. We may share your information with:
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                6.1 Lenders and Financial Institutions
              </h3>
              <p>
                When you apply for credit or financial products through us, we share your information with our panel of lenders and financial institutions to assess your application. These lenders may:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>List credit enquiries on your credit file</li>
                <li>Report credit information to credit reporting bodies</li>
                <li>Use your information in accordance with their own privacy policies</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                6.2 Credit Reporting Bodies (CRBs)
              </h3>
              <p>
                We may disclose your credit information to credit reporting bodies including Equifax, illion, and Experian. We may also obtain credit reports and credit scores from these bodies to assess your creditworthiness. In some cases, we may act as an "access seeker" which means our enquiry will not appear on your credit file or impact your credit score.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                6.3 Service Providers
              </h3>
              <p>
                We engage third-party service providers to help us deliver our services, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cloud hosting providers (including Google Cloud and other providers)</li>
                <li>Email and communication platforms</li>
                <li>Analytics and data processing services</li>
                <li>Marketing and advertising platforms</li>
                <li>IT support and cybersecurity services</li>
                <li>Legal and professional advisors</li>
                <li>Payment processors</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                6.4 Referral Partners
              </h3>
              <p>
                We work with referral partners in Australia, UAE, UK, and USA. When you are referred to us by a partner, or when we refer you to partner services, we may share relevant information to facilitate the referral.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                6.5 Other Third Parties
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Government agencies, regulators, and law enforcement when required by law</li>
                <li>External dispute resolution schemes (including AFCA)</li>
                <li>Professional advisors (accountants, lawyers) when you authorise us to do so</li>
                <li>Joint applicants, co-applicants, and guarantors involved in your application</li>
                <li>Our auditors and insurers</li>
                <li>Organisations that assist with fraud prevention and investigation</li>
                <li>Potential purchasers in the event of a business sale or restructure</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                6.6 With Your Consent
              </h3>
              <p>
                We may share your information with other third parties where you have provided your consent or where your consent can be reasonably inferred.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                International Data Transfers
              </h2>
              <p>
                Your information may be stored or processed on servers located overseas, including in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>United States</li>
                <li>United Kingdom</li>
                <li>United Arab Emirates</li>
                <li>Singapore</li>
                <li>Ireland</li>
                <li>New Zealand</li>
                <li>Japan</li>
                <li>Other locations where our cloud service providers operate</li>
              </ul>
              <p className="mt-4">
                When we transfer information overseas, we take steps to ensure appropriate data protection safeguards are in place. However, overseas organisations may be required to disclose information under foreign laws, and we cannot control such disclosures. Our referral partners in the UAE, UK, and USA may also receive and hold your information in accordance with their local privacy laws.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
