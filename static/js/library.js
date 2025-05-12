console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songName: "Blinding Lights-TheWeeknd", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/4.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Blinding Lights - The Weeknd.jpg" },
    { songName: "Call Out My Name-TheWeeknd", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/5.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Call Out My Name - The Weeknd.jpg" },
    { songName: "Die For You-TheWeeknd", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/28.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Die For You-TheWeeknd.jpg" },
    { songName: "Starboy - The Weeknd", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/63.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Starboy - The Weeknd.jpg" },

    { songName: "Afsanay-Young Stunners", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/11.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Afsanay-Young Stunners.jpg" },
    { songName: "Agency-Young Stunners", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/12.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Agency-Young Stunners.jpg" },
    { songName: "Asli Hai-Young Stunners", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/17.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Asli Hai-Young Stunners.jpg" },
    { songName: "Don't Mind-Young Stunners", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/31.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Don't Mind-Young Stunners.jpg" },

    { songName: "Ajab Si(Om SHanti Om)-K.K", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/13.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Ajab Si-K.K.jpg" },
    { songName: "Kya Mujhe Pyar Hai-K.K", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/43.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Kya Mujhe Pyar Hai -K.K.jpg" },
    { songName: "Labon Ko(Bhool Bhulaiya) -KK", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/44.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Labon Ko-KK.jpg" },
    { songName: "Sach Keh Raha Hai-KK", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/60.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Sach Keh Raha Hai-KK.jpg" },

    { songName: "AisayKaisay-Hasan Raheem", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/1.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Aisay Kaisay - Hasan Raheem.jpg" },
    { songName: "JOONA-Hasan Raheem", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/9.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/JOONA -Hasan Raheem.jpg" },
    { songName: "Piche Hut - Hassan Raheem", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/58.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Piche Hut - Hassan Raheem.jpg" },

    { songName: "Attention-Charlie Puth", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/2.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Attention - Charlie Puth.jpg" },
    { songName: "We Don't Talk-Charlie Puth", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/68.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/We Don't Talk Anymore - Charlie Puth.jpg" },
    { songName: "Light Switch-Charlie Puth", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/10.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Light Switch -Charlie Puth.jpg" },

    { songName: "Blow Your Mind-Dua Lipa", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/21.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Blow Your Mind-Dua Lipa.jpg" },
    { songName: "Levitating-Dua Lipa", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/45.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Levitating-Dua Lipa.jpg" },
    { songName: "No Lie -Dua Lipa,Sean Paul", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/55.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/No Lie-Dua Lipa.jpg" },

    { songName: "Bad Guy-Billie Eilish", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/19.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Bad Guy-Billie Eilish.jpg" },
    { songName: "Bellyache-Billie Eilish", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/20.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Bellyache-Billie Eilish.jpg" },
    { songName: "Lovely - Billie Eilish,Khalid", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/48.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Lovely-Billie Eilish.jpg" },

    { songName: "Closer-The Chainsmokers", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/24.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Closer-The Chainsmokers.jpg" },
    { songName: "Takeaway-The Chainsmokers", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/65.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Takeaway-The Chainsmokers.jpg" },
    { songName: "Dont Let Me Down-Chainsmokers", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/30.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Don't Let Me Down-The Chainsmokers.jpg" },

    { songName: "Cake By The Ocean-DNCE", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/23.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Cake By The Ocean-DNCE.jpg" },
    { songName: "Dancing Feet-DNCE", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/26.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Dancing Feet-DNCE.jpg" },

    { songName: "Hymn For - Coldplay", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/39.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Hymn For The Weekend-Coldplay.jpg" },
    { songName: "My Universe-Coldplay", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/53.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/My Universe-Coldplay.jpg" },

    { songName: "In the Dark - Swae Lee", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/40.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/In the Dark-Swae Lee.jpg" },
    { songName: "Sunflower-Swae Lee", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/64.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Sunflower-Swae Lee.jpg" },

    { songName: "Let Me Kiss You - 1D", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/42.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Kiss You-1D.jpg" },
    { songName: "What Makes You Beautiful-1D", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/70.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/What Makes You Beautiful-1D.jpg" },

    { songName: "Lucid Dreams-Juice WRLD", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/50.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Lucid Dreams-Juice WRLD.jpg" },
    { songName: "Smile - Juice WRLD", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/61.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Smile-Juice WRLD.jpg" },

    { songName: "Sorry - Justin Bieber", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/62.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Sorry-Justin Bieber.jpg" },
    { songName: "Do You Mean-Justin Bieber", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/69.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/What Do You Mean-Justin Bieber.jpg" },

    { songName: "Copines-Aya Nakamura", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/25.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Copines-Aya Nakamura.jpg" },
    { songName: "Djadja-Aya Nakamura", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/29.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Djadja-Aya Nakamura.jpg" },

    { songName: "Bikhra-Abdul Hannan", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/3.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Bikhra - Abdul Hannan.jpg" },
    { songName: "Harleys In Hawaii-Katy Perry", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/6.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Harleys In Hawaii - Katy Perry.jpg" },
    { songName: "Heat Waves-Glass Animals", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/7.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Heat Waves - Glass Animals.jpg" },
    { songName: "Hope-XXXTENTACION", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/8.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Hope -XXXTENTACION.jpg" },   
    { songName: "Akhiyaan - Mitraz", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/14.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Akhiyaan - Mitraz.jpg" },
    { songName: "Anjaan - Jani,Talha Yonus", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/15.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Anjaan-Jani.jpg" },
    { songName: "Ashes(2020) - Stellar", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/16.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Ashes-Stellar.jpg" },
    { songName: "Back To The Future-Bastille", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/18.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Back To The Future-Bastille.jpg" },  
    { songName: "Burning Down - EYK", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/22.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Burning Down-Everyone You Know.jpg" },       
    { songName: "Desire-Years & Years", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/27.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Desire-Years & Years.jpg" },
    { songName: "El Melouk-Ahmed Saad", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/32.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/El Melouk-Ahmed Saad.jpg" },
    { songName: "Excuses-Ap Dhillon", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/33.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Excuses-Ap Dhillon.jpg" },
    { songName: "Formula - Labrinth", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/34.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Formula-Labrinth.jpg" },
    { songName: "Goosebumps-Travis Scott", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/35.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Goosebumps-Travis Scott.jpg" },
    { songName: "Head First-Christian French", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/36.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Head First-Christian French.jpg" },
    { songName: "Heartburn(Remix) - Wafia", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/37.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Heartburn-Wafia.jpg" },
    { songName: "Honeypie - JAWNY", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/38.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Honeypie-JAWNY.jpg" },    
    { songName: "Kana Yaari Kaifi Khalil", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/41.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Kana Yaari Kaifi Khalil.jpg" },
    { songName: "Lights Down Low-MAX", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/46.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Lights Down Low-MAX.jpg" },
    { songName: "Love Nwantiti-CKay", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/47.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Love Nwantiti-CKay.jpg" },
    { songName: "Michael Jackson-Lovin You", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/49.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Loving You-Michael Jackson.jpg" },
    { songName: "Maikada - M. Samie", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/51.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Maikada-Muhammad Samie.jpg" },
    { songName: "Mushk OST-Ali Zafar", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/52.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Mushk OST-Ali Zafar.jpg" },
    { songName: "Mystery of Love-Sufjan Stevens", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/54.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Mystery of Love-Sufjan Stevens.jpg" },
    { songName: "Passive-The Perfect Circle", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/56.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Passive-The Perfect Circle.jpg" },
    { songName: "Peaky Blinder-Otnicka", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/57.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Peaky Blinder-Otnicka.jpg" },
    { songName: "The Hot Stepper-Ini Kamoze", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/66.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/The Hot Stepper-Ini Kamoze.jpg" },
    { songName: "Vibe(2021) -Herman", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/67.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Vibe-Herman.jpg" },
    { songName: "World Is Mine-Samm Henshaw", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/71.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/World Is Mine-Samm Henshaw.jpg" },
    { songName: "Без тебя я не я-JONY", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/72.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Без тебя я не я-JONY.jpg" },
    { songName: "Right Round - Flo Rida", filePath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/59.mp3", coverPath: "/mnt/Personal/College/Major Project/Spotify-Clone-main/covers/Right Round - Flo Rida.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    ProgressBar.value = progress;
})

ProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 71) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `/mnt/Personal/College/Major Project/Spotify-Clone-main/songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})