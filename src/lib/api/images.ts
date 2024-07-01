import axios from "axios";
import { errorTransformer, successTransformer } from "../utils/transformers";
import { Photo } from "./types";

const url = "http://54.73.73.228:4369/api/images";

export async function fetchApiData(count = 1): Promise<Photo[] | null> {
  try {
    const response = await axios.get(url);
    const transformedData = await successTransformer(response.data);
    return transformedData;
  } catch (error) {
    const response = await errorTransformer();
    if (response) return response;
    if (count > 3) {
      return null;
    }
    return await fetchApiData(count + 1);
  }
}
