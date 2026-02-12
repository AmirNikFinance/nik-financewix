/**
 * HomePageIsland - Client-side interactive homepage content.
 * This is loaded as an Astro island (client:load) inside the server-rendered
 * index.astro page. SEO, schema, header, and footer are handled by Astro.
 * This component only handles interactive content: CMS data, animations, carousels.
 */
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  CheckCircle, Zap, Building2, Home, Car, DollarSign, Briefcase,
  Target, User, Clock, Star, ArrowRight, ShieldCheck
} from 'lucide-react';
import LendersCarousel from '@/components/LendersCarousel';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { LoanOptions, HowItWorksSteps, CustomerReviews, WhyChooseUsFeatures } from '@/entities';

// Animated element with intersection observer
const AnimatedElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}> = ({ children, className, delay = 0, direction = 'up' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      default: return 'none';
    }
  };

  return (
    <div
      ref={ref}
      className={`opacity-0 transition-all duration-1000 ease-out ${className || ''}`}
      style={{ transform: getTransform(), transitionDelay: `${delay}ms` }}
    >
      <style>{`.is-visible { opacity: 1 !important; transform: translate(0, 0) !important; }`}</style>
      {children}
    </div>
  );
};

export default function HomePageIsland() {
  const [loanOptions, setLoanOptions] = useState<LoanOptions[]>([]);
  const [howItWorksSteps, setHowItWorksSteps] = useState<HowItWorksSteps[]>([]);
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const [whyChooseUsFeatures, setWhyChooseUsFeatures] = useState<WhyChooseUsFeatures[]>([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loansData, stepsData, reviewsData, featuresData] = await Promise.all([
          BaseCrudService.getAll<LoanOptions>('loanoptions'),
          BaseCrudService.getAll<HowItWorksSteps>('howitworkssteps'),
          BaseCrudService.getAll<CustomerReviews>('customerreviews'),
          BaseCrudService.getAll<WhyChooseUsFeatures>('whychooseusfeatures'),
        ]);
        setLoanOptions(loansData.items);
        setHowItWorksSteps(stepsData.items.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));
        setReviews(reviewsData.items);
        setWhyChooseUsFeatures(featuresData.items.filter(f => f.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      } catch (err) {
        console.error('Failed to fetch CMS data:', err);
      }
    };
    fetchData();
  }, []);

  const getLoanIcon = (name?: string) => {
    if (!name) return <Home className="w-8 h-8" />;
    const n = name.toLowerCase();
    if (n.includes('home')) return <Home className="w-8 h-8" />;
    if (n.includes('car')) return <Car className="w-8 h-8" />;
    if (n.includes('personal')) return <DollarSign className="w-8 h-8" />;
    if (n.includes('business')) return <Briefcase className="w-8 h-8" />;
    return <Home className="w-8 h-8" />;
  };

  const getFeatureIcon = (title?: string) => {
    if (!title) return <Target className="w-10 h-10" />;
    const t = title.toLowerCase();
    if (t.includes('match') || t.includes('instant')) return <Target className="w-10 h-10" />;
    if (t.includes('expert') || t.includes('personal')) return <User className="w-10 h-10" />;
    if (t.includes('fast') || t.includes('track')) return <Clock className="w-10 h-10" />;
    return <Target className="w-10 h-10" />;
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white overflow-clip">
      {/* Global Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left" style={{ scaleX }} />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/80 to-secondary/40 z-10" />
          <Image
            src="https://static.wixstatic.com/media/e994c8_fe9aab1d39d448fb8e78e1ae53648c58~mv2.png?originWidth=1152&originHeight=576"
            alt="Modern financial district architecture representing NIK Finance loan marketplace"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-20 w-full max-w-[100rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <AnimatedElement direction="up" delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm w-fit">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-medium text-sm tracking-wide uppercase">AI-Powered Finance</span>
              </div>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={200}>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                Australia's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">Smartest Loan</span> <br />
                Marketplace
              </h2>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={300}>
              <p className="font-paragraph text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed border-l-2 border-accent/50 pl-6">
                AI-powered loan matching with 130+ lenders. Get approved in minutes, not days. Experience the future of borrowing.
              </p>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-10 py-8 text-lg font-semibold shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] transition-all hover:scale-105">
                    Get funded
                  </Button>
                </a>
              </div>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={500}>
              <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10">
                {[
                  { icon: CheckCircle, text: '100% Free Service' },
                  { icon: Zap, text: '5 Minute Application' },
                  { icon: Building2, text: '130+ Lenders' },
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-300 group cursor-default">
                    <badge.icon className="w-5 h-5 text-accent" />
                    <span className="font-medium text-sm">{badge.text}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>

          {/* Hero Visual Cards */}
          <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
            <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }} className="relative w-full h-full">
              <div className="absolute top-10 right-0 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"><Home className="text-accent w-5 h-5" /></div>
                  <span className="text-accent font-bold">APPROVED!</span>
                </div>
                <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                <div className="h-2 w-16 bg-white/10 rounded-full" />
              </div>
              <div className="absolute top-40 right-20 w-96 bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-secondary text-lg">Your Loan Options</h3>
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold">Available Now</span>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Home, label: 'Home Loan', rate: '5.89%', amount: '$650,000' },
                    { icon: Car, label: 'Car Finance', rate: '6.49%', amount: '$45,000' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl border border-accent/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"><item.icon className="w-5 h-5 text-white" /></div>
                        <div><p className="font-bold text-secondary">{item.label}</p><p className="text-xs text-gray-500">From {item.rate} p.a.</p></div>
                      </div>
                      <span className="font-bold text-secondary">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOAN OPTIONS */}
      {loanOptions.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <AnimatedElement direction="up" className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Find Your Perfect Loan</h2>
              <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">Whatever your financial needs, we have the right solution with competitive rates from 130+ lenders.</p>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {loanOptions.map((loan, idx) => (
                <AnimatedElement key={loan._id || idx} direction="up" delay={idx * 100}>
                  <a href={`/${(loan.loanName || '').toLowerCase().replace(/\s+/g, '-')}`} className="block group">
                    <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                        {getLoanIcon(loan.loanName)}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3">{loan.loanName}</h3>
                      <p className="font-paragraph text-foreground/70 text-sm leading-relaxed">{loan.shortDescription}</p>
                      <div className="flex items-center gap-2 mt-4 text-accent font-semibold text-sm">
                        Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      {howItWorksSteps.length > 0 && (
        <section className="py-20 md:py-28 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <AnimatedElement direction="up" className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">Getting your loan approved is simple, fast, and completely free.</p>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, idx) => (
                <AnimatedElement key={step._id || idx} direction="up" delay={idx * 150}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">{step.stepNumber || idx + 1}</div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">{step.stepTitle}</h3>
                    <p className="font-paragraph text-foreground/70 text-sm leading-relaxed">{step.stepDescription}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      {whyChooseUsFeatures.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <AnimatedElement direction="up" className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose NIK Finance</h2>
              <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">We combine cutting-edge AI technology with human expertise to deliver the best lending experience in Australia.</p>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUsFeatures.map((feature, idx) => (
                <AnimatedElement key={feature._id || idx} direction="up" delay={idx * 100}>
                  <div className="bg-light-gray rounded-2xl p-8 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                      {getFeatureIcon(feature.title)}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="font-paragraph text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LENDERS CAROUSEL */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <AnimatedElement direction="up" className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Our Lender Panel</h2>
            <p className="font-paragraph text-foreground/70">Access competitive rates from Australia's leading lenders</p>
          </AnimatedElement>
          <LendersCarousel />
        </div>
      </section>

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <AnimatedElement direction="up" className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
              <p className="font-paragraph text-lg text-foreground/70">Real experiences from Australians who've used NIK Finance</p>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.slice(0, 6).map((review, idx) => (
                <AnimatedElement key={review._id || idx} direction="up" delay={idx * 100}>
                  <div className="bg-light-gray rounded-2xl p-8 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.starRating || 5 }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="font-paragraph text-foreground/80 text-sm leading-relaxed flex-1 mb-4">"{review.reviewText}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-accent font-bold text-sm">{(review.customerName || 'A')[0]}</span>
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-foreground text-sm">{review.customerName}</p>
                        {review.customerLocation && <p className="font-paragraph text-foreground/50 text-xs">{review.customerLocation}</p>}
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <AnimatedElement direction="up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of Australians who've found their perfect loan through NIK Finance. Apply in minutes, get matched instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-10 py-6 text-lg font-semibold">
                  Apply Now - It's Free
                </Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full px-10 py-6 text-lg">
                  Talk to an Expert
                </Button>
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}
