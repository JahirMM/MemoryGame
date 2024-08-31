import { useRemoveCorrectClass } from "../hooks/useRemoveCorrectClass";
import "../styles/ResetGameStyle.css";

interface ResetGameProps {
  rows: number;
  columns: number;
  generateBoard: (rows: number, columns: number) => void;
}

function ResetGame({ rows, columns, generateBoard }: ResetGameProps) {
  const { removeCorrectClass } = useRemoveCorrectClass();

  const handleResetGame = () => {
    generateBoard(rows, columns);
    removeCorrectClass();
  };
  return (
    <button onClick={() => handleResetGame()} type="button" className="reset">
      reset game
    </button>
  );
}

export default ResetGame;
