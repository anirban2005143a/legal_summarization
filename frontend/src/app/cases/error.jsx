// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Error({ error, reset }) {
//   const router = useRouter();

//   useEffect(() => {
//     console.error(error);
//   }, [error]);

//   return (
//     <div className="flex h-screen min-h-[500px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
//         <h1 className="mb-4 text-9xl font-bold text-indigo-600">500</h1>
//         <h2 className="mb-2 text-2xl font-bold text-gray-800">Something went wrong!</h2>
//         <p className="mb-6 text-gray-600">
//           {error?.message || 'An unexpected error occurred'}
//         </p>
//         <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
//           <button
//             onClick={() => reset()}
//             className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
//           >
//             Try Again
//           </button>
//           <button
//             onClick={() => router.push('/')}
//             className="rounded-lg border border-indigo-600 px-4 py-2 text-indigo-600 hover:bg-indigo-50"
//           >
//             Return Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { AlertOctagon } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-red-100 to-red-50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="relative bg-gradient-to-r from-red-600 to-red-500 px-8 py-12 text-center">
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-red-400 to-red-300 opacity-20"></div>
          <div className="mx-auto mb-6 flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-white/10 backdrop-blur-[2px]">
            <AlertOctagon className="h-12 w-12 text-white" />
          </div>
          <h1 className="mb-2 text-5xl font-bold text-white">Error</h1>
          <p className="text-lg font-medium text-red-100">Something went wrong</p>
        </div>
        
        <div className="space-y-6 px-8 py-10">
          <p className="text-center text-gray-600">
            {error?.message || 'An unexpected error occurred. Our team has been notified.'}
          </p>
          
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => reset()}
              className="flex-1 cursor-pointer rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 cursor-pointer rounded-lg border border-red-200 bg-white px-6 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Return Home
            </button>
          </div>
        </div>
        
        <div className="border-t border-red-100 bg-red-50/50 px-8 py-4">
          <p className="text-center text-sm text-red-600">
            If this problem persists, please contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}