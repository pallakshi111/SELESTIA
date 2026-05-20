const gameTabs = document.querySelectorAll(".game-tab");
const gamePanels = document.querySelectorAll(".game-panel");

gameTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const game = tab.dataset.game;

    gameTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    gamePanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === game));
  });
});

const xpText = document.querySelector("#xpText");
const xpFill = document.querySelector("#xpFill");
const winsText = document.querySelector("#winsText");
let playerXP = Number(localStorage.getItem("selestiaXP")) || 0;
let playerWins = Number(localStorage.getItem("selestiaWins")) || 0;

const updateXP = () => {
  const level = Math.floor(playerXP / 100) + 1;
  const levelXP = playerXP % 100;
  xpText.textContent = `Level ${level} - XP ${levelXP} / 100`;
  xpFill.style.width = `${levelXP}%`;
  winsText.textContent = playerWins;
  localStorage.setItem("selestiaXP", String(playerXP));
  localStorage.setItem("selestiaWins", String(playerWins));
};

const awardXP = (amount, gameName) => {
  playerXP += amount;
  playerWins += 1;
  updateXP();
  return ` +${amount} XP for winning ${gameName}.`;
};

updateXP();

const ticTacToeBoard = document.querySelector("#ticTacToeBoard");
const ticTacToeStatus = document.querySelector("#ticTacToeStatus");
const resetTicTacToe = document.querySelector("#resetTicTacToe");
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let ticState = Array(9).fill("");
let ticLocked = false;

const renderTicTacToe = () => {
  ticTacToeBoard.innerHTML = "";

  ticState.forEach((value, index) => {
    const cell = document.createElement("button");
    cell.className = "tic-cell";
    cell.type = "button";
    cell.textContent = value;
    cell.setAttribute("aria-label", `Cell ${index + 1}`);
    cell.addEventListener("click", () => playTicTacToe(index));
    ticTacToeBoard.append(cell);
  });
};

const getTicWinner = (mark) => winningLines.find((line) => line.every((index) => ticState[index] === mark));

const finishTicMove = (mark) => {
  if (getTicWinner(mark)) {
    ticTacToeStatus.textContent =
      mark === "X" ? `You win Tic Tac Toe.${awardXP(40, "Tic Tac Toe")}` : "Computer wins this round.";
    ticLocked = true;
    return true;
  }

  if (ticState.every(Boolean)) {
    ticTacToeStatus.textContent = "Draw. The galaxy is balanced.";
    ticLocked = true;
    return true;
  }

  return false;
};

const chooseComputerMove = () => {
  const emptyIndexes = ticState.map((value, index) => (value ? null : index)).filter((value) => value !== null);

  for (const mark of ["O", "X"]) {
    for (const index of emptyIndexes) {
      const testState = [...ticState];
      testState[index] = mark;
      if (winningLines.some((line) => line.every((position) => testState[position] === mark))) {
        return index;
      }
    }
  }

  if (emptyIndexes.includes(4)) return 4;
  return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
};

const playComputerTicTacToe = () => {
  if (ticLocked) return;

  const move = chooseComputerMove();
  if (move === undefined) return;

  ticState[move] = "O";
  finishTicMove("O");
  if (!ticLocked) {
    ticTacToeStatus.textContent = "Your turn.";
  }
  renderTicTacToe();
};

const playTicTacToe = (index) => {
  if (ticState[index] || ticLocked) return;

  ticState[index] = "X";
  finishTicMove("X");
  renderTicTacToe();

  if (!ticLocked) {
    ticTacToeStatus.textContent = "Computer is thinking...";
    setTimeout(playComputerTicTacToe, 450);
  }
};

const resetTicTacToeGame = () => {
  ticState = Array(9).fill("");
  ticLocked = false;
  ticTacToeStatus.textContent = "You are X. Computer is O.";
  renderTicTacToe();
};

resetTicTacToe.addEventListener("click", resetTicTacToeGame);
resetTicTacToeGame();

const ludoTrack = document.querySelector("#ludoTrack");
const ludoStatus = document.querySelector("#ludoStatus");
const ludoDice = document.querySelector("#ludoDice");
const rollLudo = document.querySelector("#rollLudo");
const resetLudo = document.querySelector("#resetLudo");
let ludoPositions = [0, 0];
let ludoDone = false;

