export interface Track {
  title: string;
  /** URI de Spotify: spotify:track:<id> | spotify:album:<id> | spotify:episode:<id> */
  uri: string;
  year?: string;
  img?: string;
}

/**
 * Lista que alimenta la sección "Mi música".
 * Para agregar una canción, copia su URI desde Spotify (Compartir > Copiar URI).
 */
export const tracks: Track[] = [
  {
    title: "Quiero un té, quiero",
    uri: "spotify:track:70XKEDg1fnjLThZTWKcDDn",
    year: "2025",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e9/8c/bb/e98cbb5f-e17f-feff-d54c-7e529f6b6083/199257300695_cover.jpg/600x600bb.jpg",
  },
];
