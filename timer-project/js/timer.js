let initialMinutes = 25;
let minutes = initialMinutes;
let seconds = 0;
let isRunning = false;
let intervalId;
let modeSelected = false;
let currentMode = "";

let pomodoroTimerElement = document.getElementById("pomodoro-timer");
let shortBreakElemt = document.getElementById("short-break");
let longBreakElement = document.getElementById("long-break");
let startButtonElement = document.getElementById("btn-start");
let pauseButtonElement = document.getElementById("btn-pause");
let resetButtonElement = document.getElementById("btn-reset");

let showExerciseElement = document.getElementById("show-exercise-name");

pomodoroTimerElement.addEventListener("click", function () {
  currentMode = "pomodoro-timer";
  setTimer(25);
});

shortBreakElemt.addEventListener("click", function () {
  currentMode = "short-break";
  setTimer(5);
});

longBreakElement.addEventListener("click", function () {
  currentMode = "long-break";
  setTimer(15);
});

startButtonElement.addEventListener("click", startTimer);
pauseButtonElement.addEventListener("click", pauseTimer);
resetButtonElement.addEventListener("click", resetTimer);

function setTimer(newMinutes) {
  if (!isRunning) {
    minutes = newMinutes;
    initialMinutes = newMinutes;
    modeSelected = true;
    updateDisplay();
  }
}

function startTimer() {
  if (modeSelected && !isRunning) {
    if (currentMode === "short-break" || currentMode == "long-break") {
      showExerciseName();
    }
    intervalId = setInterval(updateTimer, 1000);
    isRunning = true;
  } else {
    alert("Please select a timer before starting.");
  }
}

function pauseTimer() {
  clearInterval(intervalId);
  isRunning = false;
}

function resetTimer() {
  clearInterval(intervalId);
  isRunning = false;
  minutes = initialMinutes;
  seconds = 0;
  updateDisplay();
  showExerciseElement.innerText = "";
}

function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(intervalId);
      isRunning = false;
      if (currentMode !== "pomodoro-timer") {
        resetTimer();
        currentExercise++;       
      } else {
        alert("Pomodoro timer completed");
        resetTimer();
      }
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("minutes")
    .innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds")
    .innerText = seconds < 10 ? "0" + seconds : seconds;
}