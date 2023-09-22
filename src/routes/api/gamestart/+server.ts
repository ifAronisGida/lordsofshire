import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
  return json({ status: 'Sent game start ' })
}

export const GET: RequestHandler = async () => {
  return new Response();
};
