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

            {/* Section 8 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Marketing Communications
              </h2>
              <p>
                We may send you marketing communications about our services, products, and special offers. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email newsletters and promotional offers</li>
                <li>SMS and push notifications (where you have opted in)</li>
                <li>Targeted advertising on social media and other platforms</li>
                <li>Information about new services and features</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                8.1 Your Marketing Preferences
              </h3>
              <p>
                You can manage your marketing preferences at any time by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Clicking the "unsubscribe" link in any marketing email</li>
                <li>Replying "STOP" to any SMS message</li>
                <li>Updating your preferences in your account settings</li>
                <li>Contacting us directly (see Section 14 for contact details)</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                8.2 Consent for Marketing
              </h3>
              <p>
                We will only send you marketing communications where you have provided your consent or where we are permitted to do so under applicable privacy laws. We will not send unsolicited marketing communications to you without your consent.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                8.3 Targeted Advertising
              </h3>
              <p>
                We use your information to deliver targeted advertising to you on social media platforms and other websites. You can control targeted advertising through your social media account settings and advertising preference centres.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website and app, and to understand how you use our services.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                9.1 Types of Cookies We Use
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality (login, security, form submission)</li>
                <li><strong>Performance Cookies:</strong> Help us understand how you use our services (Google Analytics, Hotjar)</li>
                <li><strong>Marketing Cookies:</strong> Used to track your interactions for targeted advertising</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                9.2 Managing Cookies
              </h3>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Accept or reject cookies</li>
                <li>Delete existing cookies</li>
                <li>Receive a warning before a cookie is stored</li>
              </ul>
              <p className="mt-4">
                Please note that disabling cookies may affect the functionality of our website and services.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                9.3 Third-Party Tracking
              </h3>
              <p>
                We use third-party analytics and advertising services including Google Analytics, Facebook Pixel, and other tracking tools. These services may collect information about your browsing behaviour across multiple websites. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                9.4 Do Not Track
              </h3>
              <p>
                Some browsers include a "Do Not Track" feature. Our website does not currently respond to Do Not Track signals, but you can use your browser settings to control cookies and tracking technologies.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Data Security and Retention
              </h2>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                10.1 Security Measures
              </h3>
              <p>
                We take the security of your personal information seriously and implement appropriate technical and organisational measures to protect your information against unauthorised access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest (SSL/TLS protocols)</li>
                <li>Secure authentication mechanisms and access controls</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Employee training on data protection and security</li>
                <li>Incident response procedures</li>
                <li>Firewalls and intrusion detection systems</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                10.2 Limitations of Security
              </h3>
              <p>
                While we implement comprehensive security measures, no system is completely secure. We cannot guarantee absolute security of your information. You are responsible for maintaining the confidentiality of your login credentials and account information.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                10.3 Data Retention
              </h3>
              <p>
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide our services to you</li>
                <li>Comply with legal and regulatory obligations</li>
                <li>Resolve disputes and enforce our agreements</li>
                <li>Maintain business records and audit trails</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                10.4 Retention Periods
              </h3>
              <p>
                Typical retention periods include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Loan Applications:</strong> 7 years (for regulatory compliance)</li>
                <li><strong>Customer Records:</strong> 7 years after the relationship ends</li>
                <li><strong>Financial Records:</strong> 7 years (as required by tax law)</li>
                <li><strong>Marketing Data:</strong> Until you unsubscribe or request deletion</li>
                <li><strong>Website Analytics:</strong> 26 months (Google Analytics default)</li>
                <li><strong>Call Recordings:</strong> 12 months (unless required for disputes or compliance)</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                10.5 Deletion of Information
              </h3>
              <p>
                When we no longer need your information, we will securely delete or de-identify it. In some cases, we may be required to retain information for legal or regulatory reasons, even after you request deletion.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Your Rights and Choices
              </h2>
              <p>
                Under the Privacy Act 1988 (Cth) and other applicable privacy laws, you have the following rights:
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                11.1 Right to Access
              </h3>
              <p>
                You have the right to request access to the personal information we hold about you. We will provide you with a copy of your information within 30 days of your request (or as otherwise required by law). We may charge a reasonable fee for providing access.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                11.2 Right to Correct
              </h3>
              <p>
                If you believe the personal information we hold about you is inaccurate, incomplete, or out of date, you can request that we correct it. We will take reasonable steps to correct your information and notify relevant third parties of the correction.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                11.3 Right to Delete
              </h3>
              <p>
                You can request that we delete your personal information, subject to certain exceptions (such as where we are required to retain it for legal or regulatory reasons). We will assess your request and respond within 30 days.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                11.4 Right to Opt Out
              </h3>
              <p>
                You can opt out of:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Marketing communications (see Section 8)</li>
                <li>Cookies and tracking technologies (see Section 9)</li>
                <li>Direct marketing and targeted advertising</li>
                <li>Sharing your information with third parties (where permitted by law)</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                11.5 Right to Data Portability
              </h3>
              <p>
                You have the right to request your personal information in a structured, commonly used, and machine-readable format, and to transmit that data to another organisation.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                11.6 Right to Object
              </h3>
              <p>
                You can object to our processing of your personal information for certain purposes, including direct marketing and automated decision-making.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                11.7 How to Exercise Your Rights
              </h3>
              <p>
                To exercise any of these rights, please contact us using the details in Section 14. We will respond to your request within 30 days (or as otherwise required by law). We may ask you to verify your identity before processing your request.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Complaints and Disputes
              </h2>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                12.1 Making a Complaint
              </h3>
              <p>
                If you believe we have breached your privacy rights or this Privacy Policy, you can lodge a complaint with us. Please provide:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your name and contact details</li>
                <li>Details of the alleged breach</li>
                <li>The date(s) of the alleged breach</li>
                <li>Any supporting documentation</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                12.2 Our Response
              </h3>
              <p>
                We will acknowledge your complaint within 1 business day and provide a substantive response within 30 days. If we cannot resolve your complaint within 30 days, we will provide you with a progress update and timeframe for resolution.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                12.3 External Dispute Resolution
              </h3>
              <p>
                If you are not satisfied with our response, you can lodge a complaint with the Office of the Australian Information Commissioner (OAIC):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Website:</strong> www.oaic.gov.au</li>
                <li><strong>Phone:</strong> 1300 363 992</li>
                <li><strong>Email:</strong> enquiries@oaic.gov.au</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                12.4 Financial Services Complaints
              </h3>
              <p>
                If your complaint relates to our financial services, you can also lodge a complaint with the Australian Financial Complaints Authority (AFCA):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Website:</strong> www.afca.org.au</li>
                <li><strong>Phone:</strong> 1800 931 678</li>
                <li><strong>Email:</strong> info@afca.org.au</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting the updated Privacy Policy on our website</li>
                <li>Updating the "Last Updated" date at the top of this policy</li>
                <li>Sending you an email notification (for material changes)</li>
                <li>Requiring your consent (where required by law)</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                13.1 Your Continued Use
              </h3>
              <p>
                Your continued use of our services after we post changes to this Privacy Policy constitutes your acceptance of the updated policy. If you do not agree with the changes, you should stop using our services.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, our privacy practices, or your personal information, please contact us:
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                14.1 Contact Details
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Email:</strong> privacy@nik.finance</li>
                <li><strong>Phone:</strong> 1300 NIK FIN (1300 645 346)</li>
                <li><strong>Mailing Address:</strong> NIK Finance, Australia</li>
                <li><strong>Website:</strong> www.nik.finance</li>
              </ul>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                14.2 Privacy Officer
              </h3>
              <p>
                We have appointed a Privacy Officer to oversee our privacy practices and handle privacy-related enquiries. You can contact our Privacy Officer at privacy@nik.finance.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                14.3 Response Times
              </h3>
              <p>
                We aim to respond to all privacy-related enquiries within 5 business days. For access requests and formal complaints, we will respond within the timeframes specified in this Privacy Policy or as required by law.
              </p>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 mt-6">
                14.4 Acknowledgment
              </h3>
              <p>
                By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your personal information as described herein.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
