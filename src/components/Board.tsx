import { useEffect, useState } from "react";
import { RandomVerbsListInterface } from "../interfaces/RandomVerbsListInterface";

interface BoardInterface {
  board: string[][];
  randomVerbsList: RandomVerbsListInterface[];
}

function Board({ board, randomVerbsList }: BoardInterface) {
  const [firstVerbSelected, setFirstVerbSelected] = useState("");
  const [secondVerbSelected, setSecondVerbSelected] = useState("");

  useEffect(() => {
    if (firstVerbSelected !== "" && secondVerbSelected !== "") {
      const matchedVerb = randomVerbsList.find(
        (item) =>
          (item.verb === firstVerbSelected &&
            isMatchingPastForm(item, secondVerbSelected)) ||
          (item.verb === secondVerbSelected &&
            isMatchingPastForm(item, firstVerbSelected))
      );

      if (matchedVerb) {
        console.log("Match found!");
        setFirstVerbSelected("");
        setSecondVerbSelected("");
      } else {
        console.log("Match not found!");
        setFirstVerbSelected("");
        setSecondVerbSelected("");
      }
    }
  }, [firstVerbSelected, secondVerbSelected, randomVerbsList]);

  const isMatchingPastForm = (
    verb: RandomVerbsListInterface,
    selectedVerb: string
  ) => {
    return verb.forms.past === selectedVerb;
  };

  const handleClick = (verb: string) => {
    console.log(verb);
    if (!firstVerbSelected) {
      setFirstVerbSelected(verb);
    } else if (!secondVerbSelected) {
      setSecondVerbSelected(verb);
    }
  };

  return (
    <>
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((verb, colIndex) => (
            <div
              key={colIndex}
              onClick={() => handleClick(verb)}
              style={{ padding: "10px", border: "1px solid black" }}
            >
              {verb}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Board;
