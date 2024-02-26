let strikeButton = document.getElementById("strike");
let resetButton = document.getElementById("reset");
let scoreTeam1 = document.getElementById("score-team1");
let wicketsTeam1 = document.getElementById("wickets-team1");
let scoreTeam2 = document.getElementById("score-team2");
let wicketsTeam2 = document.getElementById("wickets-team2");

let team1Score = 0;
let team1Wickets = 0;
let team2Score = 0;
let team2Wickets = 0;
let team1BallsFaced = 0;
let team2BallsFaced = 0;

let turn = 1;

let possibleOutcomes = [0,1,2,3,4,6,"W"];

function updateScore() {
    scoreTeam1.textContent = team1Score;
    wicketsTeam1.textContent = team1Wickets;
    scoreTeam2.textContent = team2Score;
    wicketsTeam2.textContent = team2Wickets;
}

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

function gameOver() {
  gameOverAudio.play();
  if (team1Score > team2Score) alert("Team one wins");
  if (team2Score > team1Score) alert("Team two wins");
  if (team2Score === team1Score) alert("It is a draw");
}

resetButton.onclick = () => {
  window.location.reload();
};

strikeButton.onclick = () => {
  strikeAudio.pause();
  strikeAudio.currentTime = 0;
  strikeAudio.play();

  const randomElement =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

  if (turn === 2) {
    team2BallsFaced++;
    document.querySelector(
      `#team2-superover div:nth-child(${team2BallsFaced})`
    ).textContent = randomElement;
    if (randomElement === "W") {
      team2Wickets++;
    }
    else {
      team2Score += randomElement;
    }
    if (
      team2BallsFaced === 6 ||
      team2Wickets === 2 ||
      team2Score > team1Score
    ) {
      turn = 3;
      gameOver();
    }
  }

  if (turn === 1) {
    team1BallsFaced++;
    document.querySelector(
      `#team1-superover div:nth-child(${team1BallsFaced})`
    ).textContent = randomElement;
    if (randomElement === "W") {
      team1Wickets++;
    } else {
      team1Score += randomElement;
    }
    if (team1BallsFaced === 6 || team1Wickets === 2) turn = 2;
  }
  updateScore();
};