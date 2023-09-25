import type { RequestHandler } from './$types';
import type { GameData } from '$lib/types/game';
import { isGameData } from '$lib/types/game';
import { error, json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';

export const POST: RequestHandler = async ({ request, params }) => {
  const requestJSON = await request.json();
  const { gameid } = params;
  const { gameData }: { gameData: GameData } = requestJSON;

  if (!isGameData(gameData)) throw error(400, 'Invalid game data!');

  const newDoc = adminDB.doc('games/' + gameid);
  await newDoc.set(gameData);
  console.log('Game created with data: ', gameData);

  return json({ status: 'Game created with ID: ' + gameid })
}

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  const requestJSON = await request.json();
  const { gameid } = params;
  return json({ status: 'Game started!', gameid, requestJSON })
}


