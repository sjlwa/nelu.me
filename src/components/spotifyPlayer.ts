interface Window {
  onSpotifyIframeApiReady: (IFrameAPI: any) => void;
}

interface EmbedController {
  loadUri: (uri: string) => {};
  play: () => void;
  pause: () => void;
}

let currentTrackId: string | null = null;

function restorePreviousBtn() {
  // Find the previously playing button by its data attribute
  const previousBtn = document.querySelector(`.track[data-spotify-id="${currentTrackId}"]`);
  if (previousBtn) {
    const previousPlayText = previousBtn.querySelector('span');
    if (previousPlayText) {
      previousPlayText.textContent = "Escuchar";
      previousPlayText.classList.add('play-text-init');
      previousPlayText.classList.remove('play-text-selected');
    }
  }
}
function toggleOffPlayingState(selectedPlayText: HTMLElement) {
  // toggle off playing state
  selectedPlayText.textContent = "Escuchar";
  selectedPlayText.classList.add('play-text-init');
  selectedPlayText.classList.remove('play-text-selected');
}
function toggleOnPlayingState(selectedPlayText: HTMLElement) {
  selectedPlayText.textContent = "En reproducción";
  selectedPlayText.classList.remove('play-text-init');
  selectedPlayText.classList.add('play-text-selected');
}

let EmbedController: EmbedController;

function onSelect(event: Event) {
  const trackButton = event.target as HTMLButtonElement;
  const selectedTrackId = trackButton.dataset.spotifyId!;
  const selectedPlayText = trackButton.querySelector('span')!;

  if (!EmbedController) return;

  if (currentTrackId && currentTrackId !== selectedTrackId) {
    // If there is a currently playing track and it's different from the clicked one
    restorePreviousBtn();
    EmbedController.loadUri(selectedTrackId);
    toggleOnPlayingState(selectedPlayText);
    currentTrackId = selectedTrackId;
    EmbedController.play();

  } else if (selectedTrackId === currentTrackId) {
    // If clicking the same track, toggle off playing state
    toggleOffPlayingState(selectedPlayText);
    currentTrackId = null;
    EmbedController.pause();
  } else {
    // Set the clicked button to playing
    toggleOnPlayingState(selectedPlayText)
    currentTrackId = selectedTrackId;
    EmbedController.loadUri(selectedTrackId);
    EmbedController.play();
  }
}

window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
  const element = document.getElementById('embed-iframe');

  if (!element) return;

  const options = {
    width: '100%',
    height: '100',
    uri: "spotify:track:70XKEDg1fnjLThZTWKcDDn",
  };

  const callback = (controller: any) => {
    EmbedController = controller;
    document.querySelectorAll(".track").forEach((track: any) => {
      track.addEventListener('click', onSelect);
    });
  };

  IFrameAPI.createController(element, options, callback);
};
