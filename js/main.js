let gNextNum = 1;
let gSelectedDifficulty = "Easy";
let gTimerStartTime = null;
let gIsTimerRunning = false;

const gDifficultyLevels = {
  Easy: 16,
  Medium: 25,
  Hard: 36,
};

const onInit = () => {
  createTable();
  printNextNum();
};

const animateResetButton = () => {
  const elRstBtn = document.querySelector(".reset-btn");
  elRstBtn.classList.add("shake");
  setTimeout(() => elRstBtn.classList.remove("shake"), 400);
};

const resetGame = () => {
  gNextNum = 1;
  createTable();
  stopTimer();
  resetTimer();
  printNextNum();
};

const onReset = () => {
  resetGame();
  animateResetButton();
};

const onChangeDifficulty = (difficulty) => {
  gSelectedDifficulty = difficulty;
  resetGame();
};

const resetTimer = () => {
  const elTimer = document.querySelector(".timer");
  elTimer.innerText = "";
};

const printNextNum = () => {
  const elNextNum = document.querySelector(".next-num");

  if (gNextNum > gDifficultyLevels[gSelectedDifficulty]) {
    elNextNum.innerText = "Done!";
    return;
  }

  elNextNum.innerText = gNextNum;
};

const createArray = (length) => Array.from({ length }, (_v, idx) => idx + 1);

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const createTable = () => {
  const tableSize = gDifficultyLevels[gSelectedDifficulty];
  const tableArray = shuffleArray(createArray(tableSize));
  const sqrtTableSize = Math.sqrt(tableSize);
  let strHtml = "";

  tableArray.forEach((num, idx) => {
    if (idx % sqrtTableSize === 0) {
      strHtml += "<tr>";
    }

    strHtml += `<td class="cell" onclick="cellClicked(${num})">${num}</td>`;

    if (idx % sqrtTableSize === sqrtTableSize - 1) {
      strHtml += "</tr>";
    }
  });

  const elTable = document.querySelector("table");
  elTable.innerHTML = strHtml;
};

const cellClicked = (clickedNum) => {
  if (clickedNum !== gNextNum) return;

  if (gNextNum === 1) {
    startTimer();
  }

  const elCell = Array.from(document.querySelectorAll(".cell")).find(
    (td) => parseInt(td.innerText) === clickedNum
  );

  elCell.classList.add("done");
  gNextNum++;
  printNextNum();

  if (gNextNum === gDifficultyLevels[gSelectedDifficulty] + 1) {
    stopTimer();
  }
};

function startTimer() {
  if (gIsTimerRunning) return;

  gIsTimerRunning = true;
  gTimerStartTime = Date.now();
  tick();
}

function tick() {
  if (!gIsTimerRunning) return;

  const elTimer = document.querySelector(".timer");
  const elapsedTime = Date.now() - gTimerStartTime;
  const seconds = Math.floor(elapsedTime / 1000);
  const milliseconds = elapsedTime % 1000;

  elTimer.innerText = `${seconds}.${milliseconds.toString().padStart(3, "0")}`;

  requestAnimationFrame(tick);
}

const stopTimer = () => {
  gIsTimerRunning = false;
};
