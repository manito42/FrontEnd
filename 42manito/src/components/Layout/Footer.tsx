import Link from "next/link";
import React from "react";
// import DarkModeToggleButton from "@/components/Layout/DarkModeButton";

export default function Footer() {
  return (
    <>
      <footer className="body-font w-[100vw]">
        <div className="w-full">
          <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <Link
              href="/"
              className="flex title-font font-medium items-center md:justify-start justify-center text-bg_color-900"
            >
              <span className="md:ml-3 text-xl">42Manito</span>
            </Link>
            <span className="text-sm text-bg_color-500 sm:ml-6 sm:mt-0 mt-4 text-center">
              42Manito ©2023
            </span>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <div className="footer-right">
                <a
                  href="https://github.com/manito42"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bg_color-500"
                >
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                    className="w-7 h-7 mx-3"
                    viewBox="0 -1 19 19"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                {/*{<DarkModeToggleButton/>}*/}
              </div>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
