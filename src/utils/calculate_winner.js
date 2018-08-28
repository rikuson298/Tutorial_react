const linesCash = new Map();

function calculateWinner(squares, mode) {
  let lines;
  if (linesCash.get(mode)) {
    lines = linesCash.get(mode);
  } else {
    lines = Array(...Array(mode)).map((value, col) => {
      const line = Array(...Array(mode)).map((value, row) => mode * col + row);
      return line;
    });
    Array(...Array(mode)).forEach((value, col) => {
      const line = Array(...Array(mode)).map((value, row) => col + mode * row);
      return lines.push(line);
    });
    lines.push(Array(...Array(mode)).map((value, row) => mode * row + row));
    lines.push(Array(...Array(mode)).map((value, row) => (mode - 1) + (mode * row - row)));
    linesCash.set(mode, lines);
  }

  let victoryLine;
  lines.some((line) => {
    const criteria = squares[line[0]];
    if (criteria) {
      let fin = true;
      line.forEach((value) => {
        if (criteria !== squares[value]) {
          fin = false;
        }
      });
      if (fin) {
        victoryLine = line;
        return true;
      }
    }
    return false;
  });
  return victoryLine;
}

export { calculateWinner, linesCash };
