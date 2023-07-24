import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface searchStateType {
  searchResult: MentorProfileDto[];
  page: number;
  hasMore: boolean;
}

const InitialState: searchStateType = {
  searchResult: [],
  page: 0,
  hasMore: true,
};

export const SearchSlice = createSlice({
  name: "Search",
  initialState: InitialState,
  reducers: {
    setSearchResult(state, action: PayloadAction<MentorProfileDto[]>) {
      state.searchResult = [...state.searchResult, ...action.payload];
    },
    initSearchResult(state) {
      state.searchResult = [];
    },
    setSearchPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },
  },
});

export const { setSearchResult, initSearchResult, setSearchPage, setHasMore } =
  SearchSlice.actions;
