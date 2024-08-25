import "./styles/AppStyles.css";
import verbs from "./data/verbs.json";
import Board from "./components/Board";
import { RandomVerbsListInterface } from "./interfaces/RandomVerbsListInterface";

function App() {
  const rows = 2;
  const columns = 3;
  const totalVerbsInPresent = (rows * columns) / 2;
  const totalVerbs = rows * columns;
  const board: string[][] = [];
  const verdList = [...verbs];

  // Inicializa el tablero vacío
  for (let x = 0; x < rows; x++) {
    board[x] = [];
    for (let y = 0; y < columns; y++) {
      board[x].push("verb");
    }
  }

  // Función para obtener verbos aleatorios
  const getRandomVerbs = (list: typeof verbs, count: number) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * list.length);
      result.push(list.splice(randomIndex, 1)[0]);
    }
    return result;
  };

  const randomVerbsList: RandomVerbsListInterface[] = getRandomVerbs(
    verdList,
    totalVerbsInPresent
  );

  // llenar de forma random los verbos seleccionados en la tabla
  const fillBoardWithVerbs = () => {
    randomVerbsList.forEach(({ verb, forms: { past } }) => {
      const placeVerb = (verb: string) => {
        let row, col;
        do {
          row = Math.floor(Math.random() * rows);
          col = Math.floor(Math.random() * columns);
        } while (board[row][col] !== "verb");
        board[row][col] = verb;
      };
      placeVerb(verb);
      placeVerb(past);
    });
  };

  fillBoardWithVerbs();

  return (
    <div className="container">
      <h1>English memory game</h1>
      <Board
        board={board}
        randomVerbsList={randomVerbsList}
        totalVerbs={totalVerbs}
      />
    </div>
  );
}

export default App;