const renderLudo = () => {
  ludoTrack.innerHTML = "";

  for (let tile = 1; tile <= 30; tile += 1) {
    const square = document.createElement("div");
    square.className = "race-tile";

    ludoPositions.forEach((position, index) => {
      if (position === tile) {
        const token = document.createElement("span");
        token.className = `race-token ${index === 0 ? "player-one" : "player-two"}`;
        square.append(token);
      }
    });

    ludoTrack.append(square);
  }
};

const resetLudoGame = () => {
  ludoPositions = [0, 0];
  ludoDone = false;
  rollLudo.disabled = false;
  ludoDice.textContent = "-";
  ludoStatus.textContent = "You roll first. First racer to 30 wins.";
  renderLudo();
};

const moveLudoPlayer = (playerIndex, roll) => {
  ludoPositions[playerIndex] = Math.min(30, ludoPositions[playerIndex] + roll);
  renderLudo();

  if (ludoPositions[playerIndex] === 30) {
    ludoDone = true;
    rollLudo.disabled = true;
    ludoStatus.textContent =
      playerIndex === 0 ? `You win Mini Ludo.${awardXP(45, "Mini Ludo")}` : "Computer wins Mini Ludo.";
  }
};

const computerLudoTurn = () => {
  if (ludoDone) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  ludoDice.textContent = roll;
  moveLudoPlayer(1, roll);

  if (!ludoDone) {
    ludoStatus.textContent = `Computer rolled ${roll}. Your turn.`;
    rollLudo.disabled = false;
  }
};

rollLudo.addEventListener("click", () => {
  if (ludoDone) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  ludoDice.textContent = roll;
  rollLudo.disabled = true;
  moveLudoPlayer(0, roll);

  if (!ludoDone) {
    ludoStatus.textContent = `You rolled ${roll}. Computer is rolling...`;
    setTimeout(computerLudoTurn, 650);
  }
});

resetLudo.addEventListener("click", resetLudoGame);
resetLudoGame();

const snakeLadderBoard = document.querySelector("#snakeLadderBoard");
const snakeLadderStatus = document.querySelector("#snakeLadderStatus");
const snakeLadderDice = document.querySelector("#snakeLadderDice");
const rollSnakeLadder = document.querySelector("#rollSnakeLadder");
const resetSnakeLadder = document.querySelector("#resetSnakeLadder");
const jumps = {
  3: 14,
  8: 18,
  15: 26,
  21: 32,
  17: 6,
  24: 12,
  34: 22,
};
let snakeLadderPosition = 1;
let computerSnakeLadderPosition = 1;
let snakeLadderDone = false;

const renderSnakeLadder = () => {
  snakeLadderBoard.innerHTML = "";

  for (let tile = 36; tile >= 1; tile -= 1) {
    const square = document.createElement("div");
    square.className = `ladder-cell ${jumps[tile] ? "special" : ""}`;
    square.textContent = tile;

    if (jumps[tile]) {
      square.title = jumps[tile] > tile ? `Ladder to ${jumps[tile]}` : `Snake to ${jumps[tile]}`;
    }

    if (snakeLadderPosition === tile) {
      const token = document.createElement("span");
      token.className = "board-token player";
      token.textContent = "P";
      square.append(token);
    }

    if (computerSnakeLadderPosition === tile) {
      const token = document.createElement("span");
      token.className = "board-token computer";
      token.textContent = "C";
      square.append(token);
    }

    snakeLadderBoard.append(square);
  }
};

const resetSnakeLadderGame = () => {
  snakeLadderPosition = 1;
  computerSnakeLadderPosition = 1;
  snakeLadderDone = false;
  rollSnakeLadder.disabled = false;
  snakeLadderDice.textContent = "-";
  snakeLadderStatus.textContent = "Reach tile 36 before the computer.";
  renderSnakeLadder();
};

const moveSnakeLadderPiece = (currentPosition, roll) => {
  let nextPosition = currentPosition;
  if (nextPosition + roll <= 36) {
    nextPosition += roll;
  }

  const jumpedTo = jumps[nextPosition];
  if (jumpedTo) {
    nextPosition = jumpedTo;
  }

  return nextPosition;
};

