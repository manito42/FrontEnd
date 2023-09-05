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
              <div key={index} className="h-[35vh] lg:w-[15vw] md:w-[25vw] w-[60%] mt-[3.5rem]
                                          mx-10 rounded-xl bg-[#374151] inline-block
                                          shadow-2xl">
                <div className="flex justify-center items-center">
                  <div className="relative z-[100] flex justify-center items-center">
                    <Image
                        className="shadow-xl rounded-full align-middle border-none m-[4rem] md:mt-20 lg:mx-6 lg:mt-[4rem] object-cover w-[13vh] h-[13vh] md:w-[8vw] md:h-[8vw]"
                        src={data.user.profileImage}
                        alt="..."
                        width={100}
                        height={100}
                    />
                  </div>
                </div>
                  <div className="w-full relative -mt-10 lg:-mt-10 flex justify-center">
                    <div className="w-[50%] truncate text-center font-bold">
                      {data.user.nickname}
                    </div>
                  </div>
              </div>
          ))}
        </div>
    );
};

export default RequestsWrapper;
