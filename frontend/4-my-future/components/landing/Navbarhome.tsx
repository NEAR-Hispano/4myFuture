import React from "react";

function Navbarhome() {
  const [user, setUser] = React.useState("");
  return (
    <div className="text-white text-xl font-sans bg-primary-50">
      <ul className="grid grid-flow-col text-center border-b border-gray-200 text-white">
        {" "}
        <li>
          {" "}
          <a
            href="#inicio"
            className="flex justify-center border-b-4 border-transparent text-white hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            home
          </a>{" "}
        </li>{" "}
        <li>
          {" "}
          <a
            href="#banner"
            className="flex justify-center border-b-4 border-transparent text-white hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            Benefits
          </a>{" "}
        </li>{" "}
        <li>
          {" "}
          <a
            href="#Work"
            className="flex justify-center border-b-4 border-transparent text-white hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            How it works 
          </a>{" "}
        </li>{" "}
        <li>
          {" "}
          <a
            href="#Team"
            className="flex justify-center border-b-4 text-white border-transparent hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            About
          </a>{" "}
        </li>{" "}
        <li>
          {" "}
          <a
            href="/home"
            className="flex justify-center border-b-4  bg-green-500 text-white border-transparent hover:text-emerald-400 hover:border-emerald-400 py-4"
          >
            Launch
          </a>{" "}
        </li>{" "}
       
      </ul>
    </div>
  );
}

export default Navbarhome;
