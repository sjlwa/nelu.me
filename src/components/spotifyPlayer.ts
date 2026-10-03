interface Window {
  onSpotifyIframeApiReady: (IFrameAPI: any) => void;
}

interface PlaybackUpdate {
  data: { isPaused: boolean; isBuffering: boolean; duration: number; position: number };
}

interface EmbedController {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  addListener: (event: "ready" | "playback_update" | "playback_started", cb: (e?: any) => void) => void;
}

let controller: EmbedController | undefined;
let loadedUri: string | null = null;   // contenido cargado en el reproductor
let activeUri: string | null = null;   // pista marcada como "En reproducción"
let playWhenReady = false;             // reproducir en cuanto termine de cargar la nueva pista
let readyTimer: number | undefined;

const trackButtons = () => document.querySelectorAll<HTMLButtonElement>(".track");
const labelOf = (uri: string | null) =>
  uri ? document.querySelector<HTMLElement>(`.track[data-spotify-id="${uri}"] [data-play-label]`) : null;

function setLabel(uri: string | null, playing: boolean) {
  const label = labelOf(uri);
  if (!label) return;
  label.textContent = playing ? "En reproducción" : "Escuchar";
  label.classList.toggle("play-text-init", !playing);
  label.classList.toggle("play-text-selected", playing);
}

function markActive(uri: string | null) {
  if (activeUri && activeUri !== uri) setLabel(activeUri, false);
  activeUri = uri;
  if (uri) setLabel(uri, true);
}

function playLoaded() {
  playWhenReady = false;
  window.clearTimeout(readyTimer);
  controller?.play();
}

function onSelect(event: Event) {
  if (!controller) return;
  const uri = (event.currentTarget as HTMLButtonElement).dataset.spotifyId!;

  // Misma pista sonando: pausar.
  if (uri === activeUri) {
    controller.pause();
    markActive(null);
    return;
  }

  markActive(uri);

  if (uri === loadedUri) {
    // Ya está cargada: reproducir directo.
    playLoaded();
    return;
  }

  // Cargar la nueva pista y reproducir cuando el reproductor avise que está lista.
  loadedUri = uri;
  playWhenReady = true;
  controller.loadUri(uri);
  // Respaldo por si el evento "ready" no llega.
  window.clearTimeout(readyTimer);
  readyTimer = window.setTimeout(() => { if (playWhenReady) playLoaded(); }, 1200);
}

window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
  const element = document.getElementById("embed-iframe");
  if (!element) return;

  const first = document.querySelector<HTMLElement>(".track")?.dataset.spotifyId
    ?? "spotify:track:70XKEDg1fnjLThZTWKcDDn";
  loadedUri = first;

  IFrameAPI.createController(element, { width: "100%", height: "152", uri: first }, (ctrl: EmbedController) => {
    controller = ctrl;

    ctrl.addListener("ready", () => {
      if (playWhenReady) playLoaded();
    });

    // Mantener la etiqueta sincronizada con el estado real (p. ej. pausa desde el propio reproductor).
    ctrl.addListener("playback_update", (e: PlaybackUpdate) => {
      const { isPaused, isBuffering } = e.data;
      if (isPaused && !isBuffering && !playWhenReady && activeUri) {
        markActive(null);
      } else if (!isPaused && loadedUri && activeUri !== loadedUri) {
        markActive(loadedUri);
      }
    });

    trackButtons().forEach((btn) => btn.addEventListener("click", onSelect));
  });
};
