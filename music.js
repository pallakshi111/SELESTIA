const songs = [
  { title: 'Neon Orbit', artist: 'Selestia Radio', genre: 'Synthwave', cover: '🌌', notes: [261.63, 329.63, 392.0, 523.25] },
  { title: 'Pixel Heartbeat', artist: 'Arcade Pulse', genre: 'Pop', cover: '💜', notes: [329.63, 392.0, 493.88, 659.25] },
  { title: 'Moonlit Raga', artist: 'Cosmic Strings', genre: 'Indian', cover: '🌙', notes: [293.66, 349.23, 440.0, 587.33] },
  { title: 'Lunar Loops', artist: 'Focus Drift', genre: 'Lo-fi', cover: '🪐', notes: [220.0, 261.63, 329.63, 392.0] },
  { title: 'Bass Portal', artist: 'Nebula Flow', genre: 'Rap', cover: '🔥', notes: [196.0, 246.94, 293.66, 392.0] },
  { title: 'Starlight Rush', artist: 'Nova Mix', genre: 'Pop', cover: '⚡', notes: [392.0, 493.88, 587.33, 783.99] },
];

const songsGrid = document.querySelector('#songsGrid');
const searchInput = document.querySelector('#searchInput');
const genreButtons = document.querySelectorAll('.genre');
const currentSong = document.querySelector('#currentSong');
const currentArtist = document.querySelector('#currentArtist');
const heroTrack = document.querySelector('#heroTrack');
const heroArtist = document.querySelector('#heroArtist');
const coverOrb = document.querySelector('#coverOrb');
const playButton = document.querySelector('#playButton');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
const playerState = document.querySelector('#playerState');
const progressFill = document.querySelector('#progressFill');
const currentTime = document.querySelector('#currentTime');
const durationTime = document.querySelector('#durationTime');
const volumeControl = document.querySelector('#volumeControl');
const playlistName = document.querySelector('#playlistName');
const createPlaylist = document.querySelector('#createPlaylist');
const playlistList = document.querySelector('#playlistList');
const queueList = document.querySelector('#queueList');
const clearPlaylist = document.querySelector('#clearPlaylist');
const chatFeed = document.querySelector('#chatFeed');
const chatName = document.querySelector('#chatName');
const chatInput = document.querySelector('#chatInput');
const sendChat = document.querySelector('#sendChat');
const clearChat = document.querySelector('#clearChat');

let selectedGenre = 'all';
let currentIndex = 0;
let audioContext;
let gainNode;
let sequenceTimer;
let progressTimer;
let isPlaying = false;
let startedAt = 0;
const previewDuration = 20;
const queueKey = 'selestiaMusicQueue';
const playlistKey = 'selestiaMusicPlaylists';
const chatKey = 'selestiaMusicChat';

const formatTime = (seconds) => '0:' + Math.floor(seconds).toString().padStart(2, '0');
const load = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const ensureAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
  }
  gainNode.gain.value = Number(volumeControl.value) / 100;
};

const stopPreview = () => {
  clearInterval(sequenceTimer);
  clearInterval(progressTimer);
  isPlaying = false;
  playButton.textContent = '▶';
  playerState.textContent = 'Paused';
};

const playTone = (frequency, time, duration = 0.34) => {
  const oscillator = audioContext.createOscillator();
  const toneGain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, time);
  toneGain.gain.setValueAtTime(0.0001, time);
  toneGain.gain.exponentialRampToValueAtTime(Number(volumeControl.value) / 180, time + 0.03);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  oscillator.connect(toneGain).connect(gainNode);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.04);
};

const playPreview = (index = currentIndex) => {
  ensureAudio();
  stopPreview();
  currentIndex = (index + songs.length) % songs.length;
  const song = songs[currentIndex];
  currentSong.textContent = song.title;
  currentArtist.textContent = song.artist + ' • ' + song.genre;
  heroTrack.textContent = song.title;
  heroArtist.textContent = song.artist;
  coverOrb.textContent = song.cover;
  playerState.textContent = 'Playing';
  playButton.textContent = '⏸';
  isPlaying = true;
  startedAt = Date.now();

  let step = 0;
  const playStep = () => {
    const now = audioContext.currentTime;
    const base = song.notes[step % song.notes.length];
    playTone(base, now);
    playTone(base * 1.5, now + 0.12, 0.22);
    step += 1;
  };
  playStep();
  sequenceTimer = setInterval(playStep, 480);
  progressTimer = setInterval(() => {
    const elapsed = (Date.now() - startedAt) / 1000;
    currentTime.textContent = formatTime(Math.min(previewDuration, elapsed));
    progressFill.style.width = Math.min(100, (elapsed / previewDuration) * 100) + '%';
    if (elapsed >= previewDuration) playPreview(currentIndex + 1);
  }, 250);
};

