import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface categoryStateType {
  categoryMentors: MentorProfileDto[];
}

const InitialState: categoryStateType = {
  categoryMentors: [],
};

export const CategorySlice = createSlice({
  name: "Category",
  initialState: InitialState,
  reducers: {
    setCategoryMentors(state, action: PayloadAction<MentorProfileDto[]>) {
      state.categoryMentors = [...state.categoryMentors, ...action.payload];
    },
    initCategoryMentors(state) {
      state.categoryMentors = [];
    },
  },
});

export const { setCategoryMentors, initCategoryMentors } =
  CategorySlice.actions;
