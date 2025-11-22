export interface ReadingResult {
  cardId: number;
  message: string;
  keywords?: string[]; // Optional now as we might just use the main text
}

export enum CardState {
  Idle,
  Shuffling,
  Selecting,
  Revealing,
  Revealed
}