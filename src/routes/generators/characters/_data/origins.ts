const directions = ["North", "East", "South", "West"];
const distances = ["The", "The Near", "The Mid", "The Far"];

export const origins = () => {
  const nested = distances.map((distance) => {
    return directions.map((direction) => {
      return `${distance} ${direction}`;
    });
  });
  return nested.flat();
};
