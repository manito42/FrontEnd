import { useFetchHome } from "@/hooks/Home/FetchHome";
import Image from "next/image";
import React from "react";

const RequestsWrapper = () => {
    const { allMentor, fetchMoreData, hasMore } = useFetchHome();

    return (
        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap
                        w-[80vw] h-[50vh] bg-[#475569] flex-nowrap flex-row
                        justify-center items-center ">
          {allMentor.map((data, index) => (
              <div key={index} className="h-[35vh] w-[175px] lg:w-[225px] mt-[3.5rem]
                                          mx-5 rounded-xl bg-[#374151] inline-block
                                          shadow-2xl">
                <div className="flex flex-row justify-between mt-4">
                  <div className="w-[50px] bg-amber-400 inline-block text-center rounded-2xl ml-4">
                    멘토
                  </div>
                  <div className="w-[50px] bg-green-600 inline-block text-center rounded-2xl mr-4">
                    진행중
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="relative z-[100] -top-5 flex justify-center items-center">
                    <Image
                        className="shadow-xl rounded-full align-middle border-none m-[4rem] md:mt-20 lg:mx-6 lg:mt-[4rem] object-cover w-[13vh] h-[13vh] md:w-[8vw] md:h-[8vw]"
                        src={data.user.profileImage}
                        alt="..."
                        width={100}
                        height={100}
                    />
                  </div>
                </div>
                <div className="w-full relative -mt-20 lg:-mt-20 flex justify-center">
                  <div className="w-[50%] truncate text-center font-bold">
                    {data.user.nickname}
                  </div>
                </div>
                <div className="flex flex-row mb-4 mt-2">
                  <div>
                    a
                  </div>
                  <div>
                    b
                  </div>
                  <div>
                    c
                  </div>
                </div>
              </div>
          ))}
        </div>
    );
};

export default RequestsWrapper;
