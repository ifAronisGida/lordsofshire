import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  return {
    gameid: params.gameid
  };
}) satisfies PageLoad;