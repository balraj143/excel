import React from "react";

// Wrapper for the whole card
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-2xl shadow-md border bg-white ${className}`}>
      {children}
    </div>
  );
};

// Optional header (if you want to use)
export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`p-4 border-b font-semibold text-lg ${className}`}>
      {children}
    </div>
  );
};

// Main card content
export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

// Optional footer (actions, buttons, etc.)
export const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`p-4 border-t flex justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
};
