import JSConfetti from "js-confetti";

// INTERFACES
import { RandomVerbsListInterface } from "../interfaces/RandomVerbsListInterface";
import { MatchedCardsInterface } from "../interfaces/MatchedCardsInterface";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import "../styles/BoardStyles.css";

interface BoardProps {
  board: string[][];
  randomVerbsList: RandomVerbsListInterface[];
  totalVerbs: number;
  matchedCards: MatchedCardsInterface[];
  setMatchedCards: Dispatch<SetStateAction<MatchedCardsInterface[]>>;
}

interface RevealedCardsInterface {
  id: number;
  verb: string;
}

function Board({
  board,
  randomVerbsList,
  totalVerbs,
  matchedCards,
  setMatchedCards,
}: BoardProps) {
  const [firstVerbSelected, setFirstVerbSelected] = useState("");
  const [secondVerbSelected, setSecondVerbSelected] = useState("");
  const [revealedCards, setRevealedCards] = useState<RevealedCardsInterface[]>(
    []
  );

  const combinedVerbs = board.flat();

  useEffect(() => {
    if (
      firstVerbSelected &&
      secondVerbSelected &&
      matchedCards.length < totalVerbs / 2
    ) {
      const matchedVerb = randomVerbsList.find(
        (item) =>
          (item.verb === firstVerbSelected &&
            isMatchingPastForm(item, secondVerbSelected)) ||
          (item.verb === secondVerbSelected &&
            isMatchingPastForm(item, firstVerbSelected))
      );

      if (matchedVerb) {
        const data = {
          presentVerb: matchedVerb.verb,
          pastVerb: matchedVerb.forms.past,
        };
        setMatchedCards((prev) => [...prev, data]);
      }
      setTimeout(() => {
        setFirstVerbSelected("");
        setSecondVerbSelected("");
        setRevealedCards([]);
      }, 500);
    }

    if (matchedCards.length === totalVerbs / 2) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
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
    if (
      revealedCards.some((card) => card.id === index) ||
      matchedCards.some(
        (card) => card.presentVerb === verb || card.pastVerb === verb
      )
    ) {
      return;
    }
    if (!firstVerbSelected) {
      setFirstVerbSelected(verb);
      setRevealedCards([{ id: index, verb: verb }]);
    } else if (!secondVerbSelected) {
      setSecondVerbSelected(verb);
      setRevealedCards((prev) => [...prev, { id: index, verb: verb }]);
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
            revealedCards.some((card) => card.id === index)
              ? "verb-selected"
              : ""
          } ${
            matchedCards.some(
              (card) => card.presentVerb === verb || card.pastVerb === verb
            )
              ? "correct"
              : ""
          }`}
        >
          {verb}
        </div>
      ))}
    </div>
  );
}

export default Board;
