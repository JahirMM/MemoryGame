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
  // Combina todos los verbos en una sola lista
  const combinedVerbs = board.flat();

  useEffect(() => {
    const totalcards = Array.from(document.getElementsByClassName("correct"));
    if (firstVerbSelected !== "" && secondVerbSelected !== "") {
      const matchedVerb = randomVerbsList.find(
        (item) =>
          (item.verb === firstVerbSelected &&
            isMatchingPastForm(item, secondVerbSelected)) ||
          (item.verb === secondVerbSelected &&
            isMatchingPastForm(item, firstVerbSelected))
      );

      const cards = Array.from(
        document.getElementsByClassName("verb_selected")
      );
      if (matchedVerb) {
        console.log("Match found!");
        setFirstVerbSelected("");
        setSecondVerbSelected("");
        cards.forEach((card) => {
          card.classList.remove("verb_selected");
          card.classList.add("correct");
        });
      } else {
        console.log("Match not found!dd ");
        setFirstVerbSelected("");
        setSecondVerbSelected("");
        cards.forEach((card) => {
          card.classList.remove("verb_selected");
        });
      }
    }
    if (combinedVerbs.length === totalcards.length) {
      alert("GANASTE");
    }
  }, [firstVerbSelected, secondVerbSelected, randomVerbsList]);

  const isMatchingPastForm = (
    verb: RandomVerbsListInterface,
    selectedVerb: string
  ) => {
    return verb.forms.past === selectedVerb;
  };

  const handleClick = (verb: string, event: any) => {
    const id = event.target.id;
    const card = document.getElementById(id);
    if (!firstVerbSelected) {
      setFirstVerbSelected(verb);
      card?.classList.add("verb_selected");
    } else if (!secondVerbSelected) {
      card?.classList.add("verb_selected");
      setSecondVerbSelected(verb);
    }
  };

  return (
    <div className="board">
      {combinedVerbs.map((verb, index) => (
        <div
          key={index}
          id={index + "verb"}
          onClick={(event) => handleClick(verb, event)}
          className="board-card"
        >
          {verb}
        </div>
      ))}
    </div>
  );
}

export default Board;