const computerSnakeLadderTurn = () => {
  if (snakeLadderDone) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  computerSnakeLadderPosition = moveSnakeLadderPiece(computerSnakeLadderPosition, roll);

  if (computerSnakeLadderPosition === 36) {
    snakeLadderDone = true;
    rollSnakeLadder.disabled = true;
    snakeLadderStatus.textContent = "Computer reached tile 36 first.";
  } else {
    snakeLadderStatus.textContent = `Computer rolled ${roll}. Your tile: ${snakeLadderPosition}. Computer tile: ${computerSnakeLadderPosition}.`;
    rollSnakeLadder.disabled = false;
  }

  renderSnakeLadder();
};

rollSnakeLadder.addEventListener("click", () => {
  if (snakeLadderDone) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  rollSnakeLadder.disabled = true;
  snakeLadderDice.textContent = roll;
  snakeLadderPosition = moveSnakeLadderPiece(snakeLadderPosition, roll);

  if (snakeLadderPosition === 36) {
    snakeLadderDone = true;
    snakeLadderStatus.textContent = `You reached tile 36 first.${awardXP(55, "Snake & Ladder")}`;
    renderSnakeLadder();
    return;
  }

  snakeLadderStatus.textContent = `You rolled ${roll}. Computer is rolling...`;
  renderSnakeLadder();
  setTimeout(computerSnakeLadderTurn, 650);
});

resetSnakeLadder.addEventListener("click", resetSnakeLadderGame);
resetSnakeLadderGame();

const snakeCanvas = document.querySelector("#snakeCanvas");
const snakeStatus = document.querySelector("#snakeStatus");
const startSnake = document.querySelector("#startSnake");
const snakeContext = snakeCanvas.getContext("2d");
const snakeCell = 18;
let snake;
let snack;
let snakeVelocity;
let snakeTimer;
let snakeScore = 0;

const placeSnack = () => ({
  x: Math.floor(Math.random() * 20),
  y: Math.floor(Math.random() * 20),
});

const drawSnake = () => {
  snakeContext.fillStyle = "#04111f";
  snakeContext.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  snakeContext.strokeStyle = "rgba(18, 215, 235, 0.16)";

  for (let line = 0; line <= 20; line += 1) {
    snakeContext.beginPath();
    snakeContext.moveTo(line * snakeCell, 0);
    snakeContext.lineTo(line * snakeCell, snakeCanvas.height);
    snakeContext.moveTo(0, line * snakeCell);
    snakeContext.lineTo(snakeCanvas.width, line * snakeCell);
    snakeContext.stroke();
  }

  snakeContext.fillStyle = "#ffc845";
  snakeContext.fillRect(snack.x * snakeCell + 3, snack.y * snakeCell + 3, snakeCell - 6, snakeCell - 6);
  snakeContext.fillStyle = "#06d4df";
  snake.forEach((part) => {
    snakeContext.fillRect(part.x * snakeCell + 2, part.y * snakeCell + 2, snakeCell - 4, snakeCell - 4);
  });
};

const stopSnake = (message) => {
  clearInterval(snakeTimer);
  snakeTimer = null;
  snakeStatus.textContent = message;
  startSnake.textContent = "Restart";
};

const tickSnake = () => {
  const head = {
    x: snake[0].x + snakeVelocity.x,
    y: snake[0].y + snakeVelocity.y,
  };
  const hitWall = head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20;
  const hitSelf = snake.some((part) => part.x === head.x && part.y === head.y);

  if (hitWall || hitSelf) {
    stopSnake(`Game over. Score: ${snakeScore}.`);
    return;
  }

  snake.unshift(head);

  if (head.x === snack.x && head.y === snack.y) {
    snakeScore += 1;
    snack = placeSnack();
    snakeStatus.textContent = `Score: ${snakeScore}`;
  } else {
    snake.pop();
  }

  drawSnake();
};

const startSnakeGame = () => {
  clearInterval(snakeTimer);
  snake = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ];
  snack = placeSnack();
  snakeVelocity = { x: 1, y: 0 };
  snakeScore = 0;
  snakeStatus.textContent = "Score: 0";
  startSnake.textContent = "Restart";
  drawSnake();
  snakeTimer = setInterval(tickSnake, 140);
};

document.addEventListener("keydown", (event) => {
  const keys = {
    ArrowUp: { x: 0, y: -1 },
    w: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    s: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    a: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    d: { x: 1, y: 0 },
  };
  const next = keys[event.key];

  if (!next || !snakeVelocity) return;

  const isReverse = next.x + snakeVelocity.x === 0 && next.y + snakeVelocity.y === 0;
  if (!isReverse) {
    snakeVelocity = next;
  }
});

