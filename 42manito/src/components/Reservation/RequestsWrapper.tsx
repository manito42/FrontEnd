import {useFetchHome} from "@/hooks/Home/FetchHome";
import Image from "next/image";
import React from "react";

const RequestsWrapper = () => {
    const { allMentor, fetchMoreData, hasMore } = useFetchHome();

    return (
        <div className="flex flex-row overflow-x-auto">
            {allMentor.map((data) => (
                // eslint-disable-next-line react/jsx-key
                <div>
                    <Image
                        className="mentor-image-container"
                        src={data.user.profileImage}
                        alt="cover image"
                        width={100}
                        height={100}
                        quality={80}
                    />
                </div>
            ))}
        </div>
    )
}

export default RequestsWrapper;