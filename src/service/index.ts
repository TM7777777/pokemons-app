import axios from 'axios';
import { pick, prop, map, pipe, when } from 'ramda';
import type { Pokemon, PokemonResponseData, TypeResponseData } from '../types';
import { API_TYPE_LIST_URL } from './API_URL';

const filterPokemonData = pick(['id', 'name', 'types', 'stats', 'moves']);

const fetchJson = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(
      `Error fetching ${url}: ${err instanceof Error ? err.message : 'unknown error'}`,
    );
    return null;
  }
};

const fetchPokemonData = pipe(prop<string>('url'), fetchJson, (promise: Promise<any>) =>
  promise.then(when<any, Pokemon>(Boolean, filterPokemonData)),
);

export const fetchListData = async (url: string): Promise<PokemonResponseData | null> => {
  const shortData = await fetchJson(url);
  if (!shortData) return null;

  // @ts-ignore
  const extendedResults = await Promise.all(map(fetchPokemonData, shortData.results));
  return {
    ...shortData,
    results: extendedResults.filter(Boolean),
  };
};

export const fetchTypesData = (): Promise<TypeResponseData | null> =>
  fetchJson(API_TYPE_LIST_URL);
