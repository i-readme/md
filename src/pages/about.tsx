"use client";

import ErrorIcon from '@icons/sun.svg';




export default function AboutPage() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">This is about page</h1>
      <ErrorIcon/>

      <button

        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        This is about page
      </button>
    </div>
  );
}
