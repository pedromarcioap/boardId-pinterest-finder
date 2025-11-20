import React from 'react';
import { Search } from 'lucide-react';

export const Instructions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-red-600" />
        How to find your Board ID
      </h3>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Open the Pinterest Board</h4>
            <p className="text-sm text-gray-600 mt-1">
              Navigate to the board you want to analyze in a new browser tab. 
              Ensure you are on the board page (e.g., <code>pinterest.com/username/board-name/</code>).
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h4 className="font-medium text-gray-900">View Page Source</h4>
            <p className="text-sm text-gray-600 mt-1">
              Right-click anywhere on the page (not on an image) and select <span className="font-semibold">View Page Source</span>.
              <br />
              <span className="text-xs text-gray-500">Shortcut: Ctrl + U (Windows) or Cmd + Option + U (Mac).</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Copy Everything</h4>
            <p className="text-sm text-gray-600 mt-1">
              Select all the text on the source page and copy it.
              <br />
              <span className="text-xs text-gray-500">Shortcut: Ctrl + A then Ctrl + C.</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Paste & Analyze</h4>
            <p className="text-sm text-gray-600 mt-1">
              Paste the code into the text area on the left and click <strong>"Analyze Source"</strong>.
              Gemini AI will search through the code to find the hidden Board ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};