//initialize Variable
let songIndex = 0;
let audioElement = new Audio("1.mp3/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
console.log(songItems);
let masterSongName = document.getElementById("masterSongName");

let songs = [
  { songName: "Calm Down-Selena Gomez", filePath: "1.mp3/1.mp3", coverPath: "cover/1.jpeg" },
  {
    songName: "Navanti-Love by C-kay",
    filePath: "1.mp3/2.mp3",
    coverPath: "cover/2.jpeg",
  },
  { songName: "Perfect by Ed Sheeran", filePath: "1.mp3/3.mp3", coverPath: "cover/3.jpg" },
  {
    songName: "Lovely by Billie Eilish",
    filePath: "1.mp3/4.mp3",
    coverPath: "cover/4.jpeg",
  },
  { songName: "Kahani Suno by kaifi Khalil", filePath: "1.mp3/5.mp3", coverPath: "cover/5.jpeg" },
  {
    songName: "Khayal by Talwinder",
    filePath: "1.mp3/6.mp3",
    coverPath: "cover/6.jpeg",
  },
];

songItems.map((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//handle play/pause click

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //update seekbar

  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// make all plays

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).map(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};



Array.from(document.getElementsByClassName("songItemPlay")).map(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = Number(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `1.mp3/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

// previous and next song

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 0;
  } else {
    songIndex = songIndex +  1;
  }
  audioElement.src = `1.mp3/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `1.mp3/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
