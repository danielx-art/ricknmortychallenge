import fetchCharacters from "../queries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import CharacterCard from "./CharacterCard";
import SearchBar from "./SearchBar";
import { useEffect, useRef, useState } from "react";
import { type CharactersResponse, possibleSpecies, Character } from "../types";
import useCharacterSearch from "../hooks/useCharacterSearch";

const CharactersMural = () => {
  const {
    data,
    error,
    status,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["characters"],

    ({ pageParam = 1 }) => fetchCharacters(pageParam),

    {
      getNextPageParam: (lastPage: CharactersResponse) => {
        const previousPage = lastPage.info.prev
          ? Number(lastPage.info.prev.split("=")[1])
          : 0;
        const currentPage = previousPage + 1;

        if (currentPage === lastPage.info.pages) return false;
        return currentPage + 1;
      },
    }
  );

  useEffect(() => {
    async function getMore() {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;


      if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        if (hasNextPage) await fetchNextPage();
      }
    }

    getMore();

    // const onScroll = async () => {

    //   const { scrollHeight, scrollTop, clientHeight } =
    //     document.documentElement;

    //   if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
    //     if (hasNextPage) await fetchNextPage();
    //   }
    // };

    // document.addEventListener("scroll", onScroll);
    // return () => {
    //   document.removeEventListener("scroll", onScroll);
    // };
  }, [status]);

  const {
    list,
    searchParams: { values, setters },
  } = useCharacterSearch(data);

  return (
    <div className="relative">
      <SearchBar {...{ values, setters }} />
      <div className="relative mx-auto flex w-[100%] flex-row flex-wrap justify-center border-2 border-red-500 p-2">
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
              className="relative w-[100px] min-w-[100px]"
            >
              <CharacterCard character={character} />
            </div>
          ))}
      </div>
      <button>MORE</button>
    </div>
  );
};

export default CharactersMural;
