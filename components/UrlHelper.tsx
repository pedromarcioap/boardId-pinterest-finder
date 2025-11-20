import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export const UrlHelper: React.FC = () => {
  const [url, setUrl] = useState('');
  
  const getOpenUrl = () => {
    if (!url) return null;
    let cleanUrl = url.trim();
    
    // Simple heuristic to fix common input formats
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = `https://pinterest.com/${cleanUrl.replace(/^\/+/, '')}`;
    }
    return cleanUrl;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6 mb-6">
      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
        Step 1: Go to your board
      </h4>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. pinterest.com/username/boardname"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <a
          href={getOpenUrl() || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            url 
              ? 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={(e) => !url && e.preventDefault()}
        >
          Open Board <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Enter your board URL or "username/board" to open it easily. Then copy the page source.
      </p>
    </div>
  );
};