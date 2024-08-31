import "./styles/AppStyles.css";
import { useEffect, useState } from "react";

import verbs from "./data/verbs.json";

// COMPONETS
import Board from "./components/Board";
import LevelSelector from "./components/LevelSelector";

// INTERFACES
import { RandomVerbsListInterface } from "./interfaces/RandomVerbsListInterface";
import { LevelInterface } from "./interfaces/LevelInterface";
import ResetGame from "./components/ResetGame";

// HOOK
import { useRemoveCorrectClass } from "./hooks/useRemoveCorrectClass";

function App() {
  const { removeCorrectClass } = useRemoveCorrectClass();

  const levels: LevelInterface[] = [
    {
      level: "Easy",
      rows: 2,
      columns: 4,
    },
    {
      level: "Medium",
      rows: 4,
      columns: 5,
    },
    {
      level: "Difficulty",
      rows: 5,
      columns: 6,
    },
  ];

  const [rows, setRows] = useState(levels[0].rows);
  const [columns, setColumns] = useState(levels[0].columns);
  const [board, setBoard] = useState<string[][]>([]);
  const [randomVerbsList, setRandomVerbsList] = useState<
    RandomVerbsListInterface[]
  >([]);

  const totalVerbsInPresent = (rows * columns) / 2;
  const totalVerbs = rows * columns;

  // Función para obtener verbos aleatorios
  const getRandomVerbs = (list: typeof verbs, count: number) => {
    const result = [];
    const verbListCopy = [...list];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * verbListCopy.length);
      result.push(verbListCopy.splice(randomIndex, 1)[0]);
    }
    return result;
  };

  // llenar de forma random los verbos en la tabla
  const fillBoardWithVerbs = (
    newBoard: string[][],
    verbs: RandomVerbsListInterface[],
    rows: number,
    columns: number
  ) => {
    verbs.forEach((verbObj) => {
      if (!verbObj) return;
      const {
        verb,
        forms: { past },
      } = verbObj;
      const placeVerb = (verb: string) => {
        let row, col;
        do {
          row = Math.floor(Math.random() * rows);
          col = Math.floor(Math.random() * columns);
        } while (newBoard[row][col] !== "verb");
        newBoard[row][col] = verb;
      };
      placeVerb(verb);
      placeVerb(past);
    });
  };

  // generar el tablero con los verbos
  const generateBoard = (rows: number, columns: number) => {
    const newBoard: string[][] = Array.from({ length: rows }, () =>
      Array(columns).fill("verb")
    );

    const randomVerbs = getRandomVerbs(verbs, totalVerbsInPresent);
    fillBoardWithVerbs(newBoard, randomVerbs, rows, columns);
    setBoard(newBoard);
    setRandomVerbsList(randomVerbs);
  };

  useEffect(() => {
    generateBoard(rows, columns);
  }, [rows, columns]);

  return (
    <>
      <h1>English memory game</h1>
      <LevelSelector
        levels={levels}
        setRows={setRows}
        setColumns={setColumns}
      />
      <Board
        board={board}
        randomVerbsList={randomVerbsList}
        totalVerbs={totalVerbs}
      />
      <ResetGame
        rows={rows}
        columns={columns}
        generateBoard={generateBoard}
        removeCorrectClass={removeCorrectClass}
      />
    </>
  );
}

export default App;
