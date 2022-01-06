import React from 'react';

function UploadIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 53 36"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M44.207 10.489C42.48 4.429 36.992 0 30.487 0c-4.903 0-9.23 2.517-11.802 6.36a7.482 7.482 0 00-4.81-1.75c-4.195 0-7.598 3.467-7.598 7.743 0 .723.099 1.42.28 2.087C2.694 16.195 0 20.143 0 24.73 0 30.954 4.948 36 11.053 36h11.044v-9.925h-6.004L26.1 14.076l10.005 12h-6.003V36h9.08c7.191 0 13.019-5.942 13.019-13.27 0-5.515-3.297-10.24-7.994-12.241z"
      />
    </svg>
  );
}

export default UploadIcon;
