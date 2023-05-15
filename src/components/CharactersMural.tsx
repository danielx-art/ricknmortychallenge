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
    <div className="relative mb-20 bg-rmdarkblue min-h-full">
      <SearchBar {...{ values, setters }} />

      <div className="flex w-full flex-row-reverse px-2 pb-3 text-sm text-rmturquoise">
        <div className="relative w-fit px-2">
          <input
            className="checkbox ml-3 mr-1 h-3 w-3 appearance-none rounded-full border-2 border-rmlightblue checked:scale-150 checked:border-dotted checked:border-rmyellow checked:border-[1px]"
            type="checkbox"
            id="showNameCheckbox"
            checked={showName}
            onChange={() => setShowName((prev) => !prev)}
          />
          <label htmlFor="showNameCheckbox">Show characters&apos; names</label>
          <div className="absolute text-rmyellow -top-0.5 translate-x-2 text-sm opacity-0 transition check">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="mx-auto flex w-full flex-row flex-wrap justify-center px-2"
      >
        {isError &&
          (error instanceof Error ? (
            <div className="absolute mx-auto rounded-md bg-rmdarkblue p-5 text-rmpink">
              <p>{error.message}</p>
            </div>
          ) : (
            <div className="absolute mx-auto rounded-md bg-rmdarkblue p-5 text-rmpink">
              <p>Something went wrong {":("}</p>
            </div>
          ))}
        {(isFetching || isLoading) && (
          <div className="absolute mx-auto rounded-md bg-rmdarkblue p-5 text-rmpink">
            <p>Getting the list of characters...</p>
          </div>
        )}
        {isSuccess &&
          data.pages[0] &&
          data.pages[0].info.count &&
          list.map((character) => (
            <div
              key={character.id}
              className="relative w-[100px] min-w-[100px] shadow-sm shadow-rmturquoise"
            >
              <CharacterCard
                character={character}
                showName={showName}
                total={data.pages[0]?.info.count as number}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CharactersMural;
