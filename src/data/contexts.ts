// src/data/contexts.ts
export type ContextType = {
  id: string;
  name: string;
};

export const initialContexts: ContextType[] = [
  { id: "1", name: "Text" },
  { id: "2", name: "Email" },
  { id: "3", name: "PA" },
];
