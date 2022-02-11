import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center align-middle">
      <div className="h-36 ml-32">
        <img src="/images/NEAR.png" alt="" className="w-full h-full animate-pulse" />
      </div>
    </div>
  );
}
