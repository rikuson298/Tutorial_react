import { linesCash } from './calculate_winner';

const PriorityScore = {
  VICTORY: 999,
  BLOCK_VICTORY: 50,
  SAME_LINE: 3,
  BLOCK_PLAYER: 2,
  MAKE_LINE: 1,
};

function chooseCpuSquare(squares, mode, isEasy, xIsCpu) {
  if (isEasy) {
    return atRandom(squares, mode);
  }
  return choose(squares, mode, xIsCpu);
}

function atRandom(squares, mode) {
  const putFrg = true;
  while (putFrg) {
    const cpuIndex = Math.floor(Math.random() * Math.pow(mode, 2));
    if (!squares[cpuIndex]) {
      return cpuIndex;
    }
  }
}

function choose(squares, mode, xIsCpu) {
  const lines = linesCash.get(mode);
  const cpuMark = xIsCpu ? 'X' : 'O';
  const playerMark = !xIsCpu ? 'X' : 'O';
  let putIndex = 0;
  let maxScore = 0;

  for (let i = 0; i < Math.pow(mode, 2); i += 1) {
    if (squares[i]) {
      continue;
    }
    let score = 0;
    lines.forEach((line) => {
      if (!line.includes(i)) {
        return;
      }
      let cpuSquare = 0;
      let playerSquare = 0;
      line.forEach((element) => {
        switch (squares[element]) {
          case cpuMark:
            cpuSquare += 1;
            break;
          case playerMark:
            playerSquare += 1;
            break;
          default:
            break;
        }
      });

      if (cpuSquare === mode - 1) {
        score += PriorityScore.VICTORY;
      }
      if (playerSquare === mode - 1) {
        score += PriorityScore.BLOCK_VICTORY;
      }
      if (cpuSquare > 0 && playerSquare === 0) {
        score += PriorityScore.SAME_LINE;
      }
      if (cpuSquare === 0 && playerSquare > 0) {
        score += PriorityScore.BLOCK_PLAYER;
      }
      if (cpuSquare === 0 && playerSquare === 0) {
        score += PriorityScore.MAKE_LINE;
      }
    });

    if (maxScore < score) {
      putIndex = i;
      maxScore = score;
    }
  }
  return maxScore === 0 ? atRandom(squares, mode) : putIndex;
}

export { chooseCpuSquare };
