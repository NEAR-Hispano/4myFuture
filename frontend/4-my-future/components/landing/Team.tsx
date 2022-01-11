import React from "react";

function Team() {
  return (

    <div id="Team">

        <div className="sm:text-center lg:text-center mt-10 mb-10">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Nuestro </span>{' '}
                <span className="block text-emerald-400 xl:inline">Team</span>
              </h1>
        </div>
         <div className="grid grid-rows-1 grid-flow-col">
      <div className="text-center">
        <img
          src="../images/bladimir.png"
          className="rounded-full w-20 h-32 mb-4 mx-auto"
          alt="Avatar"
        />
        <h5 className="text-xl font-medium leading-tight mb-2">
          Bladimir J. Aponte
        </h5>
        <p className="text-gray-500">Co-Funder</p>
      </div>

      <div className="text-center">
        <img
          src="../images/edward.png"
          className="rounded-full w-32 h-32 mb-4 mx-auto"
          alt="Avatar"
        />
        <h5 className="text-xl font-medium leading-tight mb-2">
          Edward Vergel
        </h5>
        <p className="text-gray-500">Co-Funder</p>
      </div>
    </div>
    </div>
   
  );
}

export default Team;
