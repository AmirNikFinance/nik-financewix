// HPI 1.6-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  CheckCircle, Zap, Building2, Home, Car, DollarSign, Briefcase, 
  Target, User, Clock, Star, ArrowRight, ChevronRight, ShieldCheck, 
  Smartphone, TrendingUp, MousePointerClick 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LendersCarousel from '@/components/LendersCarousel';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import SEO, { LocalBusinessSchema } from '@/components/SEO';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { LoanOptions, HowItWorksSteps, CustomerReviews, WhyChooseUsFeatures } from '@/entities';
import { trackButtonClick } from '@/lib/analytics';

// --- Utility Components for Motion & Layout ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up' 
}) => {
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
    switch(direction) {
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
      style={{ 
        transform: getTransform(),
        transitionDelay: `${delay}ms`
      }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

const ParallaxSection = ({ children, className, speed = 0.5 }: { children: React.ReactNode, className?: string, speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  // Canonical Data Sources
  const [loanOptions, setLoanOptions] = useState<LoanOptions[]>([]);
  const [howItWorksSteps, setHowItWorksSteps] = useState<HowItWorksSteps[]>([]);
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const [whyChooseUsFeatures, setWhyChooseUsFeatures] = useState<WhyChooseUsFeatures[]>([]);

  // Scroll Progress for Global Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  const getLoanIcon = (loanName?: string) => {
    if (!loanName) return <Home className="w-8 h-8" />;
    const name = loanName.toLowerCase();
    if (name.includes('home')) return <Home className="w-8 h-8" />;
    if (name.includes('car')) return <Car className="w-8 h-8" />;
    if (name.includes('personal')) return <DollarSign className="w-8 h-8" />;
    if (name.includes('business')) return <Briefcase className="w-8 h-8" />;
    return <Home className="w-8 h-8" />;
  };

  const getFeatureIcon = (title?: string) => {
    if (!title) return <Target className="w-10 h-10" />;
    const titleLower = title.toLowerCase();
    if (titleLower.includes('match') || titleLower.includes('instant')) return <Target className="w-10 h-10" />;
    if (titleLower.includes('expert') || titleLower.includes('personal')) return <User className="w-10 h-10" />;
    if (titleLower.includes('fast') || titleLower.includes('track')) return <Clock className="w-10 h-10" />;
    return <Target className="w-10 h-10" />;
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white overflow-clip">
      {/* SEO Meta Tags & Schema */}
      <SEO 
        title="Australia's Smartest Loan Marketplace"
        description="Get matched with 130+ lenders in minutes. Car finance, home loans, refinancing & business loans. Free service, fast approval. AI-powered loan matching."
        keywords="car loan Australia, home loan, mortgage broker, car finance, refinance car loan, personal loan, business loan, AI finance broker"
      />
      <LocalBusinessSchema />
      
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />
      <Header />
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-secondary">
        {/* Background Parallax Layer */}
        <div className="absolute inset-0 z-0">
          <ParallaxSection speed={-0.2} className="w-full h-[120%] -top-[10%]">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/80 to-secondary/40 z-10" />
            <Image
              src="https://static.wixstatic.com/media/e994c8_fe9aab1d39d448fb8e78e1ae53648c58~mv2.png?originWidth=1152&originHeight=576"
              alt="Modern financial district architecture"
              className="w-full h-full object-cover opacity-60"
            />
          </ParallaxSection>
        </div>

        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[100rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <AnimatedElement direction="up" delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm w-fit">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-medium text-sm tracking-wide uppercase">AI-Powered Finance</span>
              </div>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={200}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                Australia's <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">Smartest Loan</span> <br/>
                Marketplace
              </h1>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={300}>
              <p className="font-paragraph text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed border-l-2 border-accent/50 pl-6">
                AI-powered loan matching with 130+ lenders. Get approved in minutes, not days. Experience the future of borrowing.
              </p>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a 
                  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick('hero-get-funded', 'Get funded')}
                >
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-10 py-8 text-lg font-semibold shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] transition-all hover:scale-105">
                    Get funded
                  </Button>
                </a>

              </div>
            </AnimatedElement>

            {/* Trust Badges */}
            <AnimatedElement direction="up" delay={500}>
              <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10">
                {[
                  { icon: CheckCircle, text: "100% Free Service" },
                  { icon: Zap, text: "5 Minute Application" },
                  { icon: Building2, text: "130+ Lenders" }
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-300 group cursor-default">
                    <badge.icon className="w-5 h-5 text-accent group-hover:text-white transition-colours" />
                    <span className="font-medium text-sm">{badge.text}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>

          {/* Hero Visual / Abstract UI */}
          <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/20 z-10 pointer-events-none" />
             <motion.div 
               initial={{ opacity: 0, x: 100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
               className="relative w-full h-full"
             >
                {/* Floating Cards Composition */}
                <div className="absolute top-10 right-0 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-10">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Home className="text-accent w-5 h-5" />
                    </div>
                    <span className="text-accent font-bold">{"APPROVED!"}</span>
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
                     <div className="flex justify-between items-center p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl border border-accent/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                            <Home className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-secondary block">Home Loan</span>

                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-accent" />
                     </div>
                     <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-secondary block">Investment Loan</span>

                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                     </div>
                   </div>
                   <Button className="w-full mt-6 bg-secondary text-white rounded-xl py-6 hover:bg-secondary/90 transition-colors">Compare Options</Button>
                </div>

                <div className="absolute bottom-20 right-0 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform rotate-[3deg] hover:rotate-0 transition-transform duration-500 z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-blue-500" />
                    <div>
                      <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>
      {/* --- LOAN OPTIONS SECTION (Overlapping) --- */}
      <section className="relative z-30 -mt-20 pb-32 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {loanOptions.map((loan, index) => (
              <AnimatedElement key={loan._id} delay={index * 100} direction="up" className="h-full">
                <div className="group relative h-full bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2">
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <div className="p-4 rounded-2xl bg-gray-50 text-secondary group-hover:bg-accent group-hover:text-white transition-colours duration-300 inline-block">
                        {getLoanIcon(loan.loanName)}
                      </div>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-secondary mb-3 group-hover:text-accent transition-colours">
                      {loan.loanName}
                    </h3>
                    
                    <p className="text-gray-500 font-paragraph leading-relaxed mb-8 flex-grow">
                      {loan.shortDescription}
                    </p>

                    <Link to={loan.quoteFormUrl || '/apply'} className="mt-auto">
                      <Button variant="outline" className="w-full rounded-xl py-6 border-gray-200 text-secondary font-semibold group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-300 flex justify-between items-center px-6">
                        {loan.buttonText || 'Get Quote'}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
      {/* --- HOW IT WORKS (Sticky Scroll) --- */}
      <section className="relative w-full py-32 bg-light-gray overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 bg-background rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-14 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            
            {/* Sticky Left Side */}
            <div className="relative h-fit lg:sticky lg:top-32">
              <AnimatedElement direction="right">
                <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">The Process</span>
                <h2 className="font-heading text-5xl md:text-6xl font-bold text-secondary mb-8 leading-tight">
                  Get approved in <br/>
                  <span className="text-accent">3 simple steps</span>
                </h2>
                <p className="font-paragraph text-xl text-gray-600 mb-12 max-w-md">
                  Our AI-driven process removes the hassle from borrowing. Fast, transparent, and tailored to you.
                </p>
                
                <div className="hidden lg:block relative w-full aspect-square max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                   <Image 
                     src="https://static.wixstatic.com/media/e994c8_4b3e519ac8ca49cfa015e3ce48b7bf49~mv2.png?originWidth=576&originHeight=576" 
                     alt="App Interface" 
                     className="w-full h-full object-cover"
                   />
                   {/* Floating UI Element */}
                   <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-secondary">AI Analysis Complete</span>
                      </div>
                   </div>
                </div>
              </AnimatedElement>
            </div>

            {/* Scrollable Right Side */}
            <div className="flex flex-col gap-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gray-200 hidden md:block" />

              {howItWorksSteps.map((step, index) => (
                <AnimatedElement key={step._id} delay={index * 150} direction="up">
                  <div className="relative pl-0 md:pl-24 group">
                    {/* Number Badge */}
                    <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 rounded-2xl bg-white border border-gray-100 items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-accent transition-all duration-300 z-10">
                      <span className="font-heading text-2xl font-bold text-secondary group-hover:text-accent transition-colours">
                        0{step.stepNumber}
                      </span>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                      <div className="md:hidden w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                        <span className="font-bold text-accent">0{step.stepNumber}</span>
                      </div>
                      
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-4">
                        {step.stepTitle}
                      </h3>
                      <p className="font-paragraph text-lg text-gray-600 leading-relaxed mb-6">
                        {step.stepDescription}
                      </p>
                      
                      {step.callToActionUrl && (
                        <Link to={step.callToActionUrl} className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all">
                          {step.callToActionLabel || 'Learn more'} <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- WHY CHOOSE US (Bento Grid) --- */}
      <section className="py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedElement direction="up">
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-secondary mb-6">
                Why Choose <span className="text-accent">NIK FINANCE</span>
              </h2>
              <p className="font-paragraph text-xl text-gray-500">
                We combine cutting-edge AI technology with human expertise to deliver the best loan outcomes.
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">
            {/* Feature 1 - Large */}
            {whyChooseUsFeatures[0] && (
              <AnimatedElement className="md:col-span-2 row-span-1" delay={0}>
                <div className="h-full bg-secondary rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colours duration-700" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 text-accent">
                      {getFeatureIcon(whyChooseUsFeatures[0].title)}
                    </div>
                    <div>
                      <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                        {whyChooseUsFeatures[0].title}
                      </h3>
                      <p className="font-paragraph text-lg text-gray-300 max-w-xl">
                        {whyChooseUsFeatures[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            )}

            {/* Feature 2 - Tall */}
            {whyChooseUsFeatures[1] && (
              <AnimatedElement className="md:col-span-1 row-span-2" delay={200}>
                <div className="h-full bg-light-gray rounded-[2.5rem] p-10 relative overflow-hidden group hover:bg-gray-100 transition-colours duration-300">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent opacity-50" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 text-secondary">
                      {getFeatureIcon(whyChooseUsFeatures[1].title)}
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-4">
                      {whyChooseUsFeatures[1].title}
                    </h3>
                    <p className="font-paragraph text-lg text-gray-600 mb-8">
                      {whyChooseUsFeatures[1].description}
                    </p>
                    <div className="mt-auto w-full aspect-[4/3] rounded-2xl overflow-hidden">
                       <Image 
                         src="https://static.wixstatic.com/media/e994c8_86b8d8ad96e6491dafae2ed9b5ab1964~mv2.png?originWidth=576&originHeight=448" 
                         alt="Expert Support" 
                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                       />
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            )}

            {/* Feature 3 - Standard */}
            {whyChooseUsFeatures[2] && (
              <AnimatedElement className="md:col-span-2 row-span-1" delay={300}>
                <div className="h-full bg-white border border-gray-100 shadow-xl rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 group">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 text-accent">
                      {getFeatureIcon(whyChooseUsFeatures[2].title)}
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-secondary mb-4">
                      {whyChooseUsFeatures[2].title}
                    </h3>
                    <p className="font-paragraph text-lg text-gray-600">
                      {whyChooseUsFeatures[2].description}
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-6">
                     <div className="w-full h-full relative">
                        <div className="absolute inset-0 bg-white rounded-xl shadow-md flex items-center justify-center transform group-hover:-rotate-6 transition-transform duration-300">
                           <Smartphone className="w-12 h-12 text-gray-300" />
                        </div>
                        <div className="absolute inset-0 bg-accent/5 rounded-xl shadow-sm flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-300 backdrop-blur-sm border border-accent/20">
                           <CheckCircle className="w-12 h-12 text-accent" />
                        </div>
                     </div>
                  </div>
                </div>
              </AnimatedElement>
            )}
          </div>
        </div>
      </section>
      {/* --- LENDERS CAROUSEL --- */}
      <section className="py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <LendersCarousel />
        </div>
      </section>
      {/* --- REVIEWS (Horizontal Scroll) --- */}
      <section className="py-24 md:py-32 border-t border-gray-100 bg-primary">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimatedElement direction="up">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-secondary-foreground">
                Technology We Use
              </h2>
              <p className="font-paragraph text-base md:text-lg text-background">
                We use industry-standard software and AI tools to operate efficiently, securely, and at scale.
              </p>
            </AnimatedElement>
          </div>

          {/* Logo Grid */}
          <AnimatedElement direction="up" delay={100}>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 mb-12 py-12">
              {/* Google */}
              <div className="flex items-center justify-center h-16 md:h-20 px-4 md:px-6">
                <Image
                  src="https://static.wixstatic.com/media/e994c8_a9094c3f263c443db0adcf3fd09aaa22~mv2.png"
                  className="h-full w-auto object-contain opacity-60 hover:opacity-80 transition-opacity duration-300"
                  originWidth={1024}
                  originHeight={1024} />
              </div>

              {/* Anthropic */}
              <div className="flex items-center justify-center h-16 md:h-20 px-4 md:px-6">
                <Image
                  src="https://static.wixstatic.com/media/e994c8_69fdd7a4e7c34d1b9c6062faac035597~mv2.png"
                  className="h-full w-auto object-contain opacity-60 hover:opacity-80 transition-opacity duration-300"
                  originWidth={1024}
                  originHeight={1024} />
              </div>

              {/* Claude */}
              <div className="flex items-center justify-center h-16 md:h-20 px-4 md:px-6">
                <Image
                  src="https://static.wixstatic.com/media/e994c8_1a4c65369c484342a3b3777f31e00493~mv2.png"
                  className="h-full w-auto object-contain opacity-60 hover:opacity-80 transition-opacity duration-300"
                  originWidth={1024}
                  originHeight={1024} />
              </div>

              {/* Notebook LLM */}
              <div className="flex items-center justify-center h-16 md:h-20 px-4 md:px-6">
                <Image
                  src="https://static.wixstatic.com/media/e994c8_972f5009fec3452ca6a4eb479be1b43e~mv2.png"
                  className="h-full w-auto object-contain opacity-60 hover:opacity-80 transition-opacity duration-300"
                  originWidth={1024}
                  originHeight={1024} />
              </div>

              {/* New Technology Logo */}
              <div className="flex items-center justify-center h-16 md:h-20 px-4 md:px-6">
                <Image
                  src="https://static.wixstatic.com/media/e994c8_a62f347360aa431f87ca513b9824ff73~mv2.png"
                  className="h-full w-auto object-contain opacity-60 hover:opacity-80 transition-opacity duration-300"
                  originWidth={1024}
                  originHeight={1024} />
              </div>
            </div>
          </AnimatedElement>

          {/* Disclaimer */}
          <AnimatedElement direction="up" delay={200}>
            <div className="text-center pt-8 border-t border-gray-100">
              <p className="font-paragraph text-xs md:text-sm text-gray-500">
                Logos and trademarks are the property of their respective owners. Use of these tools does not imply endorsement or partnership.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>
      <section className="py-32 bg-secondary overflow-hidden">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <AnimatedElement direction="right">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">
              What Our <br/> <span className="text-accent">Customers Say</span>
            </h2>
          </AnimatedElement>
          <AnimatedElement direction="left">
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white hover:text-secondary">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white hover:text-secondary">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </AnimatedElement>
        </div>

        <div className="relative w-full">
          <div className="flex gap-8 px-6 md:px-12 overflow-x-auto pb-12 snap-x scrollbar-hide">
            {reviews.map((review, index) => (
              <div key={review._id} className="min-w-[350px] md:min-w-[450px] snap-center">
                <AnimatedElement delay={index * 100} direction="left">
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-10 h-full hover:bg-white/10 transition-colours duration-300">
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.starRating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="font-paragraph text-lg text-gray-300 italic mb-8 leading-relaxed min-h-[100px]">
                      "{review.reviewText}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                        {review.customerName?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-heading font-bold text-white text-lg">{review.customerName}</div>
                        <div className="text-sm text-gray-400">{review.customerLocation}</div>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- TECHNOLOGY WE USE SECTION --- */}
      {/* --- CALENDAR BOOKING SECTION --- */}
      <section className="relative py-20 md:py-32 bg-light-gray overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
        
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Content */}
            <AnimatedElement direction="left">
              <div className="flex flex-col gap-6 md:gap-8">
                <div>
                  <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Schedule Your Consultation</span>
                  <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                    Book a Free <br/>
                    <span className="text-accent">Loan Consultation</span>
                  </h2>
                </div>
                
                <p className="font-paragraph text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                  Connect with one of our loan specialists to discuss your financial goals and find the perfect loan solution tailored to your needs.
                </p>
                
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-secondary mb-1">30-Minute Session</h3>
                      <p className="font-paragraph text-gray-600 text-sm md:text-base">Personalised consultation with our experts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-secondary mb-1">100% Free</h3>
                      <p className="font-paragraph text-gray-600 text-sm md:text-base">No hidden fees or obligations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-secondary mb-1">Expert Guidance</h3>
                      <p className="font-paragraph text-gray-600 text-sm md:text-base">Get matched with the right loan option</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
            
            {/* Right Calendar Embed */}
            <AnimatedElement direction="right" delay={200}>
              <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50 bg-white h-[500px] md:h-[600px] lg:h-[650px]">
                {/* Calendly Embed */}
                <iframe
                  src="https://calendly.com/hello-nik/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                  className="w-full h-full border-0"
                  title="Book a consultation"
                  loading="lazy"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      <Footer />
      {/* Analytics Dashboard - Remove or hide in production */}
      <AnalyticsDashboard />
    </div>
  );
}