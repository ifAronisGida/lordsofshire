import type { RequestHandler } from './$types';
import type { GameData } from '$lib/types/game';
import { error, json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';
import { setTimeout } from 'timers/promises';


export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  const requestJSON = await request.json();
  const { gameid } = params;
  const { uid, username } = requestJSON

  const gameRef = adminDB.doc('games/' + gameid);
  const gameDoc = await gameRef.get();
  const gameData = gameDoc.data() as GameData;

  if (gameData.players.find(player => player.uid === uid)) return json({ status: 'Player already in game!' });

  if (gameData.players.length >= 3) throw error(400, 'Game is full!');

  if (gameData.isLive) throw error(400, 'Game has already started!');

  gameData.players.push({ uid, score: 0, username });
  await gameRef.set(gameData);

  const updatedGameDoc = await gameRef.get();
  const updatedGameData = updatedGameDoc.data() as GameData;

  if (updatedGameData.players.length > 1) {
    await startFirstRound(gameid);
  }

  return json({ status: `Player ${uid} joined game ${gameid}!` });
}

async function startFirstRound(gameID: string) {
  const gameRef = adminDB.doc('games/' + gameID);
  const gameDoc = await gameRef.get();
  const gameData = gameDoc.data() as GameData;

  const questionsRef = adminDB.collection('questions');
  const questionList = await questionsRef.listDocuments();
  console.log(questionList);

  startCountdown(gameID, 10);

  gameData.turn = 1;
  gameData.isLive = true;
  gameData.question = { question: 'What is the meaning of life?', answers: [{ id: 0, value: '32' }, { id: 1, value: '42' }, { id: 2, value: '32' }, { id: 3, value: '42' }] };
  await gameRef.set(gameData);
}

async function startCountdown(gameID: string, seconds: number) {
  for (let i = seconds; i > 0; i--) {
    await setTimeout(1000);
    const gameRef = adminDB.doc('games/' + gameID);
    const gameDoc = await gameRef.get();
    const gameData = gameDoc.data() as GameData;
    gameData.remainingSeconds = i;
    await gameRef.set(gameData);
    console.log(`${new Date().toISOString()} Countdown:  ${i}`);
  }

}

