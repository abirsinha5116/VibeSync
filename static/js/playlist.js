function navigate(mood) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = '/playlist';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'mood';
  input.value = mood;

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
}

function loadPlaylistFromServer(mood, songs, autoplayUrl) {
  if (!mood || !Array.isArray(songs)) return;
  const container = document.getElementById('playlist-container');
  // container.innerHTML = `<h2>${mood.charAt(0).toUpperCase() + mood.slice(1)} Playlist</h2>`;

  songs.forEach((song, index) => {
    const player = document.createElement('div');
    player.className = 'player';
    player.innerHTML = `
      <p>${song.title}</p>
      <audio id="player${index}" src="${song.file}" controls></audio>
  
    `;
    container.appendChild(player);
  });

  const oldAuto = document.getElementById('auto-player');
  if (oldAuto) oldAuto.remove();

  if (autoplayUrl) {
    const autoAudio = document.createElement('audio');
    autoAudio.id = 'auto-player';
    autoAudio.src = autoplayUrl;
    autoAudio.autoplay = true;
    autoAudio.controls = true;
    autoAudio.style.display = 'block';
    autoAudio.style.margin = '20px auto';
    container.prepend(autoAudio);
  }
}

// function togglePlay(index) {
//   const audio = document.getElementById(`player${index}`);
//   const btnIcon = audio.nextElementSibling.querySelector('i');
//   if (audio.paused) {
//     audio.play();
//     btnIcon.textContent = 'pause';
//   } else {
//     audio.pause();
//     btnIcon.textContent = 'play_arrow';
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('detect-emotion-btn');
  const loading = document.getElementById('loading-text');

  btn.addEventListener('click', () => {
    btn.disabled = true;
    loading.style.display = 'block';

    fetch('/detect-emotion', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        loadPlaylistFromServer(data.mood, data.songs, data.autoplay);
        loading.style.display = 'none';
        btn.disabled = false;
      })
      .catch(err => {
        loading.textContent = 'Detection failed.';
        console.error(err);
        btn.disabled = false;
      });
  });
});