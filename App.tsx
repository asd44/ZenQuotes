import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Quote, Category } from './types';
import { INITIAL_QUOTES, CATEGORIES } from './constants';
import QuoteCard from './components/QuoteCard';
import AdPlaceholder from './components/AdPlaceholder';
import { generateQuote } from './services/geminiService';
import { Bell, Sparkles, X, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Filter quotes based on selection
  const filteredQuotes = useMemo(() => {
    if (selectedCategory === Category.ALL) return quotes;
    return quotes.filter(q => q.category === selectedCategory);
  }, [quotes, selectedCategory]);

  // Insert "Ads" every 4 items
  const feedItems = useMemo(() => {
    const items: (Quote | { type: 'ad', id: string })[] = [];
    filteredQuotes.forEach((quote, index) => {
      items.push(quote);
      if ((index + 1) % 4 === 0) {
        items.push({ type: 'ad', id: `ad-${index}` });
      }
    });
    return items;
  }, [filteredQuotes]);

  // Check Daily Notification logic
  useEffect(() => {
    const checkDailyNotification = () => {
      if (!("Notification" in window)) return;
      
      if (Notification.permission === "granted") {
        setNotificationsEnabled(true);
        
        const lastDate = localStorage.getItem('zenquotes_last_notification');
        const today = new Date().toDateString();
        
        if (lastDate !== today) {
          // It's a new day, show notification
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          
          try {
            new Notification("Daily Inspiration", {
              body: `"${randomQuote.text}" - ${randomQuote.author}`,
              icon: "https://cdn-icons-png.flaticon.com/512/3233/3233497.png"
            });
            localStorage.setItem('zenquotes_last_notification', today);
          } catch (e) {
            console.error("Notification failed", e);
          }
        }
      }
    };
    
    checkDailyNotification();
  }, [quotes]);

  // Request Notification Permissions
  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsEnabled(true);
      
      // Trigger immediate test if enabled
      new Notification("Daily Inspiration", {
        body: "You will now receive a daily quote notification!",
        icon: "https://cdn-icons-png.flaticon.com/512/3233/3233497.png"
      });
      // Mark today as seen so we don't spam them immediately after the test
      localStorage.setItem('zenquotes_last_notification', new Date().toDateString());
    }
  }, []);

  // Handle Sharing
  const handleShare = async (quote: Quote) => {
    const shareData = {
      title: 'Daily Inspiration',
      text: `"${quote.text}" - ${quote.author}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers not supporting Web Share API
        navigator.clipboard.writeText(shareData.text);
        alert("Quote copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // AI Generation Handler
  const handleAiGenerate = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setSelectedCategory(Category.AI_GENERATED); // Switch to AI tab
    
    // Pick a random category topic to inspire the AI
    const randomTopic = [
      "Perseverance", "Mindfulness", "Creativity", "Leadership", "Kindness", "Focus", "Ambition"
    ][Math.floor(Math.random() * 7)];

    const newQuote = await generateQuote(randomTopic);
    
    setQuotes(prev => [newQuote, ...prev]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-800 tracking-tight">ZenQuotes</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Daily Inspiration</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleAiGenerate}
              disabled={isGenerating}
              className={`p-2.5 rounded-full transition-all duration-300 ${isGenerating ? 'bg-indigo-100 text-indigo-400 rotate-180' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:scale-105 active:scale-95'}`}
              aria-label="Generate AI Quote"
            >
              <Sparkles size={18} className={isGenerating ? "animate-spin" : ""} />
            </button>
            <button 
              onClick={() => setShowMenu(true)}
              className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors active:scale-95"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="px-4 pb-4 overflow-x-auto no-scrollbar flex gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat 
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-200 transform scale-100' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Settings Modal (Simulated Menu) */}
      {showMenu && (
        <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm flex justify-end" onClick={() => setShowMenu(false)}>
          <div className="bg-white w-72 h-full p-6 shadow-2xl animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800">Settings</h2>
              <button onClick={() => setShowMenu(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                    <Bell size={20} />
                  </div>
                  <span className="font-bold text-gray-800">Daily Reminder</span>
                </div>
                <p className="text-xs text-indigo-800/70 mb-5 leading-relaxed">
                  Start your morning with a fresh perspective. We'll send one notification per day.
                </p>
                <button 
                  onClick={requestNotificationPermission}
                  disabled={notificationsEnabled}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 ${
                    notificationsEnabled 
                      ? 'bg-white text-green-600 border border-green-200 cursor-default' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                  }`}
                >
                  {notificationsEnabled ? 'Notifications Active' : 'Enable Notifications'}
                </button>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">About App</p>
                <div className="space-y-2">
                   <div className="flex justify-between text-sm text-gray-600">
                     <span>Version</span>
                     <span className="font-mono">1.0.0</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-600">
                     <span>Build</span>
                     <span className="font-mono">Production</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Feed */}
      <main className="flex-1 py-6">
        {feedItems.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
               <Sparkles size={24} />
            </div>
            <p className="text-gray-500 mb-6 font-medium">No quotes found in this category.</p>
            <button 
              onClick={() => setSelectedCategory(Category.ALL)}
              className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              View all quotes
            </button>
          </div>
        ) : (
          feedItems.map((item) => {
            if ('type' in item && item.type === 'ad') {
              return <AdPlaceholder key={item.id} />;
            }
            return (
              <QuoteCard 
                key={(item as Quote).id} 
                quote={item as Quote} 
                onShare={handleShare} 
              />
            );
          })
        )}

        {/* Bottom spacer for mobile scrolling comfort */}
        <div className="h-24 flex flex-col items-center justify-center text-gray-300 text-xs space-y-2">
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <span className="pt-2 font-medium tracking-widest uppercase text-gray-200">End of feed</span>
        </div>
      </main>

    </div>
  );
};

export default App;