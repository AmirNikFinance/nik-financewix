export default function PrivacyPolicyPageClient() {
  return (
    <div className="min-h-screen bg-white">
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
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                How We Use Your Information
              </h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To assess your loan application and provide loan recommendations</li>
                <li>To arrange loans with lenders on your behalf</li>
                <li>To conduct credit checks and verify your identity</li>
                <li>To communicate with you about your application and loan</li>
                <li>To comply with legal and regulatory obligations</li>
                <li>To improve our services and customer experience</li>
                <li>To conduct market research and analytics</li>
                <li>To send you marketing communications (with your consent)</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information held by us</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal obligations)</li>
                <li>Opt out of marketing communications</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> Hello@nik.finance<br/>
                <strong>Phone:</strong> 1300 NIK FIN<br/>
                <strong>Address:</strong> Australia Wide Service
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
