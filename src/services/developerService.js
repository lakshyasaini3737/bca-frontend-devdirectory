import { DEVELOPERS } from '../data/developers.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const getDevelopers = async () => { await wait(450); return DEVELOPERS; };

export const getDeveloper = async (id) => {
  await wait(350);
  const dev = DEVELOPERS.find((d) => d.id === Number(id));
  if (!dev) throw new Error('Developer not found');
  return dev;
};