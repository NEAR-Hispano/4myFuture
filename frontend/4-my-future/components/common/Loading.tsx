import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 mt-20 border-b-2 border-primary-700" />
    </div>
  );
}
