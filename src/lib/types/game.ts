import type { QuestionAnswer } from "./question";

export interface GameData {
  turn: number;
  password: string;
  isLive: boolean;
  players: Player[];
  question: { question: string; id: string; answers: QuestionAnswer[] };
  turnLengthSeconds: number;
  maxRounds: number;
}

interface Player {
  uid: string;
  score: number;
  username: string;
  ready: boolean;
  answerID: string;
  photoURL: string;
}

export function isGameData(object: any): object is GameData {
  return 'password' in object && 'isLive' in object && 'players' in object && 'turn' in object && 'question' in object && 'turnLengthSeconds' in object && 'maxRounds' in object;
}
