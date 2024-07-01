import { Photo, Photos } from "../api/types";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage";

/**
 *
 * @param response
 * @description This transforms and saves to cache successful responses from the API into a format that can be used by the application.
 */
export const successTransformer = async (
  response: Photos
): Promise<Photo[]> => {
  const transformedData = Object.values(response)
    .map((photo) => ({
      title: photo.title,
      description: photo.description,
      image: photo.image.length ? photo.image : "https://placehold.co/48",
      index: photo.index,
    }))
    .sort((a, b) => a.index - b.index);
  saveToLocalStorage("lastValidResponse", transformedData);
  return transformedData;
};

export const errorTransformer = async () => {
  const lastValidResponse = loadFromLocalStorage<Photo[]>("lastValidResponse");
  return lastValidResponse;
};
