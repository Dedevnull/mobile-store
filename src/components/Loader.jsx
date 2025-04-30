import React from 'react';

export const Loader = () => {
  return (
    <div role="status" className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};