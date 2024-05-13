const boardCells = document.querySelectorAll(".cell");

function setCellBorders() {
  boardCells.forEach((cell, index) => {
    console.log(index);

    if ([0, 1, 2].includes(index)) {
      cell.style.borderBottom = "1px solid rgb(117, 117, 117)";
    } else if ([6, 7, 8].includes(index)) {
      cell.style.borderTop = "1px solid rgb(117, 117, 117)";
    }

    if ([1, 4, 7].includes(index)) {
      cell.style.borderLeft = "1px solid rgb(117, 117, 117)";
      cell.style.borderRight = "1px solid rgb(117, 117, 117)";
    }
  });
}

setCellBorders();
