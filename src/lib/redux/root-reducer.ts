import { combineReducers } from "redux";
import imageReducer, { imageSlice } from "./slices/image-slice";

const rootReducer = combineReducers({
  [imageSlice]: imageReducer,
});

export default rootReducer;
