export interface GameData {
  turn: number;
  password: string;
  isLive: boolean;
  players: Player[];
  question: { question: string; answers: QuestionAnswer[] };
  turnLengthSeconds: number;
  maxRounds: number;
}

interface QuestionAnswer {
  id: number;
  value: string;
}

interface Player {
  uid: string;
  score: number;
  username: string;
  ready: boolean;
}

export function isGameData(object: any): object is GameData {
  return 'password' in object && 'isLive' in object && 'players' in object;
}
