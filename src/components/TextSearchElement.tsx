import { useEffect, useState } from "react";

interface Props {
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

const TextSearchElement: React.FC<Props> = ({ value, setter }) => {
  const [newValue, setNewValue] = useState<string>(value);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setter(newValue);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [newValue, setter]);

  const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  return (
    <>
      <p className="pb-1 text-rmturquoise">Name</p>
      <input
        value={newValue}
        onChange={handleSearchByName}
        type="text"
        name="name"
        className="rounded-md bg-rmdarkblue text-rmgreen p-1 focus:outline-none"
        placeholder="Search by name..."
      />
    </>
  );
};

export default TextSearchElement;
