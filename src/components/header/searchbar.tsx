import React, {
  useState,
  useEffect,
  useTransition,
  useDeferredValue,
} from "react";

import search_icon from "../../assets/search_icon.svg";
import close_icon from "../../assets/close_icon.svg";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const deferredSearchValue = useDeferredValue(searchValue);
  const [isPending, startTransition] = useTransition();

  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    if (result.length > 0 && deferredSearchValue === "") {
      onClearSearch();
    } else if (deferredSearchValue && !isPending) {
      startTransition(() => {
        //wait for 1 second
        const waiting = new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        });
        waiting.then(() => {
          // push one item to result array
          setResult((prev) => [...prev, { id: 1, name: deferredSearchValue }]);
        });
      });
    }
  }, [deferredSearchValue]);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onResultSelect = () => {
    console.log(deferredSearchValue);
  };

  const onClearSearch = () => {
    setSearchValue("");
    setResult([]);
  };

  type ResultItemProps = {
    item: any;
  };

  const ResultItem = ({ item }: ResultItemProps) => {
    return (
      <button
        className="w-78 h-max px-2 flex gap-1 justify-start items-center hover:underline"
        onClick={onResultSelect}
      >
        <img src={search_icon} alt="search_icon" className="w-6 h-6" />
        <p className="text-secondary font-poppins font-extralight text-xs">
          {item.name}
        </p>
      </button>
    );
  };

  const ResultContainer = () => {
    return (
      <div className="max-h-48 absolute top-10 mt-[-4px] left-0 w-80 h-fit bg-white border-secondary border-2 border-t-0 rounded-b-md shadow-lg py-2 flex flex-col gap-2 overflow-scroll overflow-x-hidden">
        {result.map((item, index) => (
          <ResultItem key={index} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="w-80 h-10 px-2 border-secondary border-2 rounded-md bg-white flex gap-2 align-middle justify-between  force-within:shadow-lg force-within:shadow-black">
        <img src={search_icon} alt="search_icon" className="w-8 h-8 " />
        <input
          type="text"
          value={searchValue || ""}
          placeholder="Search City or Postcode"
          className="w-full h-8 bg-transparent border-none outline-none text-left font-poppins font-normal placeholder:text-center"
          onChange={onSearchInputChange}
        />
        {result?.length > 0 ? (
          <button className="w-8 h-8 " onClick={onClearSearch}>
            <img src={close_icon} alt="close_icon" className="w-8 h-8" />
          </button>
        ) : null}
      </div>
      {result?.length > 0 ? <ResultContainer /> : null}
    </div>
  );
};

export default Searchbar;
