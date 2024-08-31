import { Dispatch, SetStateAction, useState } from "react";
import { LevelInterface } from "../interfaces/LevelInterface";
import { useRemoveCorrectClass } from "../hooks/useRemoveCorrectClass";

import "../styles/LevelSelector.css";

interface LevelSelectorProps {
  levels: LevelInterface[];
  setRows: Dispatch<SetStateAction<number>>;
  setColumns: Dispatch<SetStateAction<number>>;
}

function LevelSelector({ levels, setRows, setColumns }: LevelSelectorProps) {
  const { removeCorrectClass } = useRemoveCorrectClass();
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
    if (level === "Difficulty") {
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