startSnake.addEventListener("click", startSnakeGame);
snake = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];
snack = placeSnack();
snakeVelocity = { x: 1, y: 0 };
drawSnake();

const bubbleGrid = document.querySelector("#bubbleGrid");
const bubbleStatus = document.querySelector("#bubbleStatus");
const resetBubble = document.querySelector("#resetBubble");
const bubbleColors = ["cyan", "pink", "violet", "gold", "green"];
let bubbles = [];
let bubbleScore = 0;

const getBubbleNeighbors = (index) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ]
    .filter(([nextRow, nextCol]) => nextRow >= 0 && nextRow < 6 && nextCol >= 0 && nextCol < 8)
    .map(([nextRow, nextCol]) => nextRow * 8 + nextCol);
};

const findBubbleGroup = (index, color, visited = new Set()) => {
  if (visited.has(index) || bubbles[index] !== color) return visited;

  visited.add(index);
  getBubbleNeighbors(index).forEach((neighbor) => findBubbleGroup(neighbor, color, visited));
  return visited;
};

const renderBubbles = () => {
  bubbleGrid.innerHTML = "";

  bubbles.forEach((color, index) => {
    const bubble = document.createElement("button");
    bubble.className = "bubble-cell";
    bubble.type = "button";
    bubble.dataset.color = color || "";
    bubble.disabled = !color;
    bubble.textContent = color || "";
    bubble.addEventListener("click", () => {
      const group = findBubbleGroup(index, color);

      if (group.size < 2) {
        bubbleStatus.textContent = "Find a connected group of 2 or more.";
        return;
      }

      group.forEach((item) => {
        bubbles[item] = "";
      });
      bubbleScore += group.size;
      bubbleStatus.textContent = `Popped ${group.size}. Score: ${bubbleScore}`;
      renderBubbles();

      if (bubbles.every((bubble) => !bubble)) {
        bubbleStatus.textContent = `All bubbles cleared.${awardXP(50, "Bubble Shoot")}`;
      }
    });
    bubbleGrid.append(bubble);
  });
};

const resetBubbleGame = () => {
  bubbles = Array.from({ length: 48 }, () => bubbleColors[Math.floor(Math.random() * bubbleColors.length)]);
  bubbleScore = 0;
  bubbleStatus.textContent = "Click a matching color group of 2 or more to pop it.";
  renderBubbles();
};

resetBubble.addEventListener("click", resetBubbleGame);
resetBubbleGame();

const memoryGrid = document.querySelector("#memoryGrid");
const memoryStatus = document.querySelector("#memoryStatus");
const resetMemory = document.querySelector("#resetMemory");
const memoryIcons = ["🚀", "🪐", "⚡", "🔮", "🎧", "🎮", "🌙", "💎"];
let memoryCards = [];
let openCards = [];
let memoryLocked = false;
let memoryMatches = 0;

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

const renderMemory = () => {
  memoryGrid.innerHTML = "";

  memoryCards.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = `memory-card ${card.open || card.matched ? "" : "is-hidden"} ${card.matched ? "is-matched" : ""}`;
    button.type = "button";
    button.textContent = card.icon;
    button.addEventListener("click", () => flipMemoryCard(index));
    memoryGrid.append(button);
  });
};

const flipMemoryCard = (index) => {
  const card = memoryCards[index];
  if (memoryLocked || card.open || card.matched) return;

  card.open = true;
  openCards.push(index);
  renderMemory();

  if (openCards.length === 2) {
    const [first, second] = openCards;
    if (memoryCards[first].icon === memoryCards[second].icon) {
      memoryCards[first].matched = true;
      memoryCards[second].matched = true;
      openCards = [];
      memoryMatches += 1;
      memoryStatus.textContent = `Matched ${memoryMatches} of ${memoryIcons.length}.`;

      if (memoryMatches === memoryIcons.length) {
        memoryStatus.textContent = `All pairs matched. Victory.${awardXP(45, "Memory Match")}`;
      }
    } else {
      memoryLocked = true;
      setTimeout(() => {
        memoryCards[first].open = false;
        memoryCards[second].open = false;
        openCards = [];
        memoryLocked = false;
        renderMemory();
      }, 700);
    }
  }
};

