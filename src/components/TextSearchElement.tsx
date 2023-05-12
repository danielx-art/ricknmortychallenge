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
      <p className="pb-1">Name</p>
      <input
        value={newValue}
        onChange={handleSearchByName}
        type="text"
        name="name"
        className="rounded-md bg-gray-200 p-1 "
        placeholder="Search by name..."
      />
    </>
  );
};

export default TextSearchElement;
