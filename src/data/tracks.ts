import quieroUnTeQuiero from "../assets/tracks/quiero-un-te-quiero.webp";
import masQueUnCafe from "../assets/tracks/mas-que-un-cafe.webp";

export interface Track {
  title: string;
  /** URI de Spotify: spotify:track:<id> | spotify:album:<id> | spotify:episode:<id> */
  uri: string;
  year?: string;
  /** Portada, importada desde `src/assets/tracks/`. */
  img?: ImageMetadata;
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
    img: quieroUnTeQuiero,
  },
  {
    title: "Más que un café",
    uri: "spotify:track:4nqTvN8spZrRKlk9iJSH5M",
    year: "2026",
    img: masQueUnCafe,
  },
];