const renderSongs = () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = songs.filter((song) => {
    const matchesGenre = selectedGenre === 'all' || song.genre.toLowerCase() === selectedGenre;
    const matchesSearch = [song.title, song.artist, song.genre].some((item) => item.toLowerCase().includes(query));
    return matchesGenre && matchesSearch;
  });
  songsGrid.innerHTML = filtered.map((song) => {
    const index = songs.indexOf(song);
    return '<article class="song-card"><div class="song-cover">' + song.cover + '</div><div class="song-title">' + song.title + '</div><div class="song-artist">' + song.artist + '</div><div class="song-genre">' + song.genre + '</div><div class="song-actions"><button data-play="' + index + '">Play</button><button data-add="' + index + '">Add</button></div></article>';
  }).join('');
};

const renderQueue = () => {
  const queue = load(queueKey);
  queueList.innerHTML = queue.length ? queue.map((title) => '<span class="queue-chip">' + title + '</span>').join('') : '<span class="queue-chip">No songs added yet</span>';
};
const renderPlaylists = () => {
  const playlists = load(playlistKey);
  playlistList.innerHTML = playlists.map((name) => '<span class="playlist-chip">🎵 ' + name + '</span>').join('');
};
const addMessage = ({ name, text, system = false }) => {
  const bubble = document.createElement('div');
  bubble.className = system ? 'message system' : 'message';
  bubble.innerHTML = system ? text : '<strong>' + name + '</strong><span>' + text + '</span>';
  chatFeed.appendChild(bubble);
  chatFeed.scrollTop = chatFeed.scrollHeight;
};
const renderChat = () => {
  chatFeed.innerHTML = '<div class="message system">Welcome to Music Space. Play a preview, build a queue, and share what you are listening to.</div>';
  load(chatKey).forEach(addMessage);
};

songsGrid.addEventListener('click', (event) => {
  const playIndex = event.target.dataset.play;
  const addIndex = event.target.dataset.add;
  if (playIndex !== undefined) playPreview(Number(playIndex));
  if (addIndex !== undefined) {
    const queue = load(queueKey);
    queue.push(songs[Number(addIndex)].title);
    save(queueKey, queue.slice(-20));
    renderQueue();
  }
});
searchInput.addEventListener('input', renderSongs);
genreButtons.forEach((button) => button.addEventListener('click', () => {
  selectedGenre = button.dataset.genre;
  genreButtons.forEach((item) => item.classList.toggle('active', item === button));
  renderSongs();
}));
playButton.addEventListener('click', async () => {
  if (isPlaying) stopPreview();
  else playPreview(currentIndex);
});
prevButton.addEventListener('click', () => playPreview(currentIndex - 1));
nextButton.addEventListener('click', () => playPreview(currentIndex + 1));
volumeControl.addEventListener('input', () => { if (gainNode) gainNode.gain.value = Number(volumeControl.value) / 100; });
createPlaylist.addEventListener('click', () => {
  const name = playlistName.value.trim();
  if (!name) return;
  const playlists = load(playlistKey);
  playlists.push(name);
  save(playlistKey, playlists.slice(-12));
  playlistName.value = '';
  renderPlaylists();
});
clearPlaylist.addEventListener('click', () => { localStorage.removeItem(queueKey); localStorage.removeItem(playlistKey); renderQueue(); renderPlaylists(); });
sendChat.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  const messages = load(chatKey);
  const message = { name: chatName.value.trim() || 'Listener', text };
  messages.push(message);
  save(chatKey, messages.slice(-40));
  addMessage(message);
  chatInput.value = '';
});
chatInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') sendChat.click(); });
clearChat.addEventListener('click', () => { localStorage.removeItem(chatKey); renderChat(); });

durationTime.textContent = '0:' + previewDuration;
renderSongs();
renderQueue();
renderPlaylists();
renderChat();
