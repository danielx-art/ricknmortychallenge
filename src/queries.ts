import { CharactersResponse } from "./types";

export default async function fetchCharacters(
  page: number
): Promise<CharactersResponse> { 
  const results =  await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(res => res.json());
  return results;
}