console.log("Welcome to HF Music");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongCover = document.getElementById('masterSongCover'); // New element for song cover image
let searchInput = document.getElementById('searchInput');
let songItemContainer = document.getElementById('songItemContainer');

let songs = [
    { id: 0, songName: "Let Me Love You", duration: "05:34", image: "covers/1.jpg", filePath: "songs/1.mp3" },
    { id: 1, songName: "Warriyo - Mortals [NCS Release]", duration: "03:50", image: "covers/2.jpg", filePath: "songs/2.mp3" },
    { id: 2, songName: "Fearless - Lost Sky [NCS Release]", duration: "04:30", image: "covers/3.jpg", filePath: "songs/3.mp3" },
    // Add more songs as needed
];

// Display songs in the container
songs.forEach((song) => {
    songItemContainer.innerHTML += `
    <div class="songItem" data-id="${song.id}" data-songname="${song.songName}">
        <img src="${song.image}" alt="${song.songName}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay">
            <span class="timestamp">${song.duration} <i id="${song.id}" class="far songItemPlay fa-play-circle"></i></span>
        </span>
    </div>`;
});

// Handle song play/pause
function playSong(song) {
    audioElement.src = song.filePath;
    masterSongName.innerText = song.songName;
    masterSongCover.src = song.image; // Update the cover image
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

function pauseSong() {
    audioElement.pause();
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
}

function makeAllPlays() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

// Play/pause event listener
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songs[songIndex]);
    } else {
        pauseSong();
    }
});

// Handle song item click
songItemContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-play-circle')) {
        const songId = parseInt(e.target.id);
        const selectedSong = songs.find(song => song.id === songId);
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex = songId;
        playSong(selectedSong);
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSong(songs[songIndex]);
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    playSong(songs[songIndex]);
});

// Search functionality
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    document.querySelectorAll('.songItem').forEach((item) => {
        const songName = item.querySelector('.songName').innerText.toLowerCase();
        if (songName.includes(searchValue)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
});

// Handle song item click from search results
document.getElementById('songItemContainer').addEventListener('click', (e) => {
    if (e.target.classList.contains('songItemPlay')) {
        let songId = parseInt(e.target.id);
        audioElement.src = songs[songId].filePath;
        masterSongName.innerText = songs[songId].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
});

