export const menu = [
  {
    name: "Foro",
    subOptions: [
      //{ name: "Sede", link: "/#sede" },
      { name: "¿Por qué asistir?", link: "/#porque-asistir" },
    ],
  },
  {
    name: "¿Quiénes somos?",
    link: "/#quienes-somos",
    className: "w-[120px] text-center", // 👈 Ancho y alineación personalizada
  },
  {
    name: "Actualidad",
    link: "/#actualidad",
  },
  {
    name: "Agenda y Speakers",
    link: "/#agenda",
    className: "w-[130px] text-center",
  },
  {
    name: "Prensa",
    subOptions: [
      { name: "Notas", link: "/prensa/#notas" },
      { name: "Sala de prensa", link: "/prensa/#sala-de-prensa" },
    ],
  },
  {
    name: "Aliados y patrocinadores",
    link: "/#aliados",
    className: "w-[180px] text-center", // 👈 Este también en dos líneas
  },
  {
    name: "Contacto",
    link: "/#contacto",
  },
];
