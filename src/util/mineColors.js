export const mineColor = () => {
  let colors = ["orange"];
  return colors[Math.floor(Math.random() * colors.length)];
};