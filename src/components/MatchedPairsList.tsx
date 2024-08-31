import { MatchedCardsInterface } from "../interfaces/MatchedCardsInterface";

import "../styles/MatchedPairsList.css";

interface MatchedPairsListProps {
  matchedCards: MatchedCardsInterface[];
}

function MatchedPairsList({ matchedCards }: MatchedPairsListProps) {
  return (
    <div className="pairs-list">
      <h2>Pairs List</h2>
      {matchedCards.map((item, index) => (
        <div key={index} className="pair-item">
          <span className="pair-item-title">Verb {index + 1}</span>
          <div className="pair-item-content">
            <span className="pair-item-present">
              Present: {item.presentVerb}
            </span>
            <span className="pair-item-past">Past: {item.pastVerb}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchedPairsList;