const resetMemoryGame = () => {
  memoryCards = shuffle([...memoryIcons, ...memoryIcons]).map((icon) => ({
    icon,
    open: false,
    matched: false,
  }));
  openCards = [];
  memoryLocked = false;
  memoryMatches = 0;
  memoryStatus.textContent = "Find all matching pairs.";
  renderMemory();
};

resetMemory.addEventListener("click", resetMemoryGame);
resetMemoryGame();

const startReaction = document.querySelector("#startReaction");
const reactionTarget = document.querySelector("#reactionTarget");
const reactionStatus = document.querySelector("#reactionStatus");
let reactionTimeout;
let reactionStartedAt = 0;
let reactionLive = false;

startReaction.addEventListener("click", () => {
  clearTimeout(reactionTimeout);
  reactionLive = false;
  reactionTarget.classList.remove("is-live");
  reactionTarget.textContent = "Wait";
  reactionStatus.textContent = "Wait for the glow.";

  reactionTimeout = setTimeout(() => {
    reactionLive = true;
    reactionStartedAt = Date.now();
    reactionTarget.classList.add("is-live");
    reactionTarget.textContent = "Tap";
    reactionStatus.textContent = "Now.";
  }, Math.floor(Math.random() * 1800) + 900);
});

reactionTarget.addEventListener("click", () => {
  if (!reactionLive) {
    reactionStatus.textContent = "Too soon. Start again.";
    clearTimeout(reactionTimeout);
    reactionTarget.textContent = "Ready";
    return;
  }

  const time = Date.now() - reactionStartedAt;
  reactionLive = false;
  reactionTarget.classList.remove("is-live");
  reactionTarget.textContent = `${time} ms`;
  reactionStatus.textContent = time < 300 ? `Lightning reflex.${awardXP(20, "Reaction Dash")}` : "Good hit. Try for under 300 ms.";
});

const rpsStatus = document.querySelector("#rpsStatus");
const rpsPlayerScore = document.querySelector("#rpsPlayerScore");
const rpsComputerScore = document.querySelector("#rpsComputerScore");
const resetRps = document.querySelector("#resetRps");
const rpsButtons = document.querySelectorAll("[data-rps]");
const rpsChoices = ["rock", "paper", "scissors"];
let rpsPlayer = 0;
let rpsComputer = 0;
let rpsLocked = false;

const updateRpsScore = () => {
  rpsPlayerScore.textContent = rpsPlayer;
  rpsComputerScore.textContent = rpsComputer;
};

const resetRpsGame = () => {
  rpsPlayer = 0;
  rpsComputer = 0;
  rpsLocked = false;
  rpsStatus.textContent = "First to 5 rounds wins XP.";
  updateRpsScore();
};

rpsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (rpsLocked) return;

    const playerChoice = button.dataset.rps;
    const computerChoice = rpsChoices[Math.floor(Math.random() * rpsChoices.length)];

    if (playerChoice === computerChoice) {
      rpsStatus.textContent = `Both chose ${playerChoice}. Draw round.`;
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      rpsPlayer += 1;
      rpsStatus.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. You win the round.`;
    } else {
      rpsComputer += 1;
      rpsStatus.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. Computer wins the round.`;
    }

    updateRpsScore();

    if (rpsPlayer === 5 || rpsComputer === 5) {
      rpsLocked = true;
      rpsStatus.textContent =
        rpsPlayer === 5 ? `You win RPS Battle.${awardXP(35, "RPS Battle")}` : "Computer wins RPS Battle.";
    }
  });
});

resetRps.addEventListener("click", resetRpsGame);
resetRpsGame();

const guessStatus = document.querySelector("#guessStatus");
const guessInput = document.querySelector("#guessInput");
const submitGuess = document.querySelector("#submitGuess");
const resetGuess = document.querySelector("#resetGuess");
let secretNumber = 0;
let guessAttempts = 0;
let guessLocked = false;

const resetGuessGame = () => {
  secretNumber = Math.floor(Math.random() * 50) + 1;
  guessAttempts = 0;
  guessLocked = false;
  guessInput.value = "";
  guessStatus.textContent = "Guess the computer's number from 1 to 50.";
};

