import {
  FETCH_ALL,
  FETCH_ALL_SUCCESS,
  FETCH_ALL_ERROR,
  SET_ACTIVE,
} from "./image-slice";

jest.mock("../../../lib/api/images", () => ({
  fetchApiData: jest.fn(),
}));

describe("image slice", () => {
  it("returns initial state", () => {
    const reducer = require("./image-slice").default;
    expect(reducer(undefined, { type: undefined })).toEqual({
      data: null,
      error: undefined,
      loading: false,
    });
  });

  it("should handle FETCH_ALL", () => {
    const reducer = require("./image-slice").default;
    expect(reducer(undefined, FETCH_ALL())).toEqual({
      data: null,
      loading: true,
      error: undefined,
    });
  });

  it("should handle FETCH_ALL_SUCCESS", () => {
    const reducer = require("./image-slice").default;
    const payload = { images: [] };
    expect(reducer(undefined, FETCH_ALL_SUCCESS(payload))).toEqual({
      data: payload,
      loading: false,
      error: undefined,
    });
  });

  it("should handle FETCH_ALL_ERROR", () => {
    const reducer = require("./image-slice").default;
    const payload = "Error message";
    expect(reducer(undefined, FETCH_ALL_ERROR(payload))).toEqual({
      data: null,
      loading: false,
      error: payload,
    });
  });

  it("should handle SET_ACTIVE", () => {
    const reducer = require("./image-slice").default;
    const initialState = {
      data: null,
      loading: false,
      error: undefined,
    };
    const payload = { index: 1 };
    expect(reducer(initialState, SET_ACTIVE(payload))).toEqual({
      ...initialState,
      active: 1,
    });
  });
});
