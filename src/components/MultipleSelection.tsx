import { useEffect, useState } from "react";

interface Props {
  values: string[];
  current: string[];
  setCurrent: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultipleSelection: React.FC<Props> = ({
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
    <div>
      <p>Species</p>
      <button onClick={() => setOpened((state) => !state)}>{">"}</button>
      {opened && (
        <div className="absolute grid grid-cols-3 bg-white p-4 text-black">
          {values.map((value) => (
            <div
              key={`selectionKey${value}`}
              className="flex items-center gap-2 p-1"
            >
              <input
                type="checkbox"
                id={`selectionId${value}`}
                name={value}
                onChange={() => handleChange(value)}
              />
              <label htmlFor={`selectionId${value}`}>{value}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleSelection;
