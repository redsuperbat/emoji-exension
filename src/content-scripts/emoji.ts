export interface Emoji {
  slug: string;
  character: string;
}

export type InsertFunc = (emoji: string, replace: string) => void;
