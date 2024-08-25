interface ResetGameProps {
  rows: number;
  columns: number;
  generateBoard: (rows: number, columns: number) => void;
  removeCorrectClass: () => void;
}

function ResetGame({
  rows,
  columns,
  generateBoard,
  removeCorrectClass,
}: ResetGameProps) {
  const handleResetGame = () => {
    generateBoard(rows, columns);
    removeCorrectClass();
  };
  return <button onClick={() => handleResetGame()}>reset game</button>;
}

export default ResetGame;
