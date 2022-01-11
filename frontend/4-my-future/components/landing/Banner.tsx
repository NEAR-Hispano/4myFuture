import React from "react";
import Particles from "react-tsparticles";
import Particle from "../common/Particles";

function Banner() {
  const [user, setUser] = React.useState("");

  return (
    <div className="bg-gray-50 items-center" id="banner">
  

      <div className="sm:text-center lg:text-center mt-10 mb-10">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Apoyamos tu </span>{' '}
                <span className="block text-emerald-400 xl:inline">Crecimiento profesional</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
              4Myfuture es una plataforma descentralizada sobre la red de NEAR
          Protocol que permite a estudiantes recaudar fondos para completar o
          iniciar su formación profesional
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                <div className="rounded-md shadow">
                  <a
                    href="/home"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-400 hover:bg-emerald-200 md:py-4 md:text-lg md:px-10"
                  >
                    Crear propuesta
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="/home"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-800 bg-emerald-200 hover:bg-emerald-400 md:py-4 md:text-lg md:px-10"
                  >
                   Contribuir con una propuesta
                  </a>
                </div>
              </div>
            </div>
    
    </div>
  );
}

export default Banner;
