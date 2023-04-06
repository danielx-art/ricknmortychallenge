import fetchCharacters from "../queries";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "./CharacterCard";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { type CharactersResponse, possibleSpecies, Character } from "../types";
import useCharacterSearch from "../hooks/useCharacterSearch";

const CharactersMural = () => {
  const queryUri = "https://rickandmortyapi.com/api/character";

  const { data, error, isSuccess, isLoading, isFetching, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: () => fetchCharacters(queryUri),
  });

  const {
    list,
    searchParams: { values, setters },
  } = useCharacterSearch(data);

  return (
    <div className="relative">
      <SearchBar {...{ values, setters }} />
      <div className="relative mx-auto flex w-[98%] flex-row flex-wrap justify-start">
        {isError &&
          (error instanceof Error ? (
            <p>{error.message}</p>
          ) : (
            <p>Something went wrong</p>
          ))}
        {(isFetching || isLoading) && <p>Getting the list of characters...</p>}
        {isSuccess &&
          list.map((character) => (
            <div
              key={character.id}
              className="relative w-[14.2857%] min-w-[100px]"
            >
              <CharacterCard character={character} />
            </div>
          ))}
        <div className="absolute bottom-0 right-0 flex h-[33.3%] w-[14.2857%] min-w-[100px] flex-col items-center justify-center">
          previous / next
        </div>
      </div>
    </div>
  );
};

export default CharactersMural;
