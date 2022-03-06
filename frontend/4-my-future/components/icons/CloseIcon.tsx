import React from 'react';

function CloseIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.58.58a1.3 1.3 0 011.839 0l5.58 5.582L13.582.58a1.3 1.3 0 111.838 1.838l-5.58 5.58 5.58 5.582a1.3 1.3 0 01-1.838 1.838L8 9.839l-5.581 5.58a1.3 1.3 0 01-1.838-1.838L6.16 8 .582 2.419a1.3 1.3 0 010-1.838z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default CloseIcon;
