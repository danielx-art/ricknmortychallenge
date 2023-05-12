import type { Character, CharactersResponse } from "./types";

export async function fetchCharacters(
  page: number
): Promise<CharactersResponse> {
  const results = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  ).then((res) => res.json());
  return results;
}

export async function fetchSingleCharacter(id: string): Promise<Character> {
  const results = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  ).then((res) => res.json());
  return results;
}
