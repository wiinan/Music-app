let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let artist = document.querySelector('#artista');
let total = document.querySelector('#total');
let track = document.createElement('audio');

let timer;
let autoplay = 0;
let index_no = 0;
let Playing_song = false;
let All_song = [{
    name: "Duro Igual Concreto",
    path: "musica/song1.mp3",
    img: "img/img1.jpg",
    singer: "RUSHO Remix"
}, {
    name: "777-666",
    path: "musica/song2.mp3",
    img: "img/img2.jpg",
    singer: "Slow Sense Remix"
}, {
    name: "Anos Luz",
    path: "musica/song3.mp3",
    img: "img/img3.jpg",
    singer: "Slow Sense Remix"
}, {
    name: "Rosto de Deus",
    path: "musica/song4.mp3",
    img: "img/img4.jpg",
    singer: "Remix"
}, {
    name: "Peter Pan",
    path: "musica/song5.mp3",
    img: "img/img5.jpg",
    singer: "Samantha Machado & Groove Delight"
}, {
    name: "Your Love (9Am)",
    path: "musica/song6.mp3",
    img: "img/img6.jpg",
    singer: "ATB"
}
];

function load_track(index_no) {
    clearInterval(timer);
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artista.innerHTML = All_song[index_no].singer;
    track.load();

    timer = setInterval(range_slider, 1000);
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
}

function mute_sound() {
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}
function justplay() {
    if (Playing_song == false) {
        playsong();
    } else {
        pausesong();
    }
}


function playsong() {
    track.play();
    Playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}
function pausesong() {
    track.pause();
    Playing_song = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}
function proxima_musica() {
    if (index_no < All_song.length - 1) {
        index_no += 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}
function musica_anterior() {
    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}
function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}
function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0;
        auto_play.style.background = 'rgba(255,255,255,0.2)';

    } else {
        autoplay = 1;
        auto_play.style.background = '#ff8a65';
    }
}
function range_slider() {
    if(!isNaN(track.duration)){
        position = track.currentTime*(100/track.duration);
        slider.value = position;
    }
    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if (autoplay == 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}

load_track(index_no);
