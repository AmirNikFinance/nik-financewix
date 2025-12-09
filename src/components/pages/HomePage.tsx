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
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { LoanOptions, HowItWorksSteps, CustomerReviews, WhyChooseUsFeatures } from '@/entities';

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
                <Link to="/apply">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-10 py-8 text-lg font-semibold shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] transition-all hover:scale-105">
                    Get Instant Quote
                  </Button>
                </Link>

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
                    <badge.icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
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
                     <h3 className="font-heading font-bold text-secondary text-lg">Loan Match</h3>
                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">98% Match</span>
                   </div>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">ANZ</div>
                          <span className="text-sm font-medium text-gray-700">Home Loan</span>
                        </div>
                        <span className="font-bold text-secondary">{"4.89%"}</span>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-accent/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">NIK</div>
                          <span className="text-sm font-medium text-gray-700">{"Asset Finance"}</span>
                        </div>
                        <span className="font-bold text-accent">{"5.75%"}</span>
                     </div>
                   </div>
                   <Button className="w-full mt-6 bg-secondary text-white rounded-xl py-6">View Details</Button>
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
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 rounded-2xl bg-gray-50 text-secondary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        {getLoanIcon(loan.loanName)}
                      </div>
                      <div className="text-right">
                        <span className="block text-3xl font-bold text-accent tracking-tight">{loan.startingRate}</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Starting Rate</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-secondary mb-3 group-hover:text-accent transition-colors">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
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
                      <span className="font-heading text-2xl font-bold text-secondary group-hover:text-accent transition-colors">
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
                  <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors duration-700" />
                  
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
                <div className="h-full bg-light-gray rounded-[2.5rem] p-10 relative overflow-hidden group hover:bg-gray-100 transition-colors duration-300">
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
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-10 h-full hover:bg-white/10 transition-colors duration-300">
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
      {/* --- FINAL CTA --- */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedElement direction="up">
            <div className="w-20 h-20 bg-accent rounded-3xl rotate-12 mx-auto mb-12 flex items-center justify-center shadow-2xl shadow-accent/30">
              <MousePointerClick className="w-10 h-10 text-white -rotate-12" />
            </div>
            
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-secondary mb-8">
              Ready to Get Started?
            </h2>
            <p className="font-paragraph text-xl md:text-2xl text-gray-500 mb-12">
              It only takes 5 minutes to see what you qualify for. <br/> No impact on your credit score.
            </p>
            
            <Link to="/apply">
              <Button className="bg-secondary hover:bg-secondary/90 text-white text-xl px-12 py-8 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Get Your Free Quote Now
              </Button>
            </Link>
            
            <p className="mt-8 text-sm text-gray-400">
              By clicking, you agree to our Terms of Service and Privacy Policy.
            </p>
          </AnimatedElement>
        </div>
      </section>
      <Footer />
    </div>
  );
}