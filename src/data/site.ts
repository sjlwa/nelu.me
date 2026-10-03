/** Paleta de colores activa. Opciones: "calida" (ámbar) o "verde" (hoja). Se definen en src/styles/global.css. */
export type Palette = "calida" | "verde";
export const palette = "verde" as Palette;

/** Color de la barra del navegador en móviles, por paleta. */
export const themeColor: Record<Palette, string> = {
  calida: "#17120e",
  verde: "#0f1711",
};

export const site = {
  name: "Nelú",
  tagline: "Cantautora y saxofonista",
  origin: "Colima, México",
  description:
    "Nelú es cantautora y saxofonista de Colima, México. Jazz, bolero y pop con canciones de amor sáficas. Escucha su música, mira fotos y videos y conoce sus próximas presentaciones.",
  url: "https://nelu.me",
  ogImage: "/open-graph-image.jpg",
  contactEmail: "hola@nelu.me",
  socials: [
    { name: "Instagram", handle: "@mellamo_nelu", url: "https://www.instagram.com/mellamo_nelu" },
    { name: "Facebook", handle: "mellamonelu", url: "https://www.facebook.com/mellamonelu" },
    { name: "TikTok", handle: "@mellamo_nelu", url: "https://www.tiktok.com/@mellamo_nelu" },
  ],
  bio: [
    "Soy Nelú, cantautora y saxofonista de Comala, Colima. En luna llena me convierto en pan; el resto del mes escribo canciones.",
    "Mi música mezcla jazz, bolero y pop para contar historias de amor entre mujeres: amores de todos los días, con sus dudas y sus ternuras, dichos con metáforas curiosas y sin prisa.",
    "En mis conciertos hay saxofón, guitarra, plantas y tazas de barro. Un espacio honesto y relajado para escucharnos de cerca.",
  ],
  genres: ["Jazz", "Bolero", "Pop", "Canción de autora"],
};

export const platforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/7CA2VhlKcqsnQPRyu1fXEV",
  },
  {
    name: "YouTube Music",
    url: "https://music.youtube.com/watch?v=ycaHNEyC8J4&si=vtNeHtVFRBdlKWmm",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/mx/album/quiero-un-t%C3%A9-quiero/1807242914?i=1807242918",
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com.mx/albums/B0F3ZZSG9F?ref=dm_sh_am4a_B0F3ZNRP1D_6r7PQAiW4nW1HJ&trackAsin=B0F3ZS4JKP",
  },
] as const;
