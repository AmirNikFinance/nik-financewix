import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  if (subscribed) {
    return (
      <div className="bg-accent/10 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          Thank You!
        </h3>
        <p className="font-paragraph text-gray-600">
          You've successfully subscribed to our newsletter. Check your inbox for confirmation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-secondary to-primary rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="font-heading text-2xl font-bold">Stay Updated</h3>
      </div>
      <p className="font-paragraph text-white/90 mb-6">
        Get the latest financial tips, loan insights, and exclusive offers delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-white text-foreground border-0 h-12 rounded-xl"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-accent hover:bg-accent/90 text-white h-12 px-8 rounded-xl font-semibold"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      <p className="font-paragraph text-xs text-white/70 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
