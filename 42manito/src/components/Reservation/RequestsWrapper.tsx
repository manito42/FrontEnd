import { useFetchHome } from "@/hooks/Home/FetchHome";
import Image from "next/image";
import React from "react";

const RequestsWrapper = () => {
    const { allMentor, fetchMoreData, hasMore } = useFetchHome();
  let testArr: number[];
  // @ts-ignore
  testArr = [...Array(100).keys()];

    return (
        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap
                        w-[80vw] h-[50vh] bg-[#475569] flex-nowrap flex-row
                        justify-center items-center ">
          {allMentor.map((data, index) => (
              <div key={index} className="h-[40vh] w-[10vw] m-2 mt-10 rounded-xl bg-[#374151] inline-block">
                <Image
                    className="rounded-full"
                    src={data.user.profileImage}
                    alt="cover image"
                    width={100}
                    height={100}
                    quality={80}
                />
              </div>
          ))}
        </div>
    );
};

export default RequestsWrapper;
