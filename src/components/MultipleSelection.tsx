import { useState } from "react";

interface Props {
  title: string;
  values: string[];
  current: string[];
  setCurrent: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultipleSelection: React.FC<Props> = ({
  title,
  values,
  current,
  setCurrent,
}) => {
  const [opened, setOpened] = useState(false);

  const handleChange = (key: string) => {
    const sel = [...current];
    const find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }
    setCurrent(sel);
  };

  return (
    <>
      <div
        className="flex cursor-pointer flex-row flex-nowrap justify-between overflow-hidden"
        onClick={() => setOpened((state) => !state)}
      >
        <div className="pb-1 text-rmturquoise">{title}</div>
        
      </div>
      <div className="flex flex-row flex-nowrap ">
        <div className="flex flex-row flex-wrap gap-1 rounded-md bg-rmdarkblue py-1 px-0 flex-grow">
          {current.length > 0 ? (
            current.map((item) => {
              return (
                <div
                  key={"selected-item-" + item}
                  className="flex w-fit flex-row flex-nowrap gap-1 whitespace-normal rounded-md text-rmgreen border-2 border-rmturquoise px-2"
                >
                  <div>{item}</div>
                  <button
                    onClick={() => {
                      handleChange(item);
                    }}
                    className=" text-rmturquoise "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })
          ) : (
            <div className="px-2 text-rmgreen">Any/All</div>
          )}
        </div>
        <div className="ml-2 cursor-pointer text-rmlightblue"
        onClick={() => setOpened((state) => !state)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`h-4 w-4 ${
              opened ? "-rotate-90" : "rotate-90"
            } translate-y-1`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {opened && (
        <div
          className={`absolute mt-1 flex flex-col rounded-md border-2 z-50 bg-rmdarkblue p-4 text-rmgreen`}
        >
          {values.map((value) => (
            <div
              key={`selectionKey${value}`}
              className=" flex min-w-full flex-row flex-nowrap items-center gap-2 p-1"
            >
              <input
                type="checkbox"
                id={`selectionId${value}`}
                name={value}
                onChange={() => handleChange(value)}
                checked={current.includes(value)}
              />
              <label htmlFor={`selectionId${value}`}>{value}</label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MultipleSelection;
