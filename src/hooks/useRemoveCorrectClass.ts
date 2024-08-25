export const useRemoveCorrectClass = () => {
  const removeCorrectClass = () => {
    const correctCards = Array.from(document.getElementsByClassName("correct"));
    correctCards.forEach((item) => {
      item.classList.remove("correct");
    });

    const selectedCards = Array.from(
      document.getElementsByClassName("verb-selected")
    );
    selectedCards.forEach((item) => {
      item.classList.remove("verb-selected");
    });
  };

  return { removeCorrectClass };
};
