import { fetchApiData } from "../../../lib/api/images";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { ImageStateType } from "./types";

export const imageSlice = "images";

const initialState: ImageStateType = {
  data: null,
  loading: false,
  error: undefined,
};

const imagesSlice = createSlice({
  name: imageSlice,
  initialState,
  reducers: {
    FETCH_ALL: (state) => {
      state.loading = true;
    },
    FETCH_ALL_SUCCESS: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    FETCH_ALL_ERROR: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    SET_ACTIVE: (state, action) => {
      const { index } = action.payload;
      state.active = index;
    },
  },
});

export function getImages() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(FETCH_ALL());
      const data = await fetchApiData();
      dispatch(FETCH_ALL_SUCCESS(data));
    } catch (error) {
      dispatch(FETCH_ALL_ERROR(error));
    }
  };
}


export const { FETCH_ALL, FETCH_ALL_SUCCESS, FETCH_ALL_ERROR,SET_ACTIVE } =
  imagesSlice.actions;

export default imagesSlice.reducer;
