// INTERFACES
import { LevelInterface } from "../interfaces/LevelInterface";
import { MatchedCardsInterface } from "../interfaces/MatchedCardsInterface";

// HOOK
import { useRemoveCorrectClass } from "../hooks/useRemoveCorrectClass";

import { Dispatch, SetStateAction, useState } from "react";

import "../styles/LevelSelector.css";

interface LevelSelectorProps {
  levels: LevelInterface[];
  setRows: Dispatch<SetStateAction<number>>;
  setColumns: Dispatch<SetStateAction<number>>;
  matchedCards: MatchedCardsInterface[];
  setMatchedCards: Dispatch<SetStateAction<MatchedCardsInterface[]>>;
}

function LevelSelector({
  levels,
  setRows,
  setColumns,
  matchedCards,
  setMatchedCards,
}: LevelSelectorProps) {
  const { removeCorrectClass } = useRemoveCorrectClass(
    matchedCards,
    setMatchedCards
  );
  const [selectedLevel, setSelectedLevel] = useState("Easy");

  const setCSSVariable = (variable: string, value: string) => {
    document.documentElement.style.setProperty(variable, value);
  };

  const handleChangeLevel = (level: string, rows: number, columns: number) => {
    if (level === "Easy") {
      setRows(rows);
      setColumns(columns);
      setCSSVariable("--columns", columns.toString());
      removeCorrectClass();
      setSelectedLevel(level);
    }
    if (level === "Medium") {
      setRows(rows);
      setColumns(columns);
      setCSSVariable("--columns", columns.toString());
      removeCorrectClass();
      setSelectedLevel(level);
    }
    if (level === "Difficult") {
      setRows(rows);
      setColumns(columns);
      setCSSVariable("--columns", columns.toString());
      removeCorrectClass();
      setSelectedLevel(level);
    }
  };
  return (
    <div className="container-levels">
      {levels.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleChangeLevel(item.level, item.rows, item.columns)}
          className={`${
            selectedLevel === item.level ? "selected-level" : ""
          } level`}
        >
          {item.level}
        </button>
      ))}
    </div>
  );
}

export default LevelSelector;
