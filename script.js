const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const progresContainer = document.getElementById("progress-container");
const progres = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const prevBtn10 = document.getElementById("prev10");
const nextBtn = document.getElementById("next");
const nextBtn10 = document.getElementById("next10");
const playBtn = document.getElementById("play");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill",
    artist: "Husnain",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Husnain",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Husnain",
  },
  {
    name: "metric-1",
    displayName: "Front Row ",
    artist: "Husnain",
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Puase Evnet
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Update DOM
function loadsong(songs) {
  title.textContent = songs.displayName;
  artist.textContent = songs.artist;
  music.src = `./music/${songs.name}.mp3`;
  image.src = `./img/${songs.name}.jpg`;
  setTimeout(() => {
    durationofVideo(music.duration, music.currentTime);
  }, 1000);
}
// Current Song
let songIndex = 0;
//  on-load
loadsong(songs[songIndex]);

// Setting Time of Video

function durationofVideo(duration, currentTime) {
  // Calculate display for duration

  const durationMinute = Math.floor(duration / 60);
  let durationSecond = Math.floor(duration % 60);
  durationSecond = durationSecond < 10 ? `0${durationSecond}` : durationSecond;

  // Delay to avoid NAN
  if (durationMinute) {
    durationEl.textContent = `${durationMinute}:${durationSecond}`;
  }
  // Calculate display for Current Time

  const currentTimeMinute = Math.floor(currentTime / 60);
  let currentTimeSecond = Math.floor(currentTime % 60);
  currentTimeSecond =
    currentTimeSecond < 10 ? `0${currentTimeSecond}` : currentTimeSecond;
  currentTimeEl.textContent = `${currentTimeMinute}:${currentTimeSecond}`;
}

// Next Song
function nextSong() {
  songIndex++;
  songIndex = songIndex > songs.length - 1 ? 0 : songIndex;
  loadsong(songs[songIndex]);
  playSong();
}
// prev Song
function prevSong() {
  songIndex--;
  songIndex = songIndex < 0 ? songs.length - 1 : songIndex;
  loadsong(songs[songIndex]);
  playSong();
}

//Update Progress Bar & Time
function updateProgress(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //   Update progress bar
    const progresPercent = (currentTime / duration) * 100;
    progres.style.width = `${progresPercent}%`;
    durationofVideo(duration, currentTime);
  }
}
// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickx = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickx / width) * duration;
}

// Event Listner
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgress);
progresContainer.addEventListener("click", setProgressBar);
prevBtn10.addEventListener('click', ()=>{
  music.currentTime = music.currentTime - 10
})
nextBtn10.addEventListener('click', ()=>{
  music.currentTime = music.currentTime + 10
})
