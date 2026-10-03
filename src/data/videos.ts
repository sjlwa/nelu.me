export interface Video {
  /** ID del video de YouTube (lo que va después de `v=` o de `youtu.be/` en la URL). */
  id: string;
  title: string;
  description?: string;
  /**
   * `false` cuando el video no permite insertarse (YouTube > Detalles > "Permitir inserción").
   * En ese caso el botón abre el video en YouTube en lugar de reproducirlo aquí.
   */
  embeddable?: boolean;
}

/** Lista que alimenta la sección "Videos". El primero aparece primero. */
export const videos: Video[] = [
  {
    id: "NbsH-n8RuRc",
    title: "Quiero un té, quiero",
    description: "Visualizador oficial · 2025",
  },
  {
    id: "E7oH6LOPtoc",
    title: "Nelú en la Caravana de las canciones",
    description: "En vivo · Teatro Hidalgo, Colima · 25 de abril de 2025",
    embeddable: false,
  },
];
