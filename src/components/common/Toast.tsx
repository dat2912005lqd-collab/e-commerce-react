import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="flex items-center gap-3 bg-[#0b132b] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 backdrop-blur-md">
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <p className="text-sm font-medium text-slate-100">{toastMessage}</p>
      </div>
    </div>
  );
};
export default Toast;
