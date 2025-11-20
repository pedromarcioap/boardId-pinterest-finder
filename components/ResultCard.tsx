import React from 'react';
import { Copy, CheckCircle, AlertCircle, Hash, User, Folder } from 'lucide-react';
import { ExtractionResult } from '../types';

interface ResultCardProps {
  result: ExtractionResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (result.boardId) {
      navigator.clipboard.writeText(result.boardId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (result.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 animate-fade-in">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-red-900">Extraction Failed</h3>
            <p className="text-red-700 mt-1">{result.error}</p>
            <p className="text-sm text-red-600 mt-4">
              Please ensure you copied the full source code from a valid Pinterest Board page.
            </p>
            <button 
              onClick={onReset}
              className="mt-4 px-4 py-2 bg-white border border-red-300 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!result.boardId) {
    return (
       <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 animate-fade-in">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900">ID Not Found</h3>
            <p className="text-yellow-800 mt-1">Gemini analyzed the code but couldn't definitively locate the Board ID.</p>
             <button 
              onClick={onReset}
              className="mt-4 px-4 py-2 bg-white border border-yellow-300 text-yellow-700 font-medium rounded-lg hover:bg-yellow-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
        <h3 className="text-white font-bold text-xl flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Success! Board ID Found
        </h3>
      </div>
      
      <div className="p-8 space-y-8">
        
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Board ID</span>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-mono font-bold text-gray-900 tracking-tight">
              {result.boardId}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors relative group"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6 text-gray-500" />}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {copied ? 'Copied!' : 'Copy ID'}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.boardName && (
            <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <Folder className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Board Name</p>
                <p className="font-semibold text-gray-900">{result.boardName}</p>
              </div>
            </div>
          )}
          
          {result.ownerName && (
            <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Owner</p>
                <p className="font-semibold text-gray-900">{result.ownerName}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onReset}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium underline decoration-gray-300 hover:decoration-gray-500 underline-offset-4 transition-all"
          >
            Analyze another board
          </button>
        </div>

      </div>
    </div>
  );
};
