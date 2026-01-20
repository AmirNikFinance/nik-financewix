import { User } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface AuthorProfileProps {
  name: string;
  bio?: string;
  avatar?: string;
}

export default function AuthorProfile({ name, bio, avatar }: AuthorProfileProps) {
  const defaultBio = 'Financial expert specializing in home loans, refinancing, and investment property finance. Helping Australians achieve their property and financial goals.';

  return (
    <div className="bg-light-gray rounded-2xl p-6 flex gap-4">
      <div className="flex-shrink-0">
        {avatar ? (
          <Image src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <User className="w-8 h-8 text-accent" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-heading text-lg font-bold text-foreground mb-2">
          About {name}
        </h4>
        <p className="font-paragraph text-sm text-gray-600 leading-relaxed">
          {bio || defaultBio}
        </p>
      </div>
    </div>
  );
}
