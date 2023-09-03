/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TypeIt from "typeit-react";
import ProfileTypo from "../Profile/Typo";
import { RootState, useAppDispatch } from "@/RTK/store";
import {
  useGetActiveMenteeEnrollmentMutation,
  useGetActiveMentorEnrollmentMutation,
} from "@/RTK/Apis/Enroll";
import { Divider, Spin } from "antd";
import { useSelector } from "react-redux";
import EnrollCard from "./components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  initReservations,
  setMenteeReservations,
  setMentorReservations,
} from "@/RTK/Slices/Enroll";
import {useFetchHome} from "@/hooks/Home/FetchHome";
import Image from "next/image";

// TODO: 엔롤 테스트해봐야함
const Enroll = () => {
  const [mentorHasMore, setMentorHasMore] = useState(true);
  const [menteeHasMore, setMenteeHasMore] = useState(true);
  const [menteePage, setMenteePage] = useState(0);
  const [mentorPage, setMentorPage] = useState(0);

  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );

  const mentorList = useSelector(
    (state: RootState) => state.rootReducers.enroll.mentorReservation
  );
  const menteeList = useSelector(
    (state: RootState) => state.rootReducers.enroll.menteeReservation
  );
  const dispatch = useAppDispatch();

  const [
    getActiveMentorEnrollment,
    { data: mentorData, isLoading: getMentorLoading },
  ] = useGetActiveMentorEnrollmentMutation();
  const [
    getActiveMenteeEnrollment,
    { data: menteeData, isLoading: getMenteeLoading },
  ] = useGetActiveMenteeEnrollmentMutation();

  const fetchMoreMentorData = () => {
    getActiveMentorEnrollment({ take: 12, page: mentorPage, id: Owner });
    setMentorPage(mentorPage + 1);
  };

  const fetchMoreMenteeData = () => {
    getActiveMenteeEnrollment({ take: 12, page: menteePage, id: Owner });
    setMenteePage(menteePage + 1);
  };

  useEffect(() => {
    if (mentorData) {
      if (mentorData.length % 12 !== 0) {
        setMentorHasMore(false);
      } else if (mentorData.length === 0) {
        setMentorHasMore(false);
      } else {
        dispatch(setMentorReservations(mentorData));
      }
    }
  }, [getMentorLoading]);

  useEffect(() => {
    if (menteeData) {
      if (menteeData.length % 12 !== 0) {
        setMenteeHasMore(false);
      } else if (menteeData.length === 0) {
        setMenteeHasMore(false);
      } else {
        dispatch(setMenteeReservations(menteeData));
      }
    }
  }, [getMenteeLoading]);

  useEffect(() => {
    dispatch(initReservations());
    if (Owner !== 0) {
      getActiveMentorEnrollment({ take: 12, page: 0, id: Owner });
      getActiveMenteeEnrollment({ take: 12, page: 0, id: Owner });
      setMentorPage(1);
      setMenteePage(1);
      console.log("getActiveMentorEnrollment");
    }
    return () => {
      dispatch(initReservations());
    };
  }, []);

  const { allMentor, fetchMoreData, hasMore } = useFetchHome();

  return (
    <div className="w-[90vw] md:w-full flex flex-col">
      <Divider className="dark:bg-slate-400 bg-slate-500" />
      <div className="flex flex-wrap md:justify-around my-16 w-full">
        <div className="flex-1 flex flex-row md:flex-col justify-center lg:flex items-center mt-16 lg:mt-0 h-[25vh] w-full lg:w-[50%]">
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
          {/*{menteeList && (*/}
          {/*  <InfiniteScroll*/}
          {/*    dataLength={menteeList.length}*/}
          {/*    next={fetchMoreMenteeData}*/}
          {/*    hasMore={menteeHasMore}*/}
          {/*    loader={<Spin />}*/}
          {/*    className="overflow-y-auto w-full mx-10"*/}
          {/*  >*/}
          {/*    {menteeList.map((data) => (*/}
          {/*      <EnrollCard data={data} key={data.id} isMentor={false} />*/}
          {/*    ))}*/}
          {/*  </InfiniteScroll>*/}
          {/*)}*/}
        </div>
      </div>
      <Divider className="dark:bg-slate-400 bg-slate-500" />
    </div>
  );
};

export default Enroll;
