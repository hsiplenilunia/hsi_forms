import React from "react";

export type AgendaItem = {
  tipo: string;
  hora: string;
  titulo: string;
  participantes: { nombre: string; cargo: string }[];
  moderador: { nombre: string; cargo: string };
  color: "purple" | "guacamole" | "capuchino" | "pink-fresh";
  patrocinador?: string[];
};

interface AgendaIslandProps {
  items: AgendaItem[];
}

const colorMap = {
  purple: "bg-purple text-lg text-light-text border-purple",
  guacamole: "bg-guacamole2 text-lg text-black-text border-guacamole2",
  capuchino: "bg-capuchino text-lg text-black-text border-apple",
  "pink-fresh": "bg-white text-lg text-black-text border-apple",
};

const borderColorMap = {
  purple: "#7758AC",
  guacamole: "#C2D293",
  capuchino: "#EBE5DD",
  "pink-fresh": "#F8C5FE",
};

export const AgendaIsland: React.FC<AgendaIslandProps> = ({ items }) => {

  return (
  
  <div className="grid w-full z-10">
    {items.map((item, i) => (
      <div
        key={i}
        className="grid grid-cols-1 md:grid-cols-[160px,1fr] px-4 py-0 md:min-h-[140px] border-b-2 border-black-text"
      >
        {/* Time and Type Section */}
        <div className="flex flex-col md:flex-col items-start md:items-start justify-start md:justify-center md:border-r-2 border-black-text md:pr-4 py-4 md:py-6 gap-2">
          <span
            className={`px-2 py-1 rounded-full text-center font-bold text-xs uppercase ${colorMap[item.color]}`}
          >
            {item.tipo}
          </span>
          {/* <span className="text-black-text font-extrabold text-xl">{item.hora}</span> */}
          <div className="md:hidden text-black-text font-bold text-xl mt-2">
            {item.titulo}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] md:pl-4 py-4 md:py-6 md:ml-2">
          <div className="hidden md:block text-black-text font-bold text-2xl">{item.titulo}</div>
          
          <div className="w-full md:w-[350px] md:pl-4">
            <div className="mb-4 md:mb-2">
              {item.participantes.map((p, idx) => (
                <div className="text-black-text text-sm md:text-base font-semibold" key={idx}>
                  {p.nombre} <span className="font-normal">| {p.cargo}</span>
                </div>
              ))}
            </div>
            {item.moderador?.nombre && (
              <div>
                <span className="text-black-text font-bold text-xs uppercase">Modera</span>
                <div className="text-black-text text-sm md:text-base font-semibold">
                  {item.moderador.nombre} <span className="font-normal">| {item.moderador.cargo}</span>
                </div>
              </div>
            )}
    
          </div>
        </div>
      </div>
    ))}
  </div>
);
} 

export default AgendaIsland;
