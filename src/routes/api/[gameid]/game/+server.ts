import { adminDB } from '$lib/server/admin';
import type { GameData } from '$lib/types/game';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { setTimeout } from 'timers/promises';

// interface GameState {
//   gameID: string;
//   busy: boolean;
// }


//TODO: validate gamestate from db
//let gameStates: GameState[] =[];

export const GET: RequestHandler = async () => {
  return new Response();
};

//TODO: validate uid with session cookie
export const PATCH: RequestHandler = async ({ request, params }) => {
  const requestJSON = await request.json();
  const { gameid } = params;
  const { uid, ready } = requestJSON

  const gameRef = adminDB.doc('games/' + gameid);
  const gameDoc = await gameRef.get();
  const gameData = gameDoc.data() as GameData;
  const player = gameData.players.find(player => player.uid === uid);

  if (!player) throw error(400, 'Player not found!');
  if (gameData.turn !== 0) throw error(400, 'Game has already started!');

  player.ready = ready;
  gameRef.set(gameData);

  //need a little delay to make sure updated data is read before deciding if game can start
  await setTimeout(1000);

  const updatedGameDoc = await gameRef.get();
  const updatedGameData = updatedGameDoc.data() as GameData;

  //check if all players are ready and start game if everyone is ready for 3 seconds
  for (let i = 0; i < 3; i++) {
    const updatedGameDoc = await gameRef.get();
    const updatedGameData = updatedGameDoc.data() as GameData;
    if (updatedGameData.players.find(player => !player.ready)) return json({ status: 'Waiting for other players...' });
    await setTimeout(1000);
  }


  startNextRound(gameid, updatedGameData.turnLengthSeconds, updatedGameData.maxRounds);
  //gameStates.push({ gameID: gameid, busy: false });

  return json({ status: 'Game starting...' });
}

//TODO: validate uid with session cookie
export const POST: RequestHandler = async ({ request, params }) => {
  const requestJSON = await request.json();
  const { gameid } = params;
  const { uid, answerID } = requestJSON

  //check if game is busy
  //if (gameStates.find(gameState => gameState.gameID === gameid)?.busy) throw error(400, 'Game is busy!');

  const gameRef = adminDB.doc('games/' + gameid);
  const gameDoc = await gameRef.get();
  const gameData = gameDoc.data() as GameData;
  const player = gameData.players.find(player => player.uid === uid);

  if (!player) throw error(400, 'Player not found!');

  player.answerID = answerID;
  await gameRef.set(gameData);
  console.log(`${new Date().toISOString()}-${gameid}: ${uid} answer ${answerID} submitted!`);
  return json({ status: 'Answer submitted!' });
}

async function startNextRound(gameID: string, turnLengthSeconds: number, maxRounds: number) {
  const gameRef = adminDB.doc('games/' + gameID);
  const gameDoc = await gameRef.get();
  const gameData = gameDoc.data() as GameData;

  for (const player of gameData.players) {
    if (player.answerID === '1') player.score = player.score + 100;
    player.answerID = '';
  }

  // const questionsRef = adminDB.collection('questions');
  // const questionList = await questionsRef.listDocuments();
  // console.log(questionList);

  if (gameData.turn === maxRounds) {
    //save game data before ending game
    await gameRef.set(gameData);
    await endGame(gameID);
    return;
  }

  gameData.turn = gameData.turn + 1;
  if (gameData.turn === 1) gameData.isLive = true;

  //TODO: get question from database
  gameData.question = { question: 'What is the meaning of life?', answers: [{ id: '0', value: '32' }, { id: '1', value: '42' }, { id: '2', value: '32' }, { id: '3', value: '42' }] };
  console.log(`${new Date().toISOString()}-${gameID}: Starting turn ${gameData.turn}...`);
  await gameRef.set(gameData);

  startCountdown(gameID, turnLengthSeconds, gameData.turn, maxRounds);
}

async function startCountdown(gameID: string, turnLengthSeconds: number, currentRound: number, maxRounds: number) {

  console.log(`${new Date().toISOString()}-${gameID}: Countdown for ${turnLengthSeconds} seconds started...`);
  await setTimeout(turnLengthSeconds * 1000);
  console.log(`${new Date().toISOString()}-${gameID}: Countdown finished, ending round...`);

  //check if next round has started already
  const gameRef = adminDB.doc('games/' + gameID);
  const gameDoc = await gameRef.get();
  const gameData = gameDoc.data() as GameData;
  if (gameData.turn !== currentRound) {
    console.log(`${new Date().toISOString()}-${gameID}: Next round has already started, end timer...`);
    return;
  }



  startNextRound(gameID, turnLengthSeconds, maxRounds);
}

async function endGame(gameID: string) {
  console.log(`${new Date().toISOString()}: Ending game...`);
  const gameRef = adminDB.doc('games/' + gameID);
  const gameDoc = await gameRef.get();
  const gameData = gameDoc.data() as GameData;
  gameData.isLive = false;
  await gameRef.set(gameData);
  console.log(`${new Date().toISOString()}: Game ended!`);
}