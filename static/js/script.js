console.log("Welcome to Vibesync");

let songs = [], songIndex = 0;
const audioElement = new Audio();
let masterPlay, ProgressBar, gif, masterSongName, songItems, nextBtn, prevBtn;

fetch('/api/songs')
  .then(r => r.json())
  .then(data => {
    songs = data;
    cacheDomElements();
    initializePlayer();
    attachEventListeners();
  })
  .catch(console.error);

function cacheDomElements() {
  masterPlay     = document.getElementById('masterPlay');
  ProgressBar    = document.getElementById('ProgressBar');
  gif            = document.getElementById('gif');
  masterSongName = document.getElementById('masterSongName');
  nextBtn        = document.getElementById('next');
  prevBtn        = document.getElementById('previous');
  songItems      = Array.from(document.getElementsByClassName('songitem'));
  volumeBar = document.getElementById('volumeBar');
  volumeIcon = document.getElementById('volumeIcon');
}

function initializePlayer() {
  if (!songs.length) return;
  audioElement.src           = `/static/${songs[0].file_url}`;
  masterSongName.innerText   = songs[0].name;
  updateMasterIcon();
}

function attachEventListeners() {
  masterPlay.addEventListener('click', togglePlayPause);


  volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value;
    updateVolumeIcon();
  });

  volumeIcon.addEventListener('click', () => {
    if (audioElement.muted) {
      audioElement.muted = false;
      volumeBar.value = audioElement.volume;
    } else {
      audioElement.muted = true;
      volumeBar.value = 0;
    }
    updateVolumeIcon();
  });


  audioElement.addEventListener('timeupdate', () => {
    ProgressBar.value = audioElement.duration
      ? (audioElement.currentTime / audioElement.duration) * 100
      : 0;
  });

  ProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (ProgressBar.value / 100) * audioElement.duration;
  });

  audioElement.addEventListener('ended', () =>
    playSong((songIndex + 1) % songs.length)
  );

  nextBtn.addEventListener('click', () =>
    playSong((songIndex + 1) % songs.length)
  );
  prevBtn.addEventListener('click', () =>
    playSong((songIndex - 1 + songs.length) % songs.length)
  );
}

function togglePlayPause() {
  audioElement.paused ? audioElement.play() : audioElement.pause();
  updateMasterIcon();
}

function updateMasterIcon() {
  if (audioElement.paused) {
    masterPlay.classList.replace('fa-pause-circle','fa-play-circle');
    gif.style.opacity = 0;
  } else {
    masterPlay.classList.replace('fa-play-circle','fa-pause-circle');
    gif.style.opacity = 1;
  }
}

function updateVolumeIcon() {
  if (audioElement.muted || audioElement.volume === 0) {
    volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
  } else {
    volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
  }
}


function resetAllPlayButtons() {
  songItems.forEach((_, i) => {
    const icon = document.getElementById(`play-${i}`);
    if (icon) icon.classList.replace('fa-pause-circle','fa-play-circle');
  });
}

function playSong(i) {
  songIndex = i;
  audioElement.src         = `/static/${songs[i].file_url}`;
  masterSongName.innerText = songs[i].name;
  audioElement.currentTime = 0;
  audioElement.play();

  resetAllPlayButtons();
  const icon = document.getElementById(`play-${i}`);
  if (icon) icon.classList.replace('fa-play-circle','fa-pause-circle');
  updateMasterIcon();
}
