interface Window {
  onSpotifyIframeApiReady: (IFrameAPI: any) => void;
}

interface EmbedController {
  loadUri: (uri: string) => {};
  play: () => void;
  pause: () => void;
}

let currentTrackId: string | null = null;
let EmbedController: EmbedController;

function labelOf(button: Element | null): HTMLElement | null {
  return button?.querySelector<HTMLElement>('[data-play-label]') ?? null;
}

function setPlaying(label: HTMLElement | null, playing: boolean) {
  if (!label) return;
  label.textContent = playing ? "En reproducción" : "Escuchar";
  label.classList.toggle('play-text-init', !playing);
  label.classList.toggle('play-text-selected', playing);
}

function onSelect(event: Event) {
  const trackButton = event.currentTarget as HTMLButtonElement;
  const selectedTrackId = trackButton.dataset.spotifyId!;
  const selectedLabel = labelOf(trackButton);

  if (!EmbedController) return;

  if (selectedTrackId === currentTrackId) {
    setPlaying(selectedLabel, false);
    currentTrackId = null;
    EmbedController.pause();
    return;
  }

  if (currentTrackId) {
    const previousBtn = document.querySelector(`.track[data-spotify-id="${currentTrackId}"]`);
    setPlaying(labelOf(previousBtn), false);
  }

  setPlaying(selectedLabel, true);
  currentTrackId = selectedTrackId;
  EmbedController.loadUri(selectedTrackId);
  EmbedController.play();
}

window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
  const element = document.getElementById('embed-iframe');
  if (!element) return;

  const first = document.querySelector<HTMLElement>('.track')?.dataset.spotifyId;

  const options = {
    width: '100%',
    height: '152',
    uri: first ?? "spotify:track:70XKEDg1fnjLThZTWKcDDn",
  };

  IFrameAPI.createController(element, options, (controller: EmbedController) => {
    EmbedController = controller;
    document.querySelectorAll<HTMLButtonElement>(".track").forEach((track) => {
      track.addEventListener('click', onSelect);
    });
  });
};
