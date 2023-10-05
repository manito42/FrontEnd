import { useAppDispatch } from "@/RTK/store";
import { useRouter } from "next/router";
import React, { useState, FormEvent } from "react";
import { closeSidebar } from "@/RTK/Slices/Global";

interface Props {
  className?: string;
  btnVisible?: boolean;
}
const SearchInput = ({ className, btnVisible }: Props) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    if (search.length > 0) {
      dispatch(closeSidebar());
      router.push("/Search/[searchKeyword]", `/Search/${search}`);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search.length > 0) {
      dispatch(closeSidebar());
      router.push("/Search/[s경earchKeyword]", `/Search/${search}`);
    }
  };

  return (
    <>
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-bg_color-500 dark:text-bg_color-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              onChange={handleInputChange}
              value={search}
              type="text"
              id="simple-search"
              className="bg-bg_color-50 border border-bg_color-300 text-bg_color-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5  dark:bg-bg_color-700 dark:border-bg_color-600 dark:placeholder-bg_color-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          {btnVisible !== false && (
            <button
              onClick={handleClick}
              type="button"
              className="p-1.5 ml-2 text-sm font-medium rounded-lg border border-signature_color-600
                  text-white
                  bg-signature_color-500
                  hover:bg-signature_color-800
                  focus:ring-4 focus:outline-none focus:ring-signature_color-300
                  dark:bg-signature_color-600 dark:active:bg-signature_color-800 dark:focus:ring-signature_color-800"
              disabled={search.length === 0}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default SearchInput;
