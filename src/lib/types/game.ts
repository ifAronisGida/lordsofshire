export interface GameData {
  password: string;
  isLive: boolean;
  players: [{ uid: string; score: number; username: string; }];
}

export function isGameData(object: any): object is GameData {
  return 'password' in object && 'isLive' in object && 'players' in object;
}