import { useFetchHome } from "@/hooks/Home/FetchHome";
import Image from "next/image";
import React from "react";

const RequestsWrapper = () => {
    const { allMentor, fetchMoreData, hasMore } = useFetchHome();

    return (
        <div className="overflow-x-scroll w-[90vw] h-[50vh] bg-[#475569]">
            <div className="flex flex-row flex-nowrap">
                {allMentor.map((data, index) => (
                    <div key={index} className="h-[40vh] w-[30vh] m-2 rounded-xl bg-[#374151]">
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
        </div>
    );
};

export default RequestsWrapper;
