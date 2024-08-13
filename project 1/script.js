console.log("Welcome to Sound Cloud");

// Initializing the variables
let songIndex = 0;
let songs = [
    { songName: "410", filepath: "musics/410.mp3", coversPath: "covers/410.jpg" },
    { songName: "drippy", filepath: "musics/drippy.mp3", coversPath: "covers/drippy.jpg" },
    { songName: "deathroute", filepath: "musics/deathroute.mp3", coversPath: "covers/deathroute.jpg" },
    { songName: "dilemma", filepath: "musics/dilemma.mp3", coversPath: "covers/dilemma.jpg" },
    { songName: "GOAT", filepath: "musics/goat.mp3", coversPath: "covers/goat.jpg" }
];

let audioElement = new Audio(songs[songIndex].filepath); 
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar'); 
let gif = document.querySelector('.songInfo img');
let backwardButton = document.querySelector('.fa-step-backward');
let forwardButton = document.querySelector('.fa-step-forward');

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        gif.style.opacity = 1; // Show GIF
    } else {
        audioElement.pause();
        gif.style.opacity = 0; // Hide GIF
    }
    masterPlay.classList.toggle('fa-play-circle');
    masterPlay.classList.toggle('fa-pause-circle');
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Update the audio currentTime when seekbar is changed
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Handle song item play
document.querySelectorAll('.songItem').forEach((element, index) => {
    element.addEventListener('click', () => {
        songIndex = index;
        audioElement.src = songs[songIndex].filepath;
        audioElement.play();
        gif.style.opacity = 1; // Show GIF
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Forward and backward button functionality
const skipTime = 10; // Seconds to skip forward/backward

backwardButton.addEventListener('click', () => {
    audioElement.currentTime -= skipTime;
    if (audioElement.currentTime < 0) {
        audioElement.currentTime = 0;
    }
});

forwardButton.addEventListener('click', () => {
    audioElement.currentTime += skipTime;
    if (audioElement.currentTime > audioElement.duration) {
        audioElement.currentTime = audioElement.duration;
    }
});
