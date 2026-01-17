import { useState, useEffect } from "react";
import { Card } from "./components/card";
import { GameHeader } from "./components/GameHeader";
import { WinMessage } from "./components/WinMessage";

const cardValues = [
  "🍎","🍌","🍇","🍊","🍓","🥝","🍑","🍒",
  "🍎","🍌","🍇","🍊","🍓","🥝","🍑","🍒",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const shuffled = shuffleArray(cardValues);
    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(finalCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || isLocked) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const updatedFlipped = [...flippedCards, card.id];
    setFlippedCards(updatedFlipped);

    if (updatedFlipped.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = updatedFlipped;
      const firstCard = updatedCards[firstId];
      const secondCard = updatedCards[secondId];

      if (firstCard.value === secondCard.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstId, secondId]);
          setScore((prev) => prev + 1);
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              updatedFlipped.includes(c.id)
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isGameComplete = matchedCards.length === cardValues.length;

  return (
    <div className="app">
      <GameHeader score={score} move={moves} onReset={initializeGame} />
      {isGameComplete && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
