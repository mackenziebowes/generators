export const createPattern = (title: string) => {
  return {
    title,
    addDescription: (description: string) => {
      return { title, description };
    },
  };
};

export const addQuote = (pattern: Pattern, quote: string) => {
  return {
    ...pattern,
    quote,
  };
};

export type Pattern = { title: string; description: string; quote?: string };

export type DharmicConflict = { internal: Pattern; external: Pattern };
