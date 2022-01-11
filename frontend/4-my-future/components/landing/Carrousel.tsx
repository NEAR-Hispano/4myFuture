import React from "react";

function Carrousel() {
  return (
    <div id="inicio" className="carousel slide relative" data-bs-ride="carousel">
  <div className="carousel-inner relative w-full overflow-hidden">
    <div className="carousel-item active relative float-left w-full">
      <img
        src="../images/future2.png"
        className="block w-full"
        alt="Wild Landscape"
      />
    </div>
    </div>
  </div>

  );
}

export default Carrousel;