submitGuess.addEventListener("click", () => {
  if (guessLocked) return;

  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > 50) {
    guessStatus.textContent = "Enter a number between 1 and 50.";
    return;
  }

  guessAttempts += 1;

  if (guess === secretNumber) {
    guessLocked = true;
    const reward = Math.max(15, 55 - guessAttempts * 5);
    guessStatus.textContent = `Correct in ${guessAttempts} guesses.${awardXP(reward, "Number Guess")}`;
  } else if (guessAttempts >= 7) {
    guessLocked = true;
    guessStatus.textContent = `Computer wins. The number was ${secretNumber}.`;
  } else {
    guessStatus.textContent = guess < secretNumber ? "Too low. Try higher." : "Too high. Try lower.";
  }

  guessInput.value = "";
  guessInput.focus();
});

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitGuess.click();
  }
});

resetGuess.addEventListener("click", resetGuessGame);
resetGuessGame();

const wordStatus = document.querySelector("#wordStatus");
const scrambleWord = document.querySelector("#scrambleWord");
const wordInput = document.querySelector("#wordInput");
const submitWord = document.querySelector("#submitWord");
const resetWord = document.querySelector("#resetWord");
const wordBank = ["orbit", "nebula", "cosmos", "avatar", "galaxy", "rocket", "planet", "portal"];
let currentWord = "";
let wordTimer;
let wordLocked = false;

const scramble = (word) => {
  let letters = word.toUpperCase().split("");
  while (letters.join("").toLowerCase() === word) {
    letters = letters.sort(() => Math.random() - 0.5);
  }
  return letters.join("");
};

const resetWordGame = () => {
  clearTimeout(wordTimer);
  currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  wordLocked = false;
  wordInput.value = "";
  scrambleWord.textContent = scramble(currentWord);
  wordStatus.textContent = "Unscramble the word before the computer locks it.";

  wordTimer = setTimeout(() => {
    if (!wordLocked) {
      wordLocked = true;
      wordStatus.textContent = `Computer locked it. The word was ${currentWord.toUpperCase()}.`;
    }
  }, 15000);
};

submitWord.addEventListener("click", () => {
  if (wordLocked) return;

  const answer = wordInput.value.trim().toLowerCase();
  if (!answer) {
    wordStatus.textContent = "Type your answer first.";
    return;
  }

  if (answer === currentWord) {
    wordLocked = true;
    clearTimeout(wordTimer);
    wordStatus.textContent = `Correct word.${awardXP(40, "Word Scramble")}`;
  } else {
    wordStatus.textContent = "Not quite. Try again before the computer locks it.";
  }

  wordInput.value = "";
  wordInput.focus();
});

wordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitWord.click();
  }
});

resetWord.addEventListener("click", resetWordGame);
resetWordGame();


// Arcade chat
const gamingChatFeed = document.querySelector('#gamingChatFeed');
const gamingChatName = document.querySelector('#gamingChatName');
const gamingChatInput = document.querySelector('#gamingChatInput');
const sendGamingChat = document.querySelector('#sendGamingChat');
const clearGamingChat = document.querySelector('#clearGamingChat');
const chatStorageKey = 'selestiaGamingChat';

const loadGamingMessages = () => JSON.parse(localStorage.getItem(chatStorageKey) || '[]');
const saveGamingMessages = (messages) => localStorage.setItem(chatStorageKey, JSON.stringify(messages.slice(-40)));

const renderGamingMessage = ({ name, text, system = false }) => {
  const message = document.createElement('div');
  message.className = system ? 'chat-message system-message' : 'chat-message';
  message.innerHTML = system ? text : '<strong>' + name + '</strong><span>' + text + '</span>';
  gamingChatFeed.append(message);
  gamingChatFeed.scrollTop = gamingChatFeed.scrollHeight;
};

const renderGamingChat = () => {
  gamingChatFeed.innerHTML = '<div class="chat-message system-message">Welcome to Gaming Zone. Share scores, challenge friends, or drop quick strategy notes.</div>';
  loadGamingMessages().forEach(renderGamingMessage);
};

const sendGamingMessage = () => {
  const text = gamingChatInput.value.trim();
  const name = gamingChatName.value.trim() || 'Player';
  if (!text) return;
  const messages = loadGamingMessages();
  const nextMessage = { name, text };
  messages.push(nextMessage);
  saveGamingMessages(messages);
  renderGamingMessage(nextMessage);
  gamingChatInput.value = '';
  gamingChatInput.focus();
};

sendGamingChat.addEventListener('click', sendGamingMessage);
gamingChatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sendGamingMessage();
});
clearGamingChat.addEventListener('click', () => {
  localStorage.removeItem(chatStorageKey);
  renderGamingChat();
});
renderGamingChat();
