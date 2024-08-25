import { useEffect, useState } from "react";
import { RandomVerbsListInterface } from "../interfaces/RandomVerbsListInterface";

import "../styles/boardStyles.css";

interface BoardInterface {
  board: string[][];
  randomVerbsList: RandomVerbsListInterface[];
}

function Board({ board, randomVerbsList }: BoardInterface) {
  const [firstVerbSelected, setFirstVerbSelected] = useState("");
  const [secondVerbSelected, setSecondVerbSelected] = useState("");
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const combinedVerbs = board.flat();

  useEffect(() => {
    if (firstVerbSelected && secondVerbSelected && matchedCards.length < 6) {
      const matchedVerb = randomVerbsList.find(
        (item) =>
          (item.verb === firstVerbSelected &&
            isMatchingPastForm(item, secondVerbSelected)) ||
          (item.verb === secondVerbSelected &&
            isMatchingPastForm(item, firstVerbSelected))
      );

      if (matchedVerb) {
        const newMatchedCards = [...revealedCards];
        setMatchedCards((prev) => [...prev, ...newMatchedCards]);
      }
      setTimeout(() => {
        setFirstVerbSelected("");
        setSecondVerbSelected("");
        setRevealedCards([]);
      }, 500);
    }
  }, [firstVerbSelected, secondVerbSelected, randomVerbsList]);

  const isMatchingPastForm = (
    verb: RandomVerbsListInterface,
    selectedVerb: string
  ) => {
    return verb.forms.past === selectedVerb;
  };

  const handleClick = (verb: string, index: number) => {
    if (!firstVerbSelected) {
      setFirstVerbSelected(verb);
      setRevealedCards([index]);
    } else if (!secondVerbSelected) {
      setSecondVerbSelected(verb);
      setRevealedCards((prev) => [...prev, index]);
    }
  };

  return (
    <div className="board">
      {combinedVerbs.map((verb, index) => (
        <div
          key={index}
          id={index + "verb"}
          onClick={() => handleClick(verb, index)}
          className={`board-card ${
            revealedCards.includes(index) ? "verb-selected" : ""
          } ${matchedCards.includes(index) ? "correct" : ""}`}
        >
          {verb}
        </div>
      ))}
    </div>
  );
}

export default Board;
