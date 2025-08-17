// Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour12: false });
  const date = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  document.getElementById('current-time').textContent = time;
  document.getElementById('current-date').textContent = date;
}
setInterval(updateClock, 1000);
updateClock();

// Stopwatch
let startTime, interval, running = false, elapsed = 0;
const clickSound = document.getElementById('click-sound');

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function startStopwatch() {
  if (!running) {
    playSound();
    startTime = Date.now() - elapsed;
    interval = setInterval(updateStopwatch, 10);
    running = true;
  }
}

function stopStopwatch() {
  if (running) {
    playSound();
    clearInterval(interval);
    running = false;
  }
}

function resetStopwatch() {
  playSound();
  clearInterval(interval);
  elapsed = 0;
  running = false;
  document.querySelector(".main-time").textContent = "00:00:00";
  document.querySelector(".ms-time").textContent = ".000";
  document.getElementById("laps").innerHTML = '';
}

function updateStopwatch() {
  elapsed = Date.now() - startTime;
  const ms = elapsed % 1000;
  const totalSeconds = Math.floor(elapsed / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  document.querySelector(".main-time").textContent =
    `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.querySelector(".ms-time").textContent = `.${String(ms).padStart(3, "0")}`;
}

function recordLap() {
  if (running) {
    playSound();
    const lap = document.createElement("li");
    const current = document.querySelector(".main-time").textContent + document.querySelector(".ms-time").textContent;
    lap.textContent = "Lap: " + current;
    document.getElementById("laps").appendChild(lap);
  }
}
