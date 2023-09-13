import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  zoomOut: boolean;
  shortIntro: string;
  intro: string;
  hashtags: HashtagResponseDto[];
  categories: CategoriesResponseDto[];
  disabled: boolean;
  viewConnectModal: boolean;
}

const ProfileUpdate: InitialState = {
  zoomOut: false,
  shortIntro: "",
  intro: "",
  hashtags: [] as HashtagResponseDto[],
  categories: [] as CategoriesResponseDto[],
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
    setHashtags(state, action: PayloadAction<HashtagResponseDto[]>) {
      state.hashtags = action.payload;
    },
    addHashtag(state, action: PayloadAction<HashtagResponseDto>) {
      if (
        state.hashtags.some((hashtag) => hashtag.name === action.payload.name)
      ) {
        return;
      }
      state.hashtags.push(action.payload);
    },
    setCategories(state, action: PayloadAction<CategoriesResponseDto[]>) {
      state.categories = action.payload;
    },
    addCategory(state, action: PayloadAction<HashtagResponseDto>) {
      if (
        state.categories.some(
          (category) => category.name === action.payload.name,
        )
      ) {
        return;
      }
      state.categories.push(action.payload);
    },
    setDisabled(state, action: PayloadAction<boolean>) {
      state.disabled = action.payload;
    },
    setViewConnectModal(state, action: PayloadAction<boolean>) {
      state.viewConnectModal = action.payload;
    },
    deleteOneHashtag(state, action: PayloadAction<string>) {
      state.hashtags = state.hashtags.filter(
        (hashtag) => hashtag.name !== action.payload,
      );
    },
    deleteOneCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (category) => category.name !== action.payload,
      );
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
  addCategory,
  addHashtag,
  deleteOneHashtag,
  setDisabled,
  setViewConnectModal,
} = ProfileUpdateSlice.actions;

export default ProfileUpdateSlice.reducer;
