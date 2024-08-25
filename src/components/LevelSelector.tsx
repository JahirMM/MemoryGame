import { Dispatch, SetStateAction } from "react";
import { LevelInterface } from "../interfaces/LevelInterface";
import { useRemoveCorrectClass } from "../hooks/useRemoveCorrectClass";

interface LevelSelectorProps {
  levels: LevelInterface[];
  setRows: Dispatch<SetStateAction<number>>;
  setColumns: Dispatch<SetStateAction<number>>;
}

function LevelSelector({ levels, setRows, setColumns }: LevelSelectorProps) {
  const { removeCorrectClass } = useRemoveCorrectClass();

  const setCSSVariable = (variable: string, value: string) => {
    document.documentElement.style.setProperty(variable, value);
  };

  const handleChangeLevel = (level: string, rows: number, columns: number) => {
    if (level === "Easy") {
      setRows(rows);
      setColumns(columns);
      setCSSVariable("--columns", columns.toString());
      removeCorrectClass();
    }
    if (level === "Medium") {
      setRows(rows);
      setColumns(columns);
      setCSSVariable("--columns", columns.toString());
      removeCorrectClass();
    }
    if (level === "Difficulty") {
      setRows(rows);
      setColumns(columns);
      setCSSVariable("--columns", columns.toString());
      removeCorrectClass();
    }
  };
  return (
    <div>
      {levels.map((item, index) => (
        <button
          key={index}
          onClick={() => handleChangeLevel(item.level, item.rows, item.columns)}
        >
          {item.level}
        </button>
      ))}
    </div>
  );
}

export default LevelSelector;
