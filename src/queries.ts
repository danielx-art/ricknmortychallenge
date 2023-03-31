import { CharactersResponse } from "./types";

export default async function fetchCharacters(
  url: string
): Promise<CharactersResponse> {
  const response = await fetch(url);
  return await response.json();
}
