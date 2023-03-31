import fetchCharacters from "../queries";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "./CharacterCard";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { type CharactersResponse, possibleSpecies, Character } from "../types";

const CharactersMural = () => {
  const { data, error, isSuccess, isLoading, isFetching, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: () => fetchCharacters("https://rickandmortyapi.com/api/character"),
  });

  const [list, setList] = useState<Character[]>([]);

  const [searchName, setSearchName] = useState<string>("");
  const [species, setSpecies] = useState<string[]>([]);

  useEffect(() => {
    if (!data) return;

    const filteredList = data.results.filter((item) => {
      const byName =
        searchName.length > 0
          ? item.name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())
          : true;
      const bySpecies =
        species.length > 0 ? species.includes(item.species) : true;
      return byName && bySpecies;
    });

    setList(filteredList);
  }, [data, searchName, species]);

  return (
    <>
      <SearchBar {...{ searchName, setSearchName, species, setSpecies }} />
      <div className="flex w-full flex-row flex-wrap">
        {isError &&
          (error instanceof Error ? (
            <p>{error.message}</p>
          ) : (
            <p>Something went wrong</p>
          ))}
        {(isFetching || isLoading) && <p>Getting the list of characters...</p>}
        {isSuccess &&
          list.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
    </>
  );
};

export default CharactersMural;
