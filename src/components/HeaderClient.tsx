import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { trackButtonClick } from '@/lib/analytics';

export default function HeaderClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-[120rem] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="font-heading text-2xl font-bold text-primary">
              NIK FINANCE
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="/" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              Home
            </a>
            <div className="relative group">
              <button className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300">
                Services
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <a href="/car-loans" className="block px-4 py-2 text-sm text-foreground hover:bg-light-gray">Car Loans</a>
                <a href="/home-loans" className="block px-4 py-2 text-sm text-foreground hover:bg-light-gray">Home Loans</a>
                <a href="/personal-loans" className="block px-4 py-2 text-sm text-foreground hover:bg-light-gray">Personal Loans</a>
                <a href="/business-loans" className="block px-4 py-2 text-sm text-foreground hover:bg-light-gray">Business Loans</a>
                <a href="/bad-credit-loans" className="block px-4 py-2 text-sm text-foreground hover:bg-light-gray">Bad Credit Loans</a>
                <a href="/refinancing" className="block px-4 py-2 text-sm text-foreground hover:bg-light-gray">Refinancing</a>
              </div>
            </div>
            <a 
              href="/blog" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              Blog
            </a>
            <a 
              href="/calculators" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              Calculators
            </a>
            <a 
              href="/about" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              About
            </a>
            <a 
              href="/faq" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              FAQ
            </a>
            <a 
              href="/contact" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              Contact
            </a>

          </nav>

          {/* CTA Button */}
          <a
            href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
            onClick={() => trackButtonClick('header-start-application', 'Start Application')}
            className="hidden md:block bg-accent text-white font-paragraph font-semibold px-6 py-3 rounded-full hover:bg-primary transition-all duration-300 hover:scale-105"
          >Start Application</a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              Home
            </a>
            <div className="space-y-2">
              <p className="font-paragraph text-base font-semibold text-foreground">Services</p>
              <a href="/car-loans" onClick={() => setIsMenuOpen(false)} className="block pl-4 font-paragraph text-sm text-foreground hover:text-primary">Car Loans</a>
              <a href="/home-loans" onClick={() => setIsMenuOpen(false)} className="block pl-4 font-paragraph text-sm text-foreground hover:text-primary">Home Loans</a>
              <a href="/personal-loans" onClick={() => setIsMenuOpen(false)} className="block pl-4 font-paragraph text-sm text-foreground hover:text-primary">Personal Loans</a>
              <a href="/business-loans" onClick={() => setIsMenuOpen(false)} className="block pl-4 font-paragraph text-sm text-foreground hover:text-primary">Business Loans</a>
              <a href="/bad-credit-loans" onClick={() => setIsMenuOpen(false)} className="block pl-4 font-paragraph text-sm text-foreground hover:text-primary">Bad Credit Loans</a>
              <a href="/refinancing" onClick={() => setIsMenuOpen(false)} className="block pl-4 font-paragraph text-sm text-foreground hover:text-primary">Refinancing</a>
            </div>
            <a 
              href="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              Blog
            </a>
            <a 
              href="/calculators" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              Calculators
            </a>
            <a 
              href="/about" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              About
            </a>
            <a 
              href="/faq" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colours duration-300"
            >
              FAQ
            </a>
            <a
              href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
              onClick={() => {
                trackButtonClick('header-start-application-mobile', 'Start Application');
                setIsMenuOpen(false);
              }}
              className="bg-accent text-white font-paragraph font-semibold px-6 py-3 rounded-full hover:bg-primary transition-all duration-300 text-center"
            >
              Start Application
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
