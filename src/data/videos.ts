export interface Video {
  /** ID del video de YouTube (lo que va después de `v=` en la URL). */
  id: string;
  title: string;
  description?: string;
  /** Marca los videos de ejemplo para reemplazarlos después. */
  placeholder?: boolean;
}

/**
 * Lista que alimenta la sección "Videos".
 * Los elementos con `placeholder: true` usan el mismo ID solo para mostrar el diseño.
 * Reemplázalos con los IDs reales y quita la bandera.
 */
export const videos: Video[] = [
  {
    id: "ycaHNEyC8J4",
    title: "Quiero un té, quiero",
    description: "Sencillo · 2025",
  },
  {
    id: "ycaHNEyC8J4",
    title: "Sesión en vivo (ejemplo)",
    description: "Reemplaza este ID con el video real",
    placeholder: true,
  },
  {
    id: "ycaHNEyC8J4",
    title: "Detrás de cámaras (ejemplo)",
    description: "Reemplaza este ID con el video real",
    placeholder: true,
  },
];
