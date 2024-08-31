import { MatchedCardsInterface } from "../interfaces/MatchedCardsInterface";

import "../styles/MatchedPairsList.css";

interface MatchedPairsListProps {
  matchedCards: MatchedCardsInterface[];
}

function MatchedPairsList({ matchedCards }: MatchedPairsListProps) {
  return (
    <div className="partner-list">
      {matchedCards.map((item, index) => (
        <div key={index}>
          presente: {item.presentVerb} --- pasado: {item.pastVerb}
        </div>
      ))}
    </div>
  );
}

export default MatchedPairsList;
