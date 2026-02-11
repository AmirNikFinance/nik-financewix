import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-[120rem] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-2">NIK FINANCE</h3>
            <p className="font-paragraph text-sm opacity-90">{"Your Trusted Partner for Financial Success"}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link to="/about" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                About
              </Link>
              <Link to="/blog" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Blog
              </Link>
              <Link to="/contact" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Contact
              </Link>
              <Link to="/faq" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                FAQ
              </Link>
              <Link to="/partner-portal" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Partner Portal
              </Link>
              <Link to="/privacy-policy" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/car-loans" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Car Loans
              </Link>
              <Link to="/home-loans" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Home Loans
              </Link>
              <Link to="/personal-loans" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Personal Loans
              </Link>
              <Link to="/business-loans" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Business Loans
              </Link>
              <Link to="/bad-credit-loans" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Bad Credit Loans
              </Link>
              <Link to="/refinancing" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Refinancing
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-2 font-paragraph text-sm opacity-90">

              <p>Phone: 1300 NIK FIN</p>
              <p>Australia Wide Service</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-6 text-center">
          <p className="font-paragraph text-sm opacity-90">
            © 2026 NIK Finance Pty Ltd ACN 685 393 917 all rights reserved. Australian Credit Representative number 567387 of Australian Credit Licence 384704.
          </p>
        </div>
      </div>
    </footer>
  );
}
