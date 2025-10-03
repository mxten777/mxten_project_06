import React from "react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="card w-full max-w-md mx-2 animate-fade-in relative shadow-2xl border border-white/20 bg-gradient-to-br from-white to-blue-50">
        <div className="flex justify-between items-center border-b px-4 py-2 bg-gradient-to-r from-blue-100 to-white rounded-t-xl">
          <h3 className="font-bold text-lg text-blue-700">{title}</h3>
          <button onClick={onClose} className="btn-secondary text-2xl leading-none px-2 py-0 h-8 w-8 flex items-center justify-center rounded-full hover:bg-blue-100">&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
