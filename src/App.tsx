import React, { useState } from 'react';
import { ContentProvider } from './context/ContentContext';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Monitor, Smartphone } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'preview' | 'admin'>('admin');
  
  // 프로덕션 빌드(Netlify 등)에서는 랜딩 페이지만 보여줍니다.
  if (import.meta.env.PROD) {
    return (
      <ContentProvider>
        <LandingPage />
      </ContentProvider>
    );
  }

  return (
    <ContentProvider>
      <div className="min-h-screen bg-gray-50">
        {/* View Toggle (Fixed at bottom right) */}
        <div className="fixed bottom-6 right-6 z-50 flex bg-white rounded-full shadow-2xl p-1 border border-gray-200">
          <button
            onClick={() => setViewMode('admin')}
            className={`p-3 rounded-full transition-all ${
              viewMode === 'admin' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Admin Dashboard"
          >
            <Monitor size={20} />
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`p-3 rounded-full transition-all ${
              viewMode === 'preview' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Mobile Preview"
          >
            <Smartphone size={20} />
          </button>
        </div>

        {viewMode === 'admin' ? (
          <div className="flex h-screen overflow-hidden">
            {/* Admin Panel takes full width, but we show a live preview on the side for large screens */}
            <div className="flex-1 h-full overflow-hidden">
              <AdminDashboard />
            </div>
            
            {/* Live Preview Side Panel (Hidden on small screens) */}
            <div className="hidden xl:flex w-[500px] bg-gray-200 border-l border-gray-300 items-center justify-center p-8">
              <div className="relative border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[800px] w-[400px] shadow-2xl">
                 <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                 <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                 <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                 <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                 <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                    <div className="h-full w-full overflow-y-auto no-scrollbar">
                        <LandingPage />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center min-h-screen bg-gray-100 py-8">
             {/* Mobile View Mode */}
             <LandingPage />
          </div>
        )}
      </div>
    </ContentProvider>
  );
}
