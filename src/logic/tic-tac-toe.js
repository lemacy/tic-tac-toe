const calculateWinner = (squares, boardWidth, boardHeight, numberOfSquaresToWin) => {
  boardWidth = parseInt(boardWidth, 10);
  boardHeight = parseInt(boardHeight, 10);
  numberOfSquaresToWin = parseInt(numberOfSquaresToWin, 10);

  for (let y = 0; y < boardHeight; y++) {
    const offset = y * boardWidth;
    for (let x = 0; x < boardWidth; x++) {
      const currentIndex = x + offset;

      if (squares[currentIndex]) {
        const currentValue = squares[currentIndex].value;

        // row match
        if (x + numberOfSquaresToWin <= boardWidth) {
          let match = true;
          const combination = [currentIndex];

          for (let i = (x + 1); i < (x + numberOfSquaresToWin); i++) {
            const comparedIndex = i + offset;
            const comparedValue = squares[comparedIndex] ? squares[comparedIndex].value : null;

            match *= comparedValue && currentValue === comparedValue;

            if (!match) {
              break;
            }

            combination.push(comparedIndex);
          }

          if (match) {
            return combination;
          }
        }

        // column match
        if (y + numberOfSquaresToWin <= boardHeight) {
          let match = true;
          const combination = [currentIndex];

          for (let i = y + 1; i < y + numberOfSquaresToWin; i++) {
            const comparedIndex = x + (i * boardWidth);
            const comparedValue = squares[comparedIndex] ? squares[comparedIndex].value : null;

            match *= comparedValue && currentValue === comparedValue;

            if (!match) {
              break;
            }

            combination.push(comparedIndex);
          }

          if (match) {
            return combination;
          }
        }

        // left-top to right-bottom match
        if (x + numberOfSquaresToWin <= boardWidth
                  && y + numberOfSquaresToWin <= boardHeight
        ) {
          let match = true;
          const gap = boardWidth + 1;
          const combination = [currentIndex];

          for (let i = 1; i < numberOfSquaresToWin; i++) {
            const comparedIndex = currentIndex + (i * gap);
            const comparedValue = squares[comparedIndex] ? squares[comparedIndex].value : null;

            match *= comparedValue && currentValue === comparedValue;

            if (!match) {
              break;
            }

            combination.push(comparedIndex);
          }

          if (match) {
            return combination;
          }
        }

        // right-top to left-bottom match
        if (x + numberOfSquaresToWin <= boardWidth
                  && y + 1 - numberOfSquaresToWin >= 0
        ) {
          let match = true;
          const gap = boardWidth - 1;
          const combination = [currentIndex];

          for (let i = 1; i < numberOfSquaresToWin; i++) {
            const comparedIndex = currentIndex - (i * gap);
            const comparedValue = squares[comparedIndex] ? squares[comparedIndex].value : null;

            match *= comparedValue && currentValue === comparedValue;

            if (!match) {
              break;
            }

            combination.push(comparedIndex);
          }

          if (match) {
            return combination;
          }
        }
      }
    }
  }
  return [];
};

export { calculateWinner };
