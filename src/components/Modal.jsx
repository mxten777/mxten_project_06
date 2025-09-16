import React from "react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="card w-full max-w-md mx-2 animate-fadeIn relative">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="btn-secondary text-2xl leading-none px-2 py-0 h-8 w-8 flex items-center justify-center">&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
