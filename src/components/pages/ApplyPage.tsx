import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Form from '@/components/forms/Form';
import LendersCarousel from '@/components/LendersCarousel';
import { CheckCircle, Zap, Building2 } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get Your Free Loan Quote
          </h1>
          <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
            Complete the form below to get matched with the best loan options from 130+ lenders. It only takes 5 minutes!
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-accent" />
            <span className="font-paragraph text-sm font-semibold text-foreground">100% Free Service</span>
          </div>

          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-accent" />
            <span className="font-paragraph text-sm font-semibold text-foreground">5 Minute Application</span>
          </div>

          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-accent" />
            <span className="font-paragraph text-sm font-semibold text-foreground">130+ Lenders</span>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-foreground/10 rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Loan Application Form
            </h2>
            <Form formServiceConfig={{ formId: "a3ca1543-a162-47a8-b6a8-e642a7d6be79" }} />
          </div>

          {/* Lenders Carousel */}
          <div className="mt-12">
            <LendersCarousel />
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-light-gray rounded-3xl p-8">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
              What Happens Next?
            </h3>
            <div className="space-y-3 font-paragraph text-base text-foreground/80">
              <p>✓ Our AI instantly analyses your application against 130+ lenders</p>
              <p>✓ You'll receive personalised loan recommendations within minutes</p>
              <p>{"✓ A dedicated loan specialist will contact you to finalise your application"}</p>
              <p>✓ Most applications are approved within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
