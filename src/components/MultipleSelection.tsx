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

  //   //testing
  //   useEffect(() => {
  //     console.log(current);
  //   }, [current]);

  return (
    <>
      <div
        className="flex cursor-pointer flex-row flex-nowrap justify-between overflow-hidden"
        onClick={() => setOpened((state) => !state)}
      >
        <div className="pb-1">{title}</div>
        <div className="">
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
      <div className="flex max-w-xs flex-row flex-wrap gap-1 rounded-md bg-gray-200 p-1">
        {current.length > 0 ? (
          current.map((item) => {
            return (
              <div
                key={"selected-item-" + item}
                className="flex w-fit flex-row flex-nowrap gap-1 whitespace-normal rounded-sm bg-gray-200 px-2"
              >
                <div>{item}</div>
                <button
                  onClick={() => {
                    handleChange(item);
                  }}
                  className=""
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
          <div className="px-2">Any/All</div>
        )}
      </div>

      {opened && (
        <div
          className={`absolute mt-1 grid rounded-md border-2 bg-gray-200 ${
            values.length > 5 ? "grid-cols-3" : "grid-cols-1"
          } z-50 bg-white p-4 text-black`}
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
