import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchApiData } from "./images";
import { successTransformer, errorTransformer } from "../utils/transformers";
import { Photo } from "./types";

jest.mock("../utils/transformers");

const mockAxios = new MockAdapter(axios);
const url = "http://54.73.73.228:4369/api/images";

const mockSuccessTransformer = successTransformer as jest.Mock;
const mockErrorTransformer = errorTransformer as jest.Mock;

describe("fetchApiData", () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  it("should fetch data and apply successTransformer", async () => {
    const mockData = {
      photo_1: {
        title: "Item 1",
        description: "Description 1",
        image: "url1",
        index: 1,
      },
    };
    const transformedData: Photo[] = [
      {
        title: "Item 1",
        description: "Description 1",
        image: "url1",
        index: 1,
      },
    ];
    mockAxios.onGet(url).reply(200, mockData);
    mockSuccessTransformer.mockResolvedValue(transformedData);

    const result = await fetchApiData();
    expect(result).toEqual(transformedData);
    expect(mockSuccessTransformer).toHaveBeenCalledWith(mockData);
  });

  it("should call errorTransformer if request fails and retry up to 3 times", async () => {
    const transformedErrorData: Photo[] = [
      {
        title: "Item 1",
        description: "Description 1",
        image: "url1",
        index: 1,
      },
    ];
    mockAxios.onGet(url).reply(500);
    mockErrorTransformer.mockResolvedValue(transformedErrorData);

    const result = await fetchApiData();
    expect(result).toEqual(transformedErrorData);
    expect(mockErrorTransformer).toHaveBeenCalled();
    expect(mockAxios.history.get.length).toBe(1);
  });

  it("should retry fetching data up to 3 times if both successTransformer and errorTransformer fail", async () => {
    mockAxios.onGet(url).reply(500);
    mockErrorTransformer.mockResolvedValue(null);

    const result = await fetchApiData();
    expect(result).toBeNull();
    expect(mockErrorTransformer).toHaveBeenCalledTimes(4);
    expect(mockAxios.history.get.length).toBe(4);
  });
});
