// INTERFACES
import { MatchedCardsInterface } from "../interfaces/MatchedCardsInterface";

// HOOK
import { useRemoveCorrectClass } from "../hooks/useRemoveCorrectClass";

import { Dispatch, SetStateAction } from "react";

import "../styles/ResetGameStyle.css";

interface ResetGameProps {
  rows: number;
  columns: number;
  generateBoard: (rows: number, columns: number) => void;
  matchedCards: MatchedCardsInterface[];
  setMatchedCards: Dispatch<SetStateAction<MatchedCardsInterface[]>>;
}

function ResetGame({
  rows,
  columns,
  generateBoard,
  matchedCards,
  setMatchedCards,
}: ResetGameProps) {
  const { removeCorrectClass } = useRemoveCorrectClass(
    matchedCards,
    setMatchedCards
  );

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
