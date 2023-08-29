import React, { ComponentProps } from "react";

interface props {
  hashtag: string;
  children?: React.ReactNode;
}

const HashtagCard = ({ hashtag, children }: props) => {
  return (
    <div className="flex flex-row mx-3">
      <h6 className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 ">
        {hashtag}
      </h6>
      {children && children}
    </div>
  );
};

export default HashtagCard;
