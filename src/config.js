// Edite aqui todas as informações da festa. Horários usam o fuso de Brasília.
export const party = {
  names: "Tyga & Lucca",
  dateLabel: "26/09/2026",
  start: "2026-09-26T20:00:00-03:00",
  end: "2026-09-27T03:00:00-03:00",
  timeLabel: "20h até 3h",
  timeZone: "America/Sao_Paulo",
  dressCode: "Do seu jeito",
  venue: "Tizé Bar e Butequim",
  address: "Confira o endereço e a rota no mapa.",
  mapsUrl:
    "https://www.google.com/maps/place/Tiz%C3%A9+Bar+e+Butequim/@-19.9321468,-43.9447528,16z/data=!3m1!4b1!4m6!3m5!1s0xa69761f522c8cd:0xa74dd47571b25b33!8m2!3d-19.9321468!4d-43.9447528!16s%2Fg%2F1tflhgbj?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D",
  whatsappNumber: "5531975746400", // País + DDD + número, somente dígitos.
  siteUrl: "https://viniciusfbgon.github.io/festatiluca/",
  description:
    "Você está convidado. O local é segredo… por enquanto. Vem viver essa noite com Tyga & Lucca, dia 26/09, das 20h às 3h.",
  intro:
    "Tem noite que a gente conta os dias pra chegar. E tem noite que vira história. Essa vai ser as duas coisas.",
  invite:
    "Boa música, nossos amigos e zero pressa de ir embora. Falta só você pra completar essa noite.",
  storageKey: "tyga-lucca:2026-09-26:revealed",
};

export const imageUrl = (name) => `${import.meta.env.BASE_URL}images/${name}`;
export const partyDate = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: party.timeZone,
}).format(new Date(party.start));
export const partyWeekday = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  timeZone: party.timeZone,
}).format(new Date(party.start));
