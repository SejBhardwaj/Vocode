import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import apiService from '../services/api';
import PreviewPage from './PreviewPage';
import CodeViewPage from './CodeViewPage';
import Navbar from './Navbar';

export default function EditorPage({ initialIdea, selectedPlan, onBack, onNavigate, currentPage }) {
  const [stage, setStage] = useState('ready'); // ready | generating | preview
  const [viewMode, setViewMode] = useState('preview'); // preview | code
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  useEffect(() => {
    if (stage === 'ready') generateWebsite();
  }, []);

  const generateWebsite = async () => {
    try {
      setError(null);
      setStage('generating');

      const refinedIdea = {
        rawIdea: initialIdea || 'a modern website',
        refinedDescription: initialIdea || 'a modern website',
        purpose: initialIdea || 'a modern website',
        colorScheme: selectedPlan?.style === 'minimal'
          ? 'clean whites and soft greys'
          : selectedPlan?.style === 'modern'
          ? 'vibrant purples and pinks with dark background'
          : 'deep blues and professional navy tones',
      };

      const planForApi = {
        id: selectedPlan?.id || 'modern',
        name: selectedPlan?.name || 'Modern & Bold',
        style: selectedPlan?.style || 'modern',
        description: selectedPlan?.description || '',
        sections: selectedPlan?.features?.length > 0
          ? selectedPlan.features
          : ['Hero', 'Features', 'About', 'Contact', 'Footer'],
      };

      const data = await apiService.generateCode(planForApi, refinedIdea);
      setGeneratedCode(data.code);
      setStage('preview');
    } catch (err) {
      setError(`Failed to generate website: ${err.message}. Please try again.`);
      setStage('ready');
    }
  };

  const handleEdit = async (editRequestText) => {
    try {
      const editData = await apiService.editCode(generatedCode, editRequestText);
      setGeneratedCode(editData.code);
    } catch (err) {
      console.error('Edit failed:', err);
      throw err; // let the sidebar handle the error state
    }
  };

  const handleDownload = () => setShowDownloadDialog(true);

  const handleConfirmDownload = async () => {
    try {
      const blob = await apiService.downloadProject(generatedCode);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vocode-website.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setShowDownloadDialog(false);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  // Show preview/code once generating or done
  if (stage === 'generating' || stage === 'preview') {
    if (viewMode === 'code') {
      return (
        <>
          <CodeViewPage
            generatedCode={generatedCode}
            onEdit={handleEdit}
            onDownload={handleDownload}
            onBack={onBack}
            onPreview={() => setViewMode('preview')}
          />
          {showDownloadDialog && (
            <DownloadDialog onConfirm={handleConfirmDownload} onCancel={() => setShowDownloadDialog(false)} />
          )}
        </>
      );
    }
    return (
      <>
        <PreviewPage
          generatedCode={generatedCode}
          isGenerating={stage === 'generating'}
          refinedIdea={{ description: initialIdea }}
          onEdit={handleEdit}
          onDownload={handleDownload}
          onBack={onBack}
          onCodeView={() => setViewMode('code')}
        />
        {showDownloadDialog && (
          <DownloadDialog onConfirm={handleConfirmDownload} onCancel={() => setShowDownloadDialog(false)} />
        )}
      </>
    );
  }

  // Error / ready fallback screen
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onNavigate={onNavigate} currentPage={currentPage} />
      <div className="pt-20 px-8 max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {error ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 max-w-lg text-center">
              {error}
            </div>
            <button onClick={generateWebsite}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition-colors">
              Try Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
            <p className="text-white/60">Preparing...</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DownloadDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-lg shadow-2xl w-[400px] overflow-hidden">
        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-white/10">
          <h3 className="text-white text-sm font-medium">Download Project</h3>
          <button onClick={onCancel} className="text-white/60 hover:text-white">✕</button>
        </div>
        <div className="p-6 text-center">
          <p className="text-white/70 text-sm mb-6">Download your generated website as a ZIP file?</p>
          <div className="flex gap-3 justify-center">
            <button onClick={onCancel}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded text-white text-sm transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition-colors">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
