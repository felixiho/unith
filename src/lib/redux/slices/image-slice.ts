import { fetchApiData } from "../../../lib/api/images";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { ImageStateType } from "./types";

export const imageSlice = "images";

const initialState: ImageStateType = {
  data: null,
  loading: false,
  error: undefined,
  paginatedData: null,
  maxPages: 1,
};

const imagesSlice = createSlice({
  name: imageSlice,
  initialState,
  reducers: {
    FETCH_ALL: (state) => {
      state.loading = true;
    },
    FETCH_ALL_SUCCESS: (state, action) => {
      state.data = action.payload.photos; 
      state.loading = false;
      state.error = undefined;
      state.maxPages = action.payload.maxPages;
    },
    SET_PAGINATED_DATA: (state, action) => { 
      state.paginatedData = action.payload;
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

export function getImages(page: number = 1) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(FETCH_ALL());
      const data = await fetchApiData();
      if (data) {
        const paginatedData = data.slice((page - 1) * 10, page * 10);
        dispatch(
          FETCH_ALL_SUCCESS({
            photos: data,
            maxPages: Math.ceil(data.length / 10),
          })
        );
        dispatch(SET_PAGINATED_DATA(paginatedData));
      }
    } catch (error) {
      dispatch(FETCH_ALL_ERROR(error));
    }
  };
}


export const { FETCH_ALL, SET_PAGINATED_DATA,  FETCH_ALL_SUCCESS, FETCH_ALL_ERROR, SET_ACTIVE } =
  imagesSlice.actions;

export default imagesSlice.reducer;
