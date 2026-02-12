import { useRouteError } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="max-w-2xl text-center">
          <h1 className="font-heading text-7xl font-bold text-primary mb-4">Error</h1>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Something went wrong</h2>
          <p className="font-paragraph text-lg text-foreground mb-8">
            {error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.'}
          </p>
          
          <div className="space-y-4 mb-12">
            <p className="font-paragraph text-base text-foreground">
              Here are some helpful links to get you back on track:
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="inline-block px-6 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Home
              </a>
              <a 
                href="/car-loans" 
                className="inline-block px-6 py-3 bg-secondary text-secondary-foreground font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Car Loans
              </a>
              <a 
                href="/home-loans" 
                className="inline-block px-6 py-3 bg-secondary text-secondary-foreground font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Home Loans
              </a>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 bg-accent text-white font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Contact Us
              </a>
            </nav>
          </div>

          <div className="bg-light-gray p-6 rounded-lg">
            <p className="font-paragraph text-sm text-foreground">
              If you believe this is an error, please <a href="/contact" className="text-primary font-semibold hover:underline">contact our support team</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
