"use client";

import React, { useState } from "react";

const Status = [
  {
    Available: {
      name: "Disponible pour travailler",
      color: "lime",
    },

    NotAvailable: {
      name: "Indisponible pour le moment",
      color: "red",
    },
    Relaxing: {
      name: "Terminé",
      color: "lime",
    },
  },
];

function Statuspage({ isAvailbale, Relaxing, className }) {
  let [status, setStatus] = useState(
    isAvailbale
      ? Status[0].Available
      : Relaxing
      ? Status[0].Relaxing
      : Status[0].NotAvailable
  );

  let bgColorClass =
    status === Status[0].Available
      ? "bg-lime-400"
      : Status[0].Relaxing
      ? "bg-lime-400 "
      : "bg-red-600 ";

  return (
    <div>
      <span
        className={`inline-flex items-center px-2 py-0 text-xs font-semibold  pointer-events-auto ${className} `}
      >
        <span className="mr-1.5 flex justify-center h-2 w-2 items-center ">
          <span
            className={`absolute flex  w-2 h-2 rounded-full  opacity-75 animate-ping ${bgColorClass}`}
          ></span>
          <span
            className={`relative inline-flex w-1 h-1 rounded-full ${bgColorClass}`}
          ></span>
        </span>
        <span className="dark:text-neutral-500 ">{status.name}</span>
      </span>
    </div>
  );
}

export default Statuspage;
