export const useCapitalize = () => {
  const capitalize = (words) => {
    const arr = words.split(" ");
    const newArr = arr.map((word) => {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    });
    return newArr.join(" ");
  };
  return { capitalize };
};
