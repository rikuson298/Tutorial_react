var linesCash = new Map();

function calculateWinner(squares, mode) {
    let lines;
    if (linesCash.get(mode)) {
        lines = linesCash.get(mode);
    } else {
        lines = Array.apply(null, Array(mode)).map((value, col) => {
            const line = Array.apply(null, Array(mode)).map((value, row) => {
                        return mode * col + row;
                    });
            return line;
        });
        Array.apply(null, Array(mode)).forEach((value, col) => {
            const line = Array.apply(null, Array(mode)).map((value, row) => {
                        return col + mode * row;
                    });
            return lines.push(line);
        });
        lines.push(Array.apply(null, Array(mode)).map((value, row) => {
            return mode * row + row;
        }));
        lines.push(Array.apply(null, Array(mode)).map((value, row) => {
            return (mode -1) + (mode * row - row);
        }));
        linesCash.set(mode, lines);
    }

    let victoryLine;
    lines.some(line => {
        const criteria　 = squares[line[0]];
        if (criteria) {
            let fin = true;
            line.forEach(value => {
                if (criteria !== squares[value]) {
                    fin = false;
                };
            });
            if (fin) {
                victoryLine = line;
                return true;
            }
        }
    });
    return victoryLine;
}

export {calculateWinner};