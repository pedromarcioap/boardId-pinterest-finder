import React, { useState } from 'react';
import { Code, Cpu, Search } from 'lucide-react';
import { Instructions } from './components/Instructions';
import { ResultCard } from './components/ResultCard';
import { UrlHelper } from './components/UrlHelper';
import { analyzeSourceCode } from './services/geminiService';
import { ExtractionResult, AnalysisStatus } from './types';

const App: React.FC = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<ExtractionResult | null>(null);

  const handleAnalyze = async () => {
    if (!sourceCode.trim()) return;

    setStatus(AnalysisStatus.ANALYZING);
    try {
      const extraction = await analyzeSourceCode(sourceCode);
      setResult(extraction);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (error) {
      setResult({
        boardId: null,
        boardName: null,
        ownerName: null,
        error: "An unexpected error occurred."
      });
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const handleReset = () => {
    setSourceCode('');
    setResult(null);
    setStatus(AnalysisStatus.IDLE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              BoardID Pinterest <span className="text-red-600">Finder</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="hidden sm:inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100 text-xs">
              Powered by Gemini 2.5 Flash
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Find any Pinterest Board ID
          </h2>
          <p className="text-lg text-gray-600">
            Pinterest hides Board IDs in the code. We use AI to find them instantly.
            <br className="hidden sm:block"/> No login required. Safe & Secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Area */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* URL Helper */}
            <UrlHelper />

            {/* Main Input Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px] transition-shadow hover:shadow-md">
              <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Code className="w-5 h-5 text-gray-500" />
                  <span>Step 2: Paste Page Source</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {sourceCode.length > 0 ? `${(sourceCode.length / 1024).toFixed(1)} KB loaded` : 'Waiting for input...'}
                </div>
              </div>
              
              <div className="flex-1 p-4 relative">
                <textarea
                  className="w-full h-full p-4 bg-gray-900 text-green-400 font-mono text-xs rounded-lg border-0 focus:ring-2 focus:ring-red-500 resize-none custom-scrollbar placeholder-gray-600"
                  placeholder={`<!-- Paste the full source code here -->\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>`}
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  spellCheck={false}
                />
                
                {sourceCode.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-gray-500 text-center opacity-40">
                      <Code className="w-16 h-16 mx-auto mb-2" />
                      <p>Paste source code (Ctrl+V)</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
                <button
                  onClick={handleAnalyze}
                  disabled={!sourceCode || status === AnalysisStatus.ANALYZING}
                  className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    !sourceCode || status === AnalysisStatus.ANALYZING
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5'
                  }`}
                >
                  {status === AnalysisStatus.ANALYZING ? (
                    <>
                      <Cpu className="w-6 h-6 animate-spin" />
                      Analyzing Structure...
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6" />
                      Extract Board ID
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Result & Instructions */}
          <div className="lg:col-span-5 space-y-6">
            {status === AnalysisStatus.SUCCESS && result ? (
              <ResultCard result={result} onReset={handleReset} />
            ) : (
              <Instructions />
            )}

            {/* Privacy Note */}
            <div className="text-xs text-center text-gray-400 max-w-xs mx-auto">
              <p>
                We do not store your data. The source code is sent to Gemini AI for temporary processing and is discarded immediately.
              </p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default App;