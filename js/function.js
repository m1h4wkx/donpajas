// Bloqueo de dominios permitidos
const allowedHosts = ["descuidadas.lat", "localhost", ]; // agrega tu dominio luego
if (!allowedHosts.includes(location.hostname)) {
    document.body.innerHTML = "<h2>⚠️ Sitio no autorizado</h2>";
    throw new Error("Dominio no autorizado");
}

// Elementos del DOM
const video = document.getElementById('myVideo');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const muteButton = document.getElementById('muteButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const progressBar = document.getElementById('progressBar');
const progressBarContainer = document.querySelector('.progress-bar-container');

// Contador falso de visitas
const visitorCounter = document.getElementById('_wauvcq');
let currentVisitors = Math.floor(Math.random() * 500) + 100;
visitorCounter.textContent = currentVisitors;
setInterval(() => {
    currentVisitors += Math.floor(Math.random() * 5) - 2;
    if (currentVisitors < 100) currentVisitors = 100;
    visitorCounter.textContent = currentVisitors;
}, 5000);

// URL CPA
const cpaUrl = "https://href.li/?http://acort.link/3RIMSphH";

// Control cooldown botones
let cpaTimers = { play: false, pause: false, mute: false, fullscreen: false };
function openCPAWithCooldown(buttonKey, callback) {
    if (!cpaTimers[buttonKey]) {
        window.open(cpaUrl, "_blank");
        cpaTimers[buttonKey] = true;
        setTimeout(() => { cpaTimers[buttonKey] = false; }, 20000);
    }
    callback();
}

// --- Botones ---
playButton.addEventListener('click', () => openCPAWithCooldown('play', () => video.play()));
pauseButton.addEventListener('click', () => openCPAWithCooldown('pause', () => video.pause()));
muteButton.addEventListener('click', () => openCPAWithCooldown('mute', () => {
    video.muted = !video.muted;
    if(video.muted) { muteButton.innerHTML = '<i class="fas fa-volume-mute"></i> Desactivar Silencio'; volumeSlider.value=0; volumeIcon.className='fas fa-volume-mute'; } 
    else { muteButton.innerHTML = '<i class="fas fa-volume-up"></i> Silenciar'; if(volumeSlider.value==0){volumeSlider.value=0.5; video.volume=0.5;} updateVolumeIcon(video.volume); }
}));
fullscreenButton.addEventListener('click', () => openCPAWithCooldown('fullscreen', () => {
    if(video.requestFullscreen) video.requestFullscreen();
    else if(video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if(video.msRequestFullscreen) video.msRequestFullscreen();
    else alert("Tu navegador no soporta pantalla completa.");
}));

function updateVolumeIcon(volume){
    if(volume===0) volumeIcon.className='fas fa-volume-off';
    else if(volume<0.5) volumeIcon.className='fas fa-volume-down';
    else volumeIcon.className='fas fa-volume-up';
}

// Volumen
volumeSlider.addEventListener('input', () => { video.volume=volumeSlider.value; video.muted=(volumeSlider.value==0); updateVolumeIcon(video.volume); });
video.addEventListener('volumechange', () => { volumeSlider.value=video.volume; updateVolumeIcon(video.volume); });

// Barra progreso
video.addEventListener('timeupdate', ()=>{ if(!isNaN(video.duration)){ progressBar.style.width=(video.currentTime/video.duration)*100 + '%'; } });
progressBarContainer.addEventListener('click',(e)=>{ const rect=progressBarContainer.getBoundingClientRect(); const clickX=e.clientX-rect.left; video.currentTime=(clickX/rect.width)*video.duration; });

// Inicialización
video.load(); video.pause(); updateVolumeIcon(video.volume);

// Bloqueo botón derecho
document.addEventListener('contextmenu', e=>{ e.preventDefault(); alert("⚠️ ¡Botón derecho deshabilitado!"); });

// Bloqueo pulsación larga móvil
let touchDuration;
document.addEventListener('touchstart', e=>{ touchDuration=setTimeout(()=>{ e.preventDefault(); alert("⚠️ Mantener pulsado deshabilitado"); }, 500); }, {passive:false});
document.addEventListener('touchend', ()=>{ clearTimeout(touchDuration); });
