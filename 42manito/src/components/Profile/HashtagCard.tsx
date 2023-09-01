import React from "react";

interface props {
  hashtag: string;
  children?: React.ReactNode;
}

const HashtagCard = ({ hashtag, children }: props) => {
  return (
    <div className="flex flex-row mr-3">
      <h6 className="whitespace-nowrap m-2 p-[0.5vw] rounded-md bg-sky-200 dark:bg-sky-700 ">
        {hashtag}
      </h6>
      {children && children}
    </div>
  );
};

export default HashtagCard;
