export const useRemoveCorrectClass = () => {
  const removeCorrectClass = () => {
    const cards = Array.from(document.getElementsByClassName("correct"));
    cards.forEach((item) => {
      item.classList.remove("correct");
    });
  };

  return { removeCorrectClass };
};
