export const shuffleArray = <T>(array: T[]) => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
