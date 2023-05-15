// export type Character = {
//     id: number;
//     name: string;
//     status: Status;
//     species: Species;
//     type: string;
//     gender: Gender;
//     origin: {
//       name: string;
//       url: string;
//     };
//     location: {
//       name: string;
//       url: string;
//     };
//     image: string;
//     episode: string[];
//     url: string;
//     created: Date;
//   };

import { possibleSpecies, possibleStatus, possibleGender } from "../types";

import MultipleSelection from "./MultipleSelection";
import TextSearchElement from "./TextSearchElement";

interface Props {
  values: {
    sname: string;
    sspecies: string[];
    sstatus: string[];
    sgender: string[];
  };
  setters: {
    setSname: React.Dispatch<React.SetStateAction<string>>;
    setSspecies: React.Dispatch<React.SetStateAction<string[]>>;
    setSstatus: React.Dispatch<React.SetStateAction<string[]>>;
    setSgender: React.Dispatch<React.SetStateAction<string[]>>;
  };
}

const SearchBar: React.FC<Props> = ({
  values: { sname, sspecies, sstatus, sgender },
  setters: { setSname, setSstatus, setSspecies, setSgender },
}) => {
  return (
    <div className="m-0 flex w-full flex-row justify-between gap-4 bg-rmdarkblue px-4 py-3 text-sm">
      <div className=" border-b-rmpink flex h-full flex-col flex-nowrap border-b-2 p-2">
        <TextSearchElement {...{ value: sname, setter: setSname }} />
      </div>
      <div className=" border-b-rmpink box-border w-full border-b-2 p-2">
        <MultipleSelection
          {...{
            title: "Species",
            values: [...possibleSpecies],
            current: sspecies,
            setCurrent: setSspecies,
          }}
        />
      </div>
      <div className=" border-b-rmpink box-border w-full border-b-2 p-2">
        <MultipleSelection
          {...{
            title: "Status",
            values: [...possibleStatus],
            current: sstatus,
            setCurrent: setSstatus,
          }}
        />
      </div>
      <div className=" border-b-rmpink box-border w-full border-b-2 p-2">
        <MultipleSelection
          {...{
            title: "Gender",
            values: [...possibleGender],
            current: sgender,
            setCurrent: setSgender,
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
