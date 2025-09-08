import React from "react";

export const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
        {children}
        <div className="absolute top-3 right-3">
          <button
            className="text-gray-500 hover:text-red-600 text-xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold mb-4">{children}</h2>
);

export const DialogContent = ({ children }) => (
  <div className="space-y-4">{children}</div>
);

export const DialogFooter = ({ children }) => (
  <div className="mt-6 flex justify-end gap-2">{children}</div>
);
