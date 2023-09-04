export const getComputerMove = (difficulty: Number, matrix: Number[][]): Number[] => {
  let res: Number[] = [];
  if (difficulty === 1) {
    res = getRandomMove(matrix);
  } else if (difficulty === 2) {
    res = easyAIMoves(matrix);
  } else if (difficulty === 3) {
    res = getAIEnhancedMove(matrix, 2);
    console.log("AI Enhanced Move: ", res);
  } else {
    res = getAIEnhancedMove(matrix, Infinity);
  }

  return res;
};

const getRandomMove = (matrix: Number[][]) => {
  let row = Math.floor(Math.random() * 3);
  let col = Math.floor(Math.random() * 3);
  while (matrix[row][col] !== -1) {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  }
  const res = [row, col];
  return res;
};

const easyAIMoves = (matrix: Number[][]): Number[] => {
  let res: Number[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i][j] === -1) {
        matrix[i][j] = 0;
        const playerWinner = checkWinner(matrix, 0);
        if (playerWinner === 0) {
          res = [i, j];
        }

        matrix[i][j] = 1;
        const computerWinner = checkWinner(matrix, 1);
        if (computerWinner === 1) {
          res = [i, j];
        }
        matrix[i][j] = -1;
      }
    }
  }
  if (res.length === 0) {
    res = getRandomMove(matrix);
  }
  return res;
};

export function checkWinner(turnIndex: Number[][], turn: number): number {
  let tie = true;

  // Check rows
  for (const row of turnIndex) {
    if (row.filter((value) => value === turn).length === 3) {
      return turn;
    }
    if (row.includes(-1)) {
      tie = false;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (turnIndex[0][col] === turn && turnIndex[1][col] === turn && turnIndex[2][col] === turn) {
      return turn;
    }
    if (turnIndex[col].includes(-1)) {
      tie = false;
    }
  }

  // Check diagonals
  if (turnIndex[0][0] === turn && turnIndex[1][1] === turn && turnIndex[2][2] === turn) {
    return turn;
  }

  if (turnIndex[0][2] === turn && turnIndex[1][1] === turn && turnIndex[2][0] === turn) {
    return turn;
  }

  return tie ? -1 : -2;
}

function assignScore(matrix: Number[][], turn: number): number {
  let score = 0;
  const winner = checkWinner(matrix, turn);
  if (winner === -1) {
    score = 5;
  } else if (winner === 0) {
    score = -10;
  } else if (winner === 1) {
    score = 10;
  } else {
    score = 0;
  }
  return score;
}

function dfs(
  matrix: Number[][],
  steps: number,
  row: number,
  col: number,
  currScoreMap: number,
  turn: number
): number {
  if (steps === 0) {
    const score = assignScore(matrix, turn);
    return score;
  }

  matrix[row][col] = turn;
  if (checkWinner(matrix, turn) !== -2) {
    const score = assignScore(matrix, turn);
    matrix[row][col] = -1;
    return score;
  }

  let MaxCurrScore = -Number.MAX_VALUE;
  let MinCurrScore = Number.MAX_VALUE;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i][j] === -1) {
        const score = dfs(matrix, steps - 1, i, j, currScoreMap, turn === 1 ? 0 : 1);
        MaxCurrScore = Math.max(MaxCurrScore, score);
        MinCurrScore = Math.min(MinCurrScore, score);
      }
    }
  }

  matrix[row][col] = -1;

  if (turn === 1) {
    return MinCurrScore;
  } else {
    return MaxCurrScore;
  }
}

function getAIEnhancedMove(matrix: Number[][], steps: number): number[] {
  const res = [-Number.MAX_VALUE, -1, -1];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i][j] === -1) {
        const score = dfs(matrix, steps, i, j, 0, 1);
        if (score > res[0]) {
          res[0] = score;
          res[1] = i;
          res[2] = j;
        }
      }
    }
  }

  return [res[1], res[2]];
}
