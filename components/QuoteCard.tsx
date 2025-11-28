import React, { useState } from 'react';
import { Quote } from '../types';
import { Share2, Heart, Copy, Check } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
  onShare: (quote: Quote) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onShare }) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6 relative overflow-hidden transition-all duration-300 hover:shadow-md mx-4">
      {/* Decorative Quote Mark */}
      <div className="absolute top-4 left-6 text-gray-100 text-8xl font-serif leading-none select-none -z-0">
        &ldquo;
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
        <div className="mb-6 mt-4">
          <p className="font-serif text-2xl md:text-3xl text-gray-800 leading-tight">
            {quote.text}
          </p>
        </div>
        
        <div className="flex items-end justify-between border-t border-gray-100 pt-4 mt-auto">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {quote.author}
            </p>
            <span className="text-xs text-indigo-400 font-medium bg-indigo-50 px-2 py-0.5 rounded-full mt-2 inline-block">
              {quote.category}
            </span>
          </div>

          <div className="flex gap-3">
             <button 
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
              aria-label="Copy to clipboard"
            >
              {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
            <button 
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-full hover:bg-pink-50 transition-colors ${liked ? 'text-pink-500' : 'text-gray-400'}`}
              aria-label="Like quote"
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={() => onShare(quote)}
              className="p-2 rounded-full hover:bg-indigo-50 text-gray-400 hover:text-indigo-500 transition-colors"
              aria-label="Share quote"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
