let startTime = 0;
let elapsedTime = 0;
let timerInterval;


function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}


function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  document.getElementById("timer").textContent = formatTime(elapsedTime);
}


document.getElementById("startButton").addEventListener("click", () => {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10); 
  }
});


document.getElementById("stopButton").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});


document.getElementById("resetButton").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  document.getElementById("timer").textContent = "00:00:00";
});