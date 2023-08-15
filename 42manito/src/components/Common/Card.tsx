import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ManitoCard({ children }: Props) {
  return (
    <div
      className="rounded-xl w-full
          transition duration-300 transform border border-gray-300
          sm:scale-100
          scale-[0.8]
          sm:hover:scale-105
          hover:shadow-lg
          dark:border-gray-200/50"
    >
      {children}
    </div>
  );
}
