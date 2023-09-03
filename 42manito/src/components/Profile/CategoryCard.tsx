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
    <div className="profile-category-card-wrapper">
      <h6
        onClick={handleClick}
        className={`profile-category-card
        ${isActive ? "profile-category-card-off" : "profile-category-card-on"}`}
      >
        {category}
      </h6>
      {children && children}
    </div>
  );
};

export default CategoryCard;
