import type { RequestHandler } from './$types';
import type { GameData } from '$lib/types/game';
import { error, json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';



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

  //if (gameData.players.length >= 3) throw error(400, 'Game is full!');

  if (gameData.isLive) throw error(400, 'Game has already started!');

  gameData.players.push({ uid, score: 0, username, ready: false, answerID: '' });
  await gameRef.set(gameData);

  return json({ status: `Player ${uid} joined game ${gameid}!` });
}


