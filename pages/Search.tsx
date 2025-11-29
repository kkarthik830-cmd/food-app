import React, { useState } from 'react';
import { Header, BottomNav } from '../components/Layout';
import { RESTAURANTS, CUISINES } from '../data';
import { getSmartFoodRecommendations } from '../services/geminiService';
import { Sparkles, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { RestaurantCard } from '../components/Shared';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(RESTAURANTS);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!val) {
        setResults(RESTAURANTS);
        setAiSuggestions([]);
        return;
    }

    const filtered = RESTAURANTS.filter(r => 
        r.name.toLowerCase().includes(val.toLowerCase()) ||
        r.cuisine.some(c => c.toLowerCase().includes(val.toLowerCase()))
    );
    setResults(filtered);
  };

  const askAi = async () => {
    if (!query) return;
    setLoadingAi(true);
    const cuisinesList = CUISINES.map(c => c.name);
    const suggestions = await getSmartFoodRecommendations(query, cuisinesList);
    setAiSuggestions(suggestions);
    
    // Filter restaurants based on AI suggestions
    if (suggestions.length > 0) {
        const aiFiltered = RESTAURANTS.filter(r => 
            r.cuisine.some(c => suggestions.some(s => c.toLowerCase().includes(s.toLowerCase())))
        );
        setResults(aiFiltered);
    }
    setLoadingAi(false);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 bg-white z-40 px-4 py-4 shadow-sm">
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
             <SearchIcon size={20} className="text-gray-400" />
             <input 
                type="text" 
                value={query}
                onChange={handleSearch}
                placeholder="Search for restaurants and food" 
                className="bg-transparent flex-1 text-sm font-medium focus:outline-none"
             />
        </div>
        
        {/* AI Trigger */}
        {query.length > 2 && (
            <button 
                onClick={askAi}
                className="w-full mt-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md animate-pulse"
            >
                <Sparkles size={16} /> 
                {loadingAi ? 'Asking AI Chef...' : 'Ask AI what to eat?'}
            </button>
        )}
      </div>

      <div className="px-4 py-4">
        {aiSuggestions.length > 0 && (
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">AI Suggests Cravings</h3>
                <div className="flex gap-2 flex-wrap">
                    {aiSuggestions.map(s => (
                        <span key={s} className="px-3 py-1 bg-violet-50 text-violet-600 border border-violet-100 rounded-full text-xs font-bold">{s}</span>
                    ))}
                </div>
            </div>
        )}

        <h3 className="text-lg font-bold text-gray-800 mb-4">{results.length} Restaurants found</h3>
        <div className="space-y-4">
            {results.map(r => (
                <RestaurantCard key={r.id} restaurant={r} />
            ))}
        </div>
        
        {results.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
                No restaurants found matching your taste.
            </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};
