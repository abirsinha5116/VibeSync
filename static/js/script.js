let songIndex = 0;
let audioElement = new Audio(`/static/${songs[songIndex].file_url}`);

const masterPlay = document.getElementById('masterPlay');
const ProgressBar = document.getElementById('ProgressBar');
const volumeBar = document.getElementById('volumeBar');
const volumeIcon = document.getElementById('volumeIcon');
const masterSongName = document.getElementById('masterSongName');
const songItems = document.querySelectorAll('.songItem');
const gif = document.getElementById('gif');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('previous');

// Initialize song list display
songItems.forEach((element, i) => {
  const songImage = element.querySelector('.songImage');
  const songName = element.querySelector('.songName');
  songImage.src = `/static/${songs[i].cover_path}`;
  songName.innerText = songs[i].name;
});

// Event Listeners
function attachEventListeners() {
  masterPlay.addEventListener('click', togglePlayPause);

  volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value;
    updateVolumeIcon();
  });

  volumeIcon.addEventListener('click', () => {
    audioElement.muted = !audioElement.muted;
    volumeBar.value = audioElement.muted ? 0 : audioElement.volume;
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

  audioElement.addEventListener('ended', () => {
    playSong((songIndex + 1) % songs.length);
  });

  nextBtn.addEventListener('click', () =>
    playSong((songIndex + 1) % songs.length)
  );

  prevBtn.addEventListener('click', () =>
    playSong((songIndex - 1 + songs.length) % songs.length)
  );

  // Individual song play buttons
  songItems.forEach((_, i) => {
    const playBtn = document.getElementById(`play-${i}`);
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (songIndex === i && !audioElement.paused) {
          audioElement.pause();
          updateMasterIcon();
          resetAllPlayButtons();
        } else {
          playSong(i);
        }
      });
    }
  });
}

function togglePlayPause() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    updateMasterIcon();

    const playBtn = document.getElementById(`play-${songIndex}`);
    if (playBtn) {
      playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    }
  } else {
    audioElement.pause();
    updateMasterIcon();
    resetAllPlayButtons();
  }
}

function updateMasterIcon() {
  masterPlay.classList.toggle('fa-play-circle', audioElement.paused);
  masterPlay.classList.toggle('fa-pause-circle', !audioElement.paused);
  gif.style.opacity = audioElement.paused ? 0 : 1;
}

function resetAllPlayButtons() {
  songItems.forEach((_, i) => {
    const icon = document.getElementById(`play-${i}`);
    if (icon) icon.classList.replace('fa-pause-circle', 'fa-play-circle');
  });
}

function updateVolumeIcon() {
  const volume = audioElement.muted ? 0 : audioElement.volume;
  volumeIcon.className = 'fas';
  if (volume === 0) {
    volumeIcon.classList.add('fa-volume-mute');
  } else if (volume <= 0.5) {
    volumeIcon.classList.add('fa-volume-down');
  } else {
    volumeIcon.classList.add('fa-volume-up');
  }
}

function playSong(i) {
  resetAllPlayButtons();
  songIndex = i;
  audioElement.src = `/static/${songs[i].file_url}`;
  masterSongName.innerText = songs[i].name;
  audioElement.currentTime = 0;
  audioElement.play();

  updateMasterIcon();

  const playBtn = document.getElementById(`play-${i}`);
  if (playBtn) {
    playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
  }
}

// Start everything
attachEventListeners();
