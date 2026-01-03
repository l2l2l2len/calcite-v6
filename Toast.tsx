
import React from 'react';

interface ToastProps {
  msg: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ msg, show }) => {
  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-navy text-white px-7 py-3.5 rounded-xl flex items-center gap-2.5 shadow-2xl border border-white/10 transition-all duration-300 pointer-events-none z-[100] ${show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
      <svg className="w-5 h-5 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-sm font-semibold">{msg}</span>
    </div>
  );
};

export default Toast;
