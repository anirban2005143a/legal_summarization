'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen min-h-[500px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-9xl font-bold text-indigo-600">500</h1>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Something went wrong!</h2>
        <p className="mb-6 text-gray-600">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="rounded-lg border border-indigo-600 px-4 py-2 text-indigo-600 hover:bg-indigo-50"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}