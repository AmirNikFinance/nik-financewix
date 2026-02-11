import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="max-w-2xl text-center">
          <h1 className="font-heading text-7xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="font-paragraph text-lg text-foreground mb-8">
            Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
          </p>
          
          <div className="space-y-4 mb-12">
            <p className="font-paragraph text-base text-foreground">
              Here are some helpful links to get you back on track:
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-block px-6 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Home
              </Link>
              <Link 
                to="/car-loans" 
                className="inline-block px-6 py-3 bg-secondary text-secondary-foreground font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Car Loans
              </Link>
              <Link 
                to="/home-loans" 
                className="inline-block px-6 py-3 bg-secondary text-secondary-foreground font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Home Loans
              </Link>
              <Link 
                to="/contact" 
                className="inline-block px-6 py-3 bg-accent text-white font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="bg-light-gray p-6 rounded-lg">
            <p className="font-paragraph text-sm text-foreground">
              If you believe this is an error, please <Link to="/contact" className="text-primary font-semibold hover:underline">contact our support team</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
