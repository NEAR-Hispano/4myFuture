import React from 'react';

function PageIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1"
      viewBox="0 0 25 25"
      className={className}
      {...props}
    >
      <rect
        width="18.263"
        height="23.263"
        x="3.369"
        y="0.869"
        fill="#fff"
        stroke="#000"
        strokeWidth="1.737"
        rx="1"
        ry="1"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.189"
        d="M7.402 6.5h10.195"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.189"
        d="M7.402 10.5h10.195"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.189"
        d="M7.402 14.5h10.195"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.189"
        d="M7.402 18.5h10.195"
      />
    </svg>
  );
}

export default PageIcon;
