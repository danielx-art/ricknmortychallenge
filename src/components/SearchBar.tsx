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
    <div className="m-0 flex w-full flex-row justify-between gap-4 bg-white px-4 py-3 text-sm">
      <div className="border-slate flex h-full flex-col flex-nowrap rounded-sm border-2 p-2">
        <TextSearchElement {...{ value: sname, setter: setSname }} />
      </div>
      <div className="border-slate box-border w-full rounded-sm border-2 p-2">
        <MultipleSelection
          {...{
            title: "Species",
            values: [...possibleSpecies],
            current: sspecies,
            setCurrent: setSspecies,
          }}
        />
      </div>
      <div className="border-slate box-border w-full rounded-sm border-2 p-2">
        <MultipleSelection
          {...{
            title: "Status",
            values: [...possibleStatus],
            current: sstatus,
            setCurrent: setSstatus,
          }}
        />
      </div>
      <div className="border-slate box-border w-full rounded-sm border-2 p-2">
        <MultipleSelection
          {...{
            title: "Gender",
            values: [...possibleGender],
            current: sgender,
            setCurrent: setSgender,
          }}
        />
      </div>
      {/* <div className="flex h-full flex-col flex-nowrap items-center">
        <p className="inline-block pl-[0.15rem] hover:cursor-pointer">
          Dead/Alive
        </p>
        <input
          className="checked:bg-primary checked:after:bg-primary checked:focus:border-primary checked:focus:bg-primary dark:checked:bg-primary dark:checked:after:bg-primary mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
      </div> */}
    </div>
  );
};

export default SearchBar;
