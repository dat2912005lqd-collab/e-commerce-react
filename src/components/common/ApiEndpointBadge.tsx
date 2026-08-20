import React from 'react';

interface ApiEndpointBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
  endpoint: string;
  className?: string;
}

export const ApiEndpointBadge: React.FC<ApiEndpointBadgeProps> = ({ method, endpoint, className = '' }) => {
  const getMethodStyle = (m: string) => {
    switch (m.toUpperCase()) {
      case 'GET':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'POST':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'PUT':
      case 'PATCH':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'DELETE':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 font-mono text-xs px-2.5 py-1 rounded-md border bg-slate-900/90 ${className}`}>
      <span className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] border ${getMethodStyle(method)}`}>
        {method}
      </span>
      <span className="text-slate-300 select-all">{endpoint}</span>
    </div>
  );
};
export default ApiEndpointBadge;