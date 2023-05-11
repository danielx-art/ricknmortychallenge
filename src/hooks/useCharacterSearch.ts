import { useEffect, useState } from "react";
import { Character, CharactersResponse } from "../types";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";

const useCharacterSearch = (
  data: InfiniteData<CharactersResponse> | undefined,
) => {
  const [sname, setSname] = useState<string>("");
  const [sspecies, setSspecies] = useState<string[]>([]);
  const [sstatus, setSstatus] = useState<string[]>([]);
  const [sgender, setSgender] = useState<string[]>([]);
  const [list, setList] = useState<Character[]>([]);

  useEffect(() => {
    
    if (!data) return;

    const filteredList = data.pages.flatMap((page)=>{
      const filteredPage = page.results.filter((item) => {
        const byName =
          sname.length > 0
            ? item.name.toLocaleLowerCase().includes(sname.toLocaleLowerCase())
            : true;
        const bySpecies =
          sspecies.length > 0 ? sspecies.includes(item.species) : true;
        const byStatus =
          sstatus.length > 0 ? sstatus.includes(item.status) : true;
        const byGender =
          sgender.length > 0 ? sgender.includes(item.gender) : true;
        return byName && bySpecies && byStatus && byGender;
      });
      return filteredPage;
    })

    setList(filteredList);
  }, [data, sname, sspecies, sstatus, sgender]);

  return {
    list,
    searchParams: {
      values: { sname, sstatus, sspecies, sgender },
      setters: { setSname, setSstatus, setSspecies, setSgender },
    },
  };
};

export type useCharacterSearchResults = ReturnType<typeof useCharacterSearch>;

export type searchParamsType = useCharacterSearchResults["searchParams"];

export default useCharacterSearch;
