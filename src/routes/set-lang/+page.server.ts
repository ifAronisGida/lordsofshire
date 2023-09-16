import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit'

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  setLang: async ({ cookies, request }) => {
    const data = await request.formData();
    const lang = data.get('lang')?.toString();
    //cookies.set('lang', lang!);
    throw redirect(302, '/');
  }
} satisfies Actions;

