import React from 'react';

function Pagination() {

    


    return (
        <div className='mt-10'>
            <nav aria-label="Pagination" className="flex items-center text-gray-600 w-80 m-auto">
  {" "}
  <a href="#" className="p-2 mr-4 rounded hover:bg-gray-100">
    {" "}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {" "}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />{" "}
    </svg>{" "}
  </a>{" "}
  <a href="#" className="px-4 py-2 rounded hover:bg-gray-100">
    {" "}
    1{" "}
  </a>{" "}
  <a
    href="#"
    className="px-4 py-2 rounded bg-gray-200 text-gray-900 font-medium hover:bg-gray-100"
  >
    {" "}
    2{" "}
  </a>{" "}
  <a href="#" className="px-4 py-2 rounded hover:bg-gray-100">
    {" "}
    3{" "}
  </a>{" "}
  <a href="#" className="px-4 py-2 rounded hover:bg-gray-100">
    {" "}
    ...{" "}
  </a>{" "}
  <a href="#" className="px-4 py-2 rounded hover:bg-gray-100">
    {" "}
    9{" "}
  </a>{" "}
  <a href="#" className="p-2 ml-4 rounded hover:bg-gray-100">
    {" "}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {" "}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />{" "}
    </svg>{" "}
  </a>{" "}
</nav>
        </div>
    )
}

export default Pagination

