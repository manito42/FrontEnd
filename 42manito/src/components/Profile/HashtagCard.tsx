import React from "react";

interface props {
  hashtag: string;
}

const HashtagCard = ({ hashtag }: props) => {
	// TODO: 해시태그 삭제 기능 구현
  return (
    <div className="flex flex-row mx-3">
      <h6 className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 ">
        {hashtag}
      </h6>
      <button className="text-slate-600 dark:text-white text-2xl font-bold">
        X
      </button>
    </div>
  );
};

export default HashtagCard;
