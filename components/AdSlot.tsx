
import React from 'react';

interface AdSlotProps {
  type: 'banner' | 'sidebar' | 'in-feed';
  adsenseId?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, adsenseId }) => {
  return (
    <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 p-4 my-6 overflow-hidden ${
      type === 'banner' ? 'h-32' : type === 'sidebar' ? 'h-64' : 'h-24'
    }`}>
      <div className="text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">مساحة إعلانية</p>
        <p className="text-xs text-slate-500">{adsenseId || 'إعلان عبو ويب'}</p>
      </div>
    </div>
  );
};

export default AdSlot;
