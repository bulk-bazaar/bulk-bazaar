import React, {useEffect, useRef, useState} from "react";
import {createSearchParams, Link, useNavigate} from "react-router-dom";
import {ReactComponent as Search} from "../../assets/search.svg";
import useSearchQuery from "../hooks/useSearchQuery";
import useVisibility from "../hooks/useVisibility";
import {Product} from "../../components1/redux/interfaces";

const ItemSearch: React.FC<{ product: Product }> = ({ product }) => {
  // const dateFormated = useDate(product.date);
  return (
    <li key={product.id} className="py-2">
      <Link
        to={`/task/${product.id}`}
        className="flex justify-between transition hover:text-rose-500 dark:hover:text-slate-200"
      >
        <span>{product.title}</span>
        <span>{product.description}</span>
      </Link>
    </li>
  );
};

const SearchField: React.FC = () => {
  const navigate = useNavigate();

  const searchResultsRef = useRef<HTMLInputElement>(null);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const matchedTasks = useSearchQuery(searchInputValue);

  const products = matchedTasks.slice(0, 4);

  const {
    elementIsVisible: listResultsVisible,
    showElement: showListResults,
    closeElement: closeListResults,
  } = useVisibility([searchResultsRef.current!], () => setSearchInputValue(""));

  const navigateToSearchResults = () => {
    navigate({
      pathname: "results",
      search: createSearchParams({
        q: searchInputValue,
      }).toString(),
    });
  };

  useEffect(() => {
    if (searchInputValue.trim().length > 0) {
      showListResults();
    } else {
      closeListResults();
    }
  }, [closeListResults, searchInputValue, showListResults]);

  return (
    <div className="flex flex-auto">
      <form className="relative w-full mr-9" autoComplete="off">
        <label htmlFor="search" className="sr-only"></label>
        <input
          type="search"
          id="search"
          placeholder="Search task"
          ref={searchResultsRef}
          onKeyUp={({ currentTarget }) => {
            setSearchInputValue(currentTarget.value);
          }}
          className="inputStyles w-full"
        />
        <Search className="absolute w-4 sm:w-5 right-4 top-3.5 text-slate-400" />
        {listResultsVisible && (
          <div className="absolute bg-slate-100 rounded-md w-full top-14 p-3 dark:bg-slate-800 z-10">
            {products.length ? (
              <>
                <ul>
                  {products.map((product) => (
                    <ItemSearch key={product.id} product={product} />
                  ))}
                </ul>
                <button
                  onClick={navigateToSearchResults}
                  className="bg-rose-100 w-full p-2 rounded-md text-rose-600 dark:bg-slate-700/[.3] dark:text-slate-200"
                >
                  All results for "{searchInputValue}"
                </button>
              </>
            ) : (
              <span>No tasks found</span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchField;
