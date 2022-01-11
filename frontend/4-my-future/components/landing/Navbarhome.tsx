import React from "react";

function Navbarhome() {
  const [user, setUser] = React.useState("");
  return (
    <div className="mt-3">
      <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
        {" "}
        <li>
          {" "}
          <a
            href="#inicio"
            className="flex justify-center border-b-4 border-transparent hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            INICIO
          </a>{" "}
        </li>{" "}
        <li>
          {" "}
          <a
            href="#banner"
            className="flex justify-center border-b-4 border-transparent hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            BENEFICIOS
          </a>{" "}
        </li>{" "}
        <li>
          {" "}
          <a
            href="#Work"
            className="flex justify-center border-b-4 border-transparent hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            CÓMO FUNCIONA 
          </a>{" "}
        </li>{" "}
        <li>
          {" "}
          <a
            href="#Team"
            className="flex justify-center border-b-4 border-transparent hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            SOBRE NOSOTROS
          </a>{" "}
        </li>{" "}
       
      </ul>
    </div>
  );
}

export default Navbarhome;
