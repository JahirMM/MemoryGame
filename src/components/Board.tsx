import { useEffect, useState } from "react";
import { RandomVerbsListInterface } from "../interfaces/RandomVerbsListInterface";

import "../styles/BoardStyles.css";

interface BoardInterface {
  board: string[][];
  randomVerbsList: RandomVerbsListInterface[];
  totalVerbs: number;
}

function Board({ board, randomVerbsList, totalVerbs }: BoardInterface) {
  const [firstVerbSelected, setFirstVerbSelected] = useState("");
  const [secondVerbSelected, setSecondVerbSelected] = useState("");
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const combinedVerbs = board.flat();

  useEffect(() => {
    if (
      firstVerbSelected &&
      secondVerbSelected &&
      matchedCards.length < totalVerbs
    ) {
      const matchedVerb = randomVerbsList.find(
        (item) =>
          (item.verb === firstVerbSelected &&
            isMatchingPastForm(item, secondVerbSelected)) ||
          (item.verb === secondVerbSelected &&
            isMatchingPastForm(item, firstVerbSelected))
      );

      if (matchedVerb) {
        setMatchedCards((prev) => [...prev, ...revealedCards]);
      }
      setTimeout(() => {
        setFirstVerbSelected("");
        setSecondVerbSelected("");
        setRevealedCards([]);
      }, 500);
    }
    console.log(matchedCards);
  }, [firstVerbSelected, secondVerbSelected, randomVerbsList]);

  // Verifica que el verbo seleccionado sea pareja con su verbo en pasado
  const isMatchingPastForm = (
    verb: RandomVerbsListInterface,
    selectedVerb: string
  ) => {
    return verb.forms.past === selectedVerb;
  };

  // Primero valida que la carta está seleccionada o si se encuentra ya en pareja
  // Posteriormente se guarda la primera carta seleccionada y la segunda carta
  const handleClick = (verb: string, index: number) => {
    if (revealedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }
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
