import React from 'react';

interface Props {
  method: string;
  endpoint: string;
}

export const ApiEndpointBadge: React.FC<Props> = ({ method, endpoint }) => {
  const getMethodColor = (m: string) => {
    const upper = m.toUpperCase();
    if (upper === 'GET') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (upper === 'POST') return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    if (upper === 'PUT' || upper === 'PATCH') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (upper === 'DELETE') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
  };

  return (
    <div className="inline-flex items-center gap-2 bg-[#0b132b] border border-slate-700/80 rounded-full px-3 py-1.5 shadow-sm font-mono text-[10px] font-medium">
      <span className={`px-2 py-0.5 rounded-full border ${getMethodColor(method)}`}>
        {method.toUpperCase()}
      </span>
      <span className="text-slate-400">{endpoint}</span>
    </div>
  );
};

// Thêm export default để hỗ trợ cả 2 cách import
export default ApiEndpointBadge;