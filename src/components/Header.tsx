import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-[120rem] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="font-heading text-2xl font-bold text-primary">
              NIK FINANCE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <a 
              href="/#loans" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Loans
            </a>
            <a 
              href="/#how-it-works" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              How It Works
            </a>
            <a 
              href="/#reviews" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Reviews
            </a>
            <a 
              href="/#why-choose-us" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Why Choose Us
            </a>
            <Link 
              to="/contact" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            to="/apply"
            className="hidden md:block bg-accent text-white font-paragraph font-semibold px-6 py-3 rounded-full hover:bg-primary transition-all duration-300 hover:scale-105"
          >
            Get Instant Quote
          </Link>

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
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <a 
              href="/#loans" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Loans
            </a>
            <a 
              href="/#how-it-works" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              How It Works
            </a>
            <a 
              href="/#reviews" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Reviews
            </a>
            <a 
              href="/#why-choose-us" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Why Choose Us
            </a>
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              to="/apply"
              onClick={() => setIsMenuOpen(false)}
              className="bg-accent text-white font-paragraph font-semibold px-6 py-3 rounded-full hover:bg-primary transition-all duration-300 text-center"
            >
              Get Instant Quote
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
