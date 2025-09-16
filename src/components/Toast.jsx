import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = useCallback((message, duration = 2000) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
