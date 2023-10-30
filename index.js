const songs = [
  [
    "./folder/audio/rolling_stones_anybody_see_my_baby.mp3",
    "url(./folder/images/rolling_stones.jpg)",
    "rolling stones",
    "anybody seen my baby",
    "4:31",
  ],
  [
    "./folder/audio/john_lennon_imagine.mp3",
    "url(./folder/images/john_lennon.jpg)",
    "john lennon",
    "imagine",
    "3:04",
  ],
  [
    "./folder/audio/queen_breakthru.mp3",
    "url(./folder/images/queen.jpg)",
    "queen",
    "breakthru",
    "4:09",
  ],
  [
    "./folder/audio/led_zeppelin_kashmir.mp3",
    "url(./folder/images/ledzeppelin.jpg)",
    "led zeppelin",
    "kashmir",
    "8:37",
  ],
  [
    "./folder/audio/kiss_i_was_made_for_loving_you.mp3",
    "url(./folder/images/kiss.jpg)",
    "kiss",
    "i was made for loving you",
    "4:28",
  ],
  [
    "./folder/audio/beach_house_space_song.mp3",
    "url(./folder/images/space.jpg)",
    "beach house",
    "space song",
    "5:20",
  ],
];

const playPauseBtn = document.querySelector(".play-icon");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const imageBox = document.querySelector(".images");
const singer = document.querySelector(".singer");
const song = document.querySelector(".song");
const audio = document.querySelector("#audio");
const recordDuration = document.querySelector(".song-duration");
const recordSong = document.querySelector(".record");
const recordProgress = document.querySelector(".record-progress");
const currentSongTime = document.querySelector(".current-song-time");
let count = 0;

showPlayer();

function playPauseSong() {
  if (!playPauseBtn.classList.contains("pause")) {
    audio.pause();
  } else {
    audio.play();
  }
}

function showPlayer() {
  const picture = songs[count][1];
  document.body.style.backgroundImage = `${picture}`;
  imageBox.style.backgroundImage = `${picture}`;
  singer.innerHTML = `${songs[count][2]}`;
  song.innerHTML = `${songs[count][3]}`;
  audio.src = `${songs[count][0]}`;
  recordDuration.innerHTML = `${songs[count][4]}`;
  recordProgress.style.width = "0";
}

playPauseBtn.addEventListener("click", () => {
  playPauseBtn.classList.toggle("pause");
  imageBox.classList.toggle("image-scale");
  playPauseSong();
});

function playNextSong() {
  count += 1;

  if (count < songs.length) {
    showPlayer();
  }

  if (count === songs.length) {
    count = 0;
    showPlayer();
  }
  playPauseSong();
}

function playPrevSong() {
  if (count === 0) {
    count = songs.length - 1;
    showPlayer();
  } else {
    count--;
    showPlayer();
  }
  playPauseSong();
}

nextBtn.addEventListener("click", playNextSong);

prevBtn.addEventListener("click", playPrevSong);

const songMinute = document.querySelector("#song-minute");
const songSecond = document.querySelector("#song-second");

function updateSongsProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  recordProgress.style.width = `${progressPercent}%`;

  songSecond.innerHTML = `${String(Math.round(audio.currentTime) % 60).padStart(
    2,
    "0"
  )}`;
  songMinute.innerHTML = `${Math.floor(Math.round(audio.currentTime) / 60)}`;
}

function setSongsProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener("timeupdate", updateSongsProgress);
recordSong.addEventListener("click", setSongsProgress);
audio.addEventListener("ended", playNextSong);

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    playNextSong();
  }

  if (e.code === "ArrowLeft") {
    playPrevSong();
  }

  if (e.code === "Space") {
    playPauseBtn.classList.toggle("pause");
    imageBox.classList.toggle("image-scale");
    playPauseSong();
  }
});

console.log("Вёрстка +10\n",
"Кнопка Play/Pause +10\n",
"При кликах по кнопкам Вперёд и Назад переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n",
"При смене аудиотрека меняется изображение - обложка аудиотрека +10\n",
"Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n",
"Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n",
"Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения:\n-аудиоплеер реагирует при нажатии кнопки Space на клавиатуре(play/stop), стрелки вправо, влево(переключение песни), добавлен фавикон +10\n"
)








