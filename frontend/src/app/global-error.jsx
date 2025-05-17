'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
            <h1 className="mb-4 text-9xl font-bold text-indigo-600">500</h1>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Critical Error</h2>
            <p className="mb-6 text-gray-600">
              {error?.message || 'Application encountered an error'}
            </p>
            <button
              onClick={() => reset()}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}