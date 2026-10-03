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
    "Nelú, cantautora y saxofonista independiente de Comala, Colima. Jazz, bolero y pop para contar historias de amor entre mujeres con metáforas curiosas.",
  url: "https://nelu.me",
  ogImage: "/open-graph-image.jpg",
  contactEmail: "hola@nelu.me",
  socials: [
    { name: "Instagram", handle: "@mellamo_nelu", url: "https://www.instagram.com/mellamo_nelu" },
    { name: "Facebook", handle: "mellamonelu", url: "https://www.facebook.com/mellamonelu" },
    { name: "TikTok", handle: "@mellamo_nelu", url: "https://www.tiktok.com/@mellamo_nelu" },
  ],
  bio: [
    "Soy Nelú, una cantautora y saxofonista independiente de Comala, Colima, México.",
    "Mi música fusiona jazz, bolero y pop para contar historias, explorando el amor entre mujeres y las emociones auténticas a través de metáforas curiosas, creando un espacio honesto y relajado.",
  ],
  genres: ["Jazz", "Bolero", "Pop", "Canción de autora"],
};

export interface Platform {
  name: string;
  /** Enlace a la música. Omitir cuando la plataforma aún no está disponible. */
  url?: string;
  /** Se muestra atenuada con la leyenda "Próximamente". */
  comingSoon?: boolean;
}

export const platforms: Platform[] = [
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
  { name: "Deezer", comingSoon: true },
  { name: "Tidal", comingSoon: true },
];
