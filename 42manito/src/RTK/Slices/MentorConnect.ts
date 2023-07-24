import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MentorConnectTypes {
  hashtags: HashtagResponseDto[];
  message: string;
}

const InitialState: MentorConnectTypes = {
  hashtags: [],
  message: "",
};

export const MentorConnectSlice = createSlice({
  name: "MentorConnect",
  initialState: InitialState,
  reducers: {
    setHashtags(state, action: PayloadAction<HashtagResponseDto[]>) {
      state.hashtags = action.payload;
    },
    deleteHashtag(state, action: PayloadAction<number>) {
      state.hashtags = state.hashtags.filter(
        (hashtag) => hashtag.id !== action.payload
      );
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    initMentorConnect(state) {
      state = InitialState;
    },
  },
});

export const { setHashtags, setMessage, deleteHashtag, initMentorConnect } =
  MentorConnectSlice.actions;
