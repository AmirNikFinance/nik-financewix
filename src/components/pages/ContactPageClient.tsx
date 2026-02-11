import Form from '@/components/forms/Form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white border border-foreground/10 rounded-3xl p-8">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Send us a Message
            </h2>
            <Form formServiceConfig={{ formId: "ffb2bad7-8156-44c8-b3ed-f72b2063e703" }} />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-light-gray rounded-3xl p-8">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <p className="font-paragraph text-base text-foreground/80">
                      Hello@nik.finance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      Phone
                    </h3>
                    <p className="font-paragraph text-base text-foreground/80">
                      1300 NIK FIN
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      Location
                    </h3>
                    <p className="font-paragraph text-base text-foreground/80">
                      Australia Wide Service
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary text-white rounded-3xl p-8">
              <h3 className="font-heading text-xl font-semibold mb-4">
                Business Hours
              </h3>
              <div className="space-y-3 font-paragraph">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
