import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface searchStateType {
  searchResult: MentorProfileDto[];
}

const InitialState: searchStateType = {
  searchResult: [],
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
  },
});

export const { setSearchResult, initSearchResult } = SearchSlice.actions;
