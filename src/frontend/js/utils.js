import video from '../assets/videos/los_bingueros.mp4';
import audio from '../assets/audios/Bingo Sound Effect.mp3';
import {changeLang} from './core'

/**
* It's a function that when any player win the bingo  there is a background audio that sings bingo!!
* This function I'll  imported it into index and called it in  pubSub.subscribe("BINGO")
*/
export function setupAudioBingoWin() {
    let audioBackground = `
        <div id="sound" style="width: 0;overflow:hidden">
            <audio controls autoplay loop id="bingoSound">
                  <source src="${audio}" type="audio/mpeg">
             </audio>
        </div>
        `;
    let parser = new DOMParser();
    let bingoAudio = parser.parseFromString(audioBackground, "text/html");

    bingoAudio = bingoAudio.body.firstChild;
    bingoAudio.currentTime = Math.round(Math.random() * 10);
    document.getElementById('gameLayout').appendChild(bingoAudio);
}

/**
 * Set the backgroundVideo 
 */
export function setupBackgroundVideo() {
    let backgroundVideo = `
        <div id="div_bg" class="bg">
            <video autoplay muted loop id="videoBackground">
                <source src="${video}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            <i class="fas fa-video-slash btn--removebg" id="remove_video"></i>
            <i class="fas fa-volume-mute btn--mute off--red" id="unmuteBtn"></i>
        </div>`;
    let parser = new DOMParser();
    let videoEl = parser.parseFromString(backgroundVideo, "text/html");
    videoEl.currentTime += Math.round(Math.random()*400);
    videoEl = videoEl.body.firstChild;
    document.body.appendChild(videoEl);
    
    let remove_video = document.getElementById('remove_video');

    //We get the video
    let VideoOnly = document.getElementById('videoBackground');

    //We add the atribute preload with metadata
    VideoOnly.preload = 'metadata';
    
    //When loading the metadata we obtain the maximum duration of the video and we do a random math between 0 and that value
    VideoOnly.onloadedmetadata = function() {
        VideoOnly.currentTime = Math.round(Math.random()*VideoOnly.duration);
    }
    
    /**
     * Mute and unmute the background video button
     */

    let unmuteBtn = document.getElementById('unmuteBtn');
    let videoDOM = document.getElementById('videoBackground');
    unmuteBtn.onclick = function () {
        videoDOM.muted = !videoDOM.muted;
        this.className = (videoDOM.muted == true) ? "fas fa-volume-mute btn--mute off--red" : "fas fa-volume-off btn--mute"
    }

    /**
     * Remove / show video background
     */

    remove_video.onclick = function () {
        if (this.classList.contains('off--red')) {
            this.className = "fas fa-video-slash btn--removebg"
            videoDOM.style.display = "block";
        } else {
            this.className = "fas fa-video-slash btn--removebg off--red"
            videoDOM.style.display = "none";
        }
    }
    setupBackgroundVideo.remove = () => document.getElementById('div_bg').remove();
}

export function setupLanguage(){
    let langOptions = `
        <div class="lang-div">
            <select name="Language" id="lang" class="lang-select">
                <option value="en" id="btn-en" data-tr="English">English</option>
                <option value="es" id="btn-es" data-tr="Spanish">Spanish</option>
            </select>
        </div>`;
    let parser = new DOMParser();
    let langEl = parser.parseFromString(langOptions, "text/html");
    langEl = langEl.body.firstChild;
    document.body.appendChild(langEl);
    document.getElementById('lang').addEventListener('change', function() { changeLang(this.value) });
}

//CHECK NAME FUNCTION
export let checkName = (name) => {
    let regEx = /[aA1-zZ9]/;
    if (regEx.test(name)) {
        return true;
    } else {
        return false;
    }
}