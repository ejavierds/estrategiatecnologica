import React from 'react';

export default function RedStar({ className = "w-6 h-6", animated = false }) {
  return (
    <svg
      className={`${className} ${animated ? 'animate-pulse' : ''} text-red-600 inline-block align-middle transition-transform duration-200 hover:scale-110`}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Estrella Roja de la Praxis Social"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
