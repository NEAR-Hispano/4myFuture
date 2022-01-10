import React from "react";
import Proposal from "../models/Proposal";
import Pagination from "./Pagination";

interface ProposalGeneralProps {
  proposals: Proposal[];
}

function ProposalsGeneral({ proposals }: ProposalGeneralProps) {
  return (
    <div className="m-auto">
      <div className="p-16">
        <div className="p-8 bg-white shadow">
          {" "}
          <div className="grid grid-rows-1 grid-flow-col ">
            <div className="mb-3 xl:w-96">
              <input
                type="search"
                className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                id="exampleSearch"
                placeholder="Buscar propuesta"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {" "}
              <div className="grid grid-cols-3 text-center order-last md:order-first">
                {" "}
                <div>
                  {" "}
                  <p className="font-bold text-gray-700 text-xl">10</p>{" "}
                  <p className="text-gray-400">Pruestas activas</p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="font-bold text-gray-700 text-xl">3</p>{" "}
                  <p className="text-gray-400">Propuestas aprobadas</p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="font-bold text-gray-700 text-xl">1</p>{" "}
                  <p className="text-gray-400">Propuestas rechazadas</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
          <div className="w-80 bg-white shadow rounded">
            {" "}
            <div className="mt-20 h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center bg-[url('https://firebasestorage.googleapis.com/v0/b/myfurue.appspot.com/o/edward-foto-removebg-preview-removebg-preview.png?alt=media&token=27209588-7ad1-486c-9bd2-6ab68092cb94')]">
              <div>
                {" "}
                <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                  {" "}
                  20% completada{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="p-4 flex flex-col items-center">
              {" "}
              <p className="text-gray-400 font-light text-xs text-center">
                {" "}
                Edward Vergel{" "}
              </p>{" "}
              <h1 className="text-gray-800 text-center mt-1">
                Culminar carrera universitaria
              </h1>{" "}
              <p className="text-center text-gray-800 mt-1"> Objetivo: $1299</p>{" "}
              <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
                {" "}
                Donar{" "}
              </button>{" "}
            </div>{" "}
          </div>
       
        </div>
        <Pagination/>
      
      </div>

      {proposals?.map((proposal) => {
        <div className="flex flex-col">
          <h1>{proposal?.title}</h1>
          <p>{proposal?.description}</p>
          <p>{proposal?.user}</p>
        </div>;
      })}
        
    </div>
  
  );
}

export default ProposalsGeneral;
