console.log("Welcome to Vibesync");

// Core state
let songs = [];
let songIndex = 0;
let audioElement = new Audio();
let masterPlay, ProgressBar, gif, masterSongName, songItems, nextBtn, prevBtn;

// Fetch songs and initialize everything
fetch('/api/songs')
  .then(res => res.json())
  .then(data => {
    songs = data;
    cacheDomElements();
    renderPlaylist();
    initializePlayer();
    attachEventListeners();
  })
  .catch(err => console.error("Failed to load songs:", err));

function cacheDomElements() {
  masterPlay     = document.getElementById('masterPlay');
  ProgressBar    = document.getElementById('ProgressBar');
  gif            = document.getElementById('gif');
  masterSongName = document.getElementById('masterSongName');
  nextBtn        = document.getElementById('next');
  prevBtn        = document.getElementById('previous');
  songItems      = Array.from(document.getElementsByClassName('songitem'));
}

function renderPlaylist() {
  // assumes your HTML has the correct number of .songitem placeholders
  songItems.forEach((el, i) => {
    if (!songs[i]) return;
    const song = songs[i];
    el.querySelector('img').src          = `/static/${song.cover_url}`;
    el.querySelector('.songName').innerText = song.name;
    // set up an <audio> inside each .songitem
    let audioTag = el.querySelector('audio');
    if (!audioTag) {
      audioTag = document.createElement('audio');
      el.appendChild(audioTag);
    }
    audioTag.id  = `audio-${i}`;
    audioTag.src = `/static/${song.file_url}`;
    // set up the play icon
    const icon = el.querySelector('.songItemPlay') || el.querySelector('i');
    icon.id      = `play-${i}`;
    icon.classList.add('fa-play-circle');
    icon.classList.remove('fa-pause-circle');
    icon.onclick = () => playSong(i);
  });
}

function initializePlayer() {
  if (!songs.length) return;
  audioElement.src = `/static/${songs[0].filePath}`;
  masterSongName.innerText = songs[0].songName;
  updateMasterIcon();
}

function attachEventListeners() {
  // Master play/pause
  masterPlay.addEventListener('click', togglePlayPause);

  // Progress bar update
  audioElement.addEventListener('timeupdate', () => {
    const progress = audioElement.duration
      ? (audioElement.currentTime / audioElement.duration) * 100
      : 0;
    ProgressBar.value = progress;
  });

  // Seek
  ProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (ProgressBar.value / 100) * audioElement.duration;
  });

  // Auto next
  audioElement.addEventListener('ended', () => playSong((songIndex + 1) % songs.length));

  // Next / Prev
  nextBtn.addEventListener('click', () => playSong((songIndex + 1) % songs.length));
  prevBtn.addEventListener('click', () => playSong((songIndex - 1 + songs.length) % songs.length));
}

function togglePlayPause() {
  if (audioElement.paused) {
    audioElement.play();
  } else {
    audioElement.pause();
  }
  updateMasterIcon();
}

function updateMasterIcon() {
  if (audioElement.paused) {
    masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    if (gif) gif.style.opacity = 0;
  } else {
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    if (gif) gif.style.opacity = 1;
  }
}

function resetAllPlayButtons() {
  songItems.forEach((el, i) => {
    const icon = document.getElementById(`play-${i}`);
    if (icon) {
      icon.classList.replace('fa-pause-circle', 'fa-play-circle');
    }
  });
}

function playSong(index) {
  // switch track
  songIndex = index;
  audioElement.src = `/static/${songs[index].filePath}`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerText = songs[index].songName;

  // update icons
  resetAllPlayButtons();
  const icon = document.getElementById(`play-${index}`);
  if (icon) icon.classList.replace('fa-play-circle', 'fa-pause-circle');
  updateMasterIcon();
}
