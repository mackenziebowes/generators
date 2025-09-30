export const randomFrom = (input: any[]) => {
  return input[Math.floor(Math.random() * input.length)];
};
