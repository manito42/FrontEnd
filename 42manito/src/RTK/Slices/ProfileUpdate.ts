import { CategoryDto } from "@/Types/Categories/CategoryDto";
import { HashtagDto } from "@/Types/Hashtag/HashtagDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  zoomOut: boolean;
  shortIntro: string;
  intro: string;
  hashtags: HashtagDto[];
  categories: CategoryDto[];
  disabled: boolean;
  viewConnectModal: boolean;
}

const ProfileUpdate: InitialState = {
  zoomOut: false,
  shortIntro: "",
  intro: "",
  hashtags: [] as HashtagDto[],
  categories: [] as CategoryDto[],
  disabled: false,
  viewConnectModal: false,
};

export const ProfileUpdateSlice = createSlice({
  name: "ProfileUpdate",
  initialState: ProfileUpdate,
  reducers: {
    setZoomOut(state, action: PayloadAction<boolean>) {
      state.zoomOut = action.payload;
    },
    setShortIntro(state, action: PayloadAction<string>) {
      state.shortIntro = action.payload;
    },
    setIntro(state, action: PayloadAction<string>) {
      state.intro = action.payload;
    },
    setHashtags(state, action: PayloadAction<HashtagDto[]>) {
      state.hashtags = action.payload;
    },
    setCategories(state, action: PayloadAction<CategoryDto[]>) {
      state.categories = action.payload;
    },
    setDisabled(state, action: PayloadAction<boolean>) {
      state.disabled = action.payload;
    },
    setViewConnectModal(state, action: PayloadAction<boolean>) {
      state.viewConnectModal = action.payload;
    },
    deleteAll(state) {
      state = ProfileUpdate;
    },
  },
});

export const {
  setZoomOut,
  setShortIntro,
  setIntro,
  setHashtags,
  setCategories,
  setDisabled,
  setViewConnectModal,
} = ProfileUpdateSlice.actions;

export default ProfileUpdateSlice.reducer;
