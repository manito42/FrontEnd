import React, { useState } from "react";

export default function ManitoToggle() {
  const [isHide, setIsHide] = useState(false);

  const changeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHide(!e.target.checked); // Checkbox가 체크되면 isHide는 false가 되고, 그렇지 않으면 true가 됩니다.
    console.log(!e.target.checked);
  };

  return (
    <div className="items-center justify-center flex flex-col">
      <div className="text-2xl font-bold">공개하기</div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          onChange={changeToggle}
          className="sr-only peer"
        ></input>
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div>
      </label>
    </div>
  );
}
