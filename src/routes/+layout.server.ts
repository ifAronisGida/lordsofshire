import type { LayoutServerLoad } from './$types';


export const load = (async ({ cookies }) => {
  //const lang: string = cookies.get('lang') || 'hu';
  const lang = 'hu';
  return {
    lang
  };
}) satisfies LayoutServerLoad;


