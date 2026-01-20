import { Clock } from 'lucide-react';

interface ReadingTimeProps {
  content: string;
  className?: string;
}

export default function ReadingTime({ content, className = '' }: ReadingTimeProps) {
  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const readingTime = calculateReadingTime(content);

  return (
    <div className={`flex items-center gap-2 text-gray-500 ${className}`}>
      <Clock className="w-4 h-4" />
      <span className="font-paragraph text-sm">{readingTime} min read</span>
    </div>
  );
}
