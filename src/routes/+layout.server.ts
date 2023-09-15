import type { LayoutServerLoad } from './$types';


export const load = (async ({ cookies }) => {
  const lang: string = cookies.get('lang') || 'en';
  return {
    lang
  };
}) satisfies LayoutServerLoad;


