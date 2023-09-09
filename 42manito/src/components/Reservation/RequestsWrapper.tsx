import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/RTK/store";
import CardHashtag from "@/components/Global/CardHashtag";

const RequestsWrapper = () => {
    const Mentor = useSelector(
        (state: RootState) => state.rootReducers.home.allMentor,
    );
    const [scrollNumber, setScrollNumber] = useState(0);
    useEffect(() => {
      const scrollbar = document.getElementById("scroll");
      if (scrollbar){
        if (scrollNumber < 0)
          setScrollNumber(0);
        else if (scrollNumber > scrollbar.scrollWidth)
          setScrollNumber(scrollbar.scrollWidth);
        else
          scrollbar.scrollLeft = scrollNumber;
        console.log(scrollNumber);
        console.log(scrollbar.scrollWidth)
      }
    }, [scrollNumber])
    return (
        <div className="flex justify-between -ml-12">
          <div className="z-10 relative top-16 right-5 text-white text-center w-[4vw] h-[4vw] min-w-[55px] min-h-[55px] text-4xl font-bold" onClick={() => setScrollNumber(scrollNumber - 400)}>
            {"<"}
          </div>
          <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap
                              w-[52rem] h-50 flex-nowrap flex-row
                              justify-center items-center" id="scroll">
              {!Mentor ? "" : Mentor.map((data, index) => (
                  <div key={index} className="h-40 w-30 lg:w-36 mt-[1rem]
                                                mx-5 rounded-xl bg-[#374151] inline-block
                                                shadow-2xl">
                      <div className="flex flex-row justify-between mt-4">
                          <div className="w-12 h-5 bg-amber-400 text-center rounded-2xl ml-4">
                            <span>멘토</span>
                          </div>
                          <div className="w-12 h-5 bg-green-600 text-center rounded-2xl mr-4">
                            <span>진행중</span>
                          </div>
                      </div>
                      <div className="flex justify-center items-center">
                          <div className="relative z-[100] -top-5 flex justify-center items-center">
                              {data ? <Image
                                  className="shadow-xl rounded-full align-middle border-none m-[4rem] md:mt-20 lg:mx-6 lg:mt-10 object-cover w-[13vh] h-[13vh] md:w-10 md:h-10"
                                  src={data.user.profileImage}
                                  alt="..."
                                  width={100}
                                  height={100}
                              /> : ""}
                          </div>
                      </div>
                      <div className="w-full relative -mt-20 lg:-mt-20 flex justify-center">
                          <div className="w-[50%] truncate text-center font-bold">
                              {data ? data.user.nickname : ""}
                          </div>
                      </div>
                      <div className="flex flex-row mb-1 -mt-3">
                        {data.hashtags.length > 0
                            ? data.hashtags.map((hashtag) => (
                                <CardHashtag
                                    name={hashtag.name}
                                    key={hashtag.id}
                                    color={"sky"}
                                />
                            ))
                            : data.categories.map((hashtag) => (
                                <CardHashtag
                                    name={hashtag.name}
                                    key={hashtag.id}
                                    color={"sky"}
                                />
                            ))}
                      </div>
                  </div>
              ))}
            </div>
          <div className="w-100px h-100px z-10 relative top-16 left-5 text-white text-center w-[4vw] h-[4vw] min-w-[55px] min-h-[55px] text-4xl font-bold" onClick={() => setScrollNumber(scrollNumber + 400)}>
            {">"}
          </div>
        </div>
);
};

export default RequestsWrapper;
