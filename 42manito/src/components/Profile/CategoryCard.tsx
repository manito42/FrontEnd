import React, { useState } from "react";

interface props {
  category: string;
  active: boolean;
  onClick: (isActive: boolean) => void;
  children?: React.ReactNode;
}

const CategoryCard = ({ category, active, onClick, children }: props) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const handleClick = () => {
    setIsActive(!isActive); // 버튼 상태 토글
    onClick(isActive); // 원하는 함수 실행
  };

  return (
    <div className="flex flex-row mr-3">
      <h6
        onClick={handleClick}
        className={`whitespace-nowrap m-2 p-[0.5vw] rounded-md focus:outline-none focus:ring focus:ring-rose-300 
        ${
          isActive
            ? "bg-rose-300 dark:bg-rose-500 ring ring-rose-800"
            : "bg-gray-300 dark:bg-gray-400"
        }`}
      >
        {category}
      </h6>
      {children && children}
    </div>
  );
};

export default CategoryCard;
