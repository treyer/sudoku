module.exports = function solveSudoku(matrix) {
  let solveMatrix = matrix.slice();

  let solvedTotal = initiateMatrix(solveMatrix);
  solvedTotal += excludeUsedInRowColumnAndSquare(solveMatrix, matrix);
  if (solvedTotal === 81) return matrix;
  return null;
}


let initiateMatrix = (solveMatrix) => {
  let solved = 0;
  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          if (solveMatrix[i][j] === 0){
              solveMatrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          } else {
              solved ++;
          }
      }
  }
  return solved;
}

//returns count of solved by this method
let excludeUsedInRowColumnAndSquare = (solveMatrix, matrix) => {
  let newSolved = 0;

  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          if (solveMatrix[i][j].length){
              let used = [];
              //check row i
              for (let m = 0; m < 9; m++) {
                  if (m !== j){
                      if (typeof(solveMatrix[i][m]) === 'number'){
                          used.push(solveMatrix[i][m]);
                      }
                  }
              }
              //check column j
              for (let n = 0; n < 9; n++) {
                  if (n !== i){
                      if (typeof(solveMatrix[n][j]) === 'number'){
                          used.push(solveMatrix[n][j]);
                      }
                  }
              }
              //check appropriate square
              if (i < 3){
                  rowStart = 0;
              } else if (i >= 3 && i < 6){
                  rowStart = 3;
              } else {
                  rowStart = 6
              }
              if (j < 3){
                  columnStart = 0;
              } else if (j >= 3 && j < 6){
                  columnStart = 3;
              } else {
                  columnStart = 6
              }
              for (let r = rowStart; r < rowStart + 3; r++) {
                  for (let k = columnStart; k < columnStart + 3; k++) {
                      if(typeof(solveMatrix[r][k]) === 'number') used.push(solveMatrix[r][k]);
                  }
              }
              //exclude from variants used
              solveMatrix[i][j] = solveMatrix[i][j].filter( ( el ) => !used.includes( el ) );
              if (solveMatrix[i][j].length === 1){
                  //add decision to matrix
                  let decision = solveMatrix[i][j][0];
                  matrix[i][j] = decision;
                  solveMatrix[i][j] = decision;
                  newSolved++;
              }
          }
      }
  }
  return newSolved;
}


