import React from 'react';

const AdPlaceholder: React.FC = () => {
  return (
    <div className="mx-4 mb-6 relative overflow-hidden bg-gray-50 rounded-lg border border-gray-200 min-h-[120px] flex flex-col items-center justify-center">
        {/* Ad Label */}
        <div className="absolute top-0 right-0 bg-gray-200 px-2 py-0.5 rounded-bl text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Ad
        </div>
        
        {/* Content Placeholder */}
        <div className="flex items-center gap-4 w-full px-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500 font-bold text-xl">
                G
            </div>
            <div className="flex-1">
                <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
            </div>
            <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                OPEN
            </button>
        </div>
        <p className="mt-3 text-[10px] text-gray-400">Google AdMob Integration Placeholder</p>
    </div>
  );
};

export default AdPlaceholder;