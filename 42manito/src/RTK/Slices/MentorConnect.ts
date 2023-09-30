import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface hashtagType {
  id: number;
}

interface MentorConnectTypes {
  hashtags: hashtagType[];
  categoryId: number;
  message: string;
}

const InitialState: MentorConnectTypes = {
  hashtags: [],
  categoryId: 0,
  message: "",
};

export const MentorConnectSlice = createSlice({
  name: "MentorConnect",
  initialState: InitialState,
  reducers: {
    setHashtags(state, action: PayloadAction<hashtagType[]>) {
      state.hashtags = action.payload;
    },
    deleteHashtag(state, action: PayloadAction<number>) {
      state.hashtags = state.hashtags.filter(
        (hashtag) => hashtag.id !== action.payload
      );
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    deleteCategoryId(state) {
      state.categoryId = 0;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    initMentorConnect(state) {
      state = InitialState;
    },
  },
});

export const {
  setHashtags,
  setMessage,
  deleteHashtag,
  initMentorConnect,
  deleteCategoryId,
  setCategoryId,
} = MentorConnectSlice.actions;
