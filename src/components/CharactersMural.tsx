import { fetchCharacters } from "../queries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import CharacterCard from "./CharacterCard";
import SearchBar from "./SearchBar";
import { useCallback, useEffect, useRef, useState } from "react";
import { type CharactersResponse, possibleSpecies, Character } from "../types";
import useCharacterSearch from "../hooks/useCharacterSearch";
import useResizeObserver from "../hooks/useResizeObserver";

const CharactersMural = () => {
  const {
    data,
    error,
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

  const getMore = useCallback(async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (hasNextPage) await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  const ref = useResizeObserver<HTMLDivElement>(getMore);

  useEffect(() => {
    document.addEventListener("scroll", getMore);
    return () => {
      document.removeEventListener("scroll", getMore);
    };
  }, [fetchNextPage, getMore, hasNextPage, isFetching]);

  const {
    list,
    searchParams: { values, setters },
  } = useCharacterSearch(data);

  const [showName, setShowName] = useState<boolean>(false);

  return (
    <div className="relative mb-20">
      <SearchBar {...{ values, setters }} />

      <div className="flex w-full flex-row-reverse px-2 pb-1.5 text-sm">
        <div className="w-fit px-2">
          <input
            className="ml-3 mr-1"
            type="checkbox"
            id="showNameCheckbox"
            checked={showName}
            onChange={() => setShowName((prev) => !prev)}
          />
          <label htmlFor="showNameCheckbox">Show characters&apos; names</label>
        </div>
      </div>

      <div
        ref={ref}
        className="relative mx-auto flex w-[100%] flex-row flex-wrap justify-center px-2"
      >
        {isError &&
          (error instanceof Error ? (
            <div className="absolute mx-auto rounded-md bg-slate-100 p-5">
              <p>{error.message}</p>
            </div>
          ) : (
            <div className="absolute mx-auto rounded-md bg-slate-100 p-5">
              <p>Something went wrong {":("}</p>
            </div>
          ))}
        {(isFetching || isLoading) && (
          <div className="absolute mx-auto rounded-md bg-slate-100 p-5">
            <p>Getting the list of characters...</p>
          </div>
        )}
        {isSuccess &&
          list.map((character) => (
            <div
              key={character.id}
              className="relative w-[100px] min-w-[100px]"
            >
              <CharacterCard character={character} showName={showName} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CharactersMural;
