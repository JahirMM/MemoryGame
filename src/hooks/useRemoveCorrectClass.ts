import { Dispatch, SetStateAction } from "react";
import { MatchedCardsInterface } from "../interfaces/MatchedCardsInterface";

export const useRemoveCorrectClass = (
  matchedCards: MatchedCardsInterface[],
  setMatchedCards: Dispatch<SetStateAction<MatchedCardsInterface[]>>
) => {
  const removeCorrectClass = () => {
    const selectedCards = Array.from(
      document.getElementsByClassName("verb-selected")
    );
    selectedCards.forEach((item) => {
      item.classList.remove("verb-selected");
    });
    const correctCards = Array.from(document.getElementsByClassName("correct"));
    correctCards.forEach((item) => {
      item.classList.remove("correct");
    });

    if (matchedCards.length > 0) {
      setMatchedCards([]);
    }
  };

  return { removeCorrectClass };
};
