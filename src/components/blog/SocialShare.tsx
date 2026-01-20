import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  excerpt?: string;
  url?: string;
}

export default function SocialShare({ title, excerpt, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareText = excerpt || title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#1877F2] hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#0A66C2] hover:text-white'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
      color: 'hover:bg-gray-600 hover:text-white'
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-heading text-lg font-bold text-foreground">Share this article</h3>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-accent hover:text-white transition-all duration-300"
          aria-label="Copy link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
      {copied && (
        <p className="text-sm text-accent font-paragraph">Link copied to clipboard!</p>
      )}
    </div>
  );
}
