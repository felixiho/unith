import { successTransformer, errorTransformer } from "./transformers";

interface Photo {
  title: string;
  description: string;
  image: string;
  index: number;
}

interface Photos {
  [key: string]: Photo;
}

const mockPhotos: Photos = {
  photo_26: {
    title: "Item 26",
    description: "Description 26",
    image: "https://picsum.photos/seed/picsum/200/300",
    index: 26,
  },
  photo_5: {
    title: "Item 5",
    description: "Description 5",
    image: "https://picsum.photos/id/6/200/200",
    index: 5,
  },
  photo_27: {
    title: "Item 27",
    description: "Description 27",
    image: "https://picsum.photos/id/10/200/300.jpg",
    index: 27,
  },
};

const mockPhotosWithEmptyImage: Photos = {
  photo_1: {
    title: "Item 1",
    description: "Description 1",
    image: "",
    index: 1,
  },
  photo_2: {
    title: "Item 2",
    description: "Description 2",
    image: "",
    index: 2,
  },
};

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("successTransformer", () => {
  it("should transform and sort the data by index in ascending order", async () => {
    const result = await successTransformer(mockPhotos);
    expect(result).toEqual([
      {
        title: "Item 5",
        description: "Description 5",
        image: "https://picsum.photos/id/6/200/200",
        index: 5,
      },
      {
        title: "Item 26",
        description: "Description 26",
        image: "https://picsum.photos/seed/picsum/200/300",
        index: 26,
      },
      {
        title: "Item 27",
        description: "Description 27",
        image: "https://picsum.photos/id/10/200/300.jpg",
        index: 27,
      },
    ]);
  });

  it("should replace empty image URLs with a placeholder", async () => {
    const result = await successTransformer(mockPhotosWithEmptyImage);
    expect(result).toEqual([
      {
        title: "Item 1",
        description: "Description 1",
        image: "https://placehold.co/48",
        index: 1,
      },
      {
        title: "Item 2",
        description: "Description 2",
        image: "https://placehold.co/48",
        index: 2,
      },
    ]);
  });

  it("should save the transformed data to localStorage", async () => {
    await successTransformer(mockPhotos);
    const savedData = JSON.parse(
      localStorage.getItem("lastValidResponse") || "[]"
    );
    expect(savedData).toEqual([
      {
        title: "Item 5",
        description: "Description 5",
        image: "https://picsum.photos/id/6/200/200",
        index: 5,
      },
      {
        title: "Item 26",
        description: "Description 26",
        image: "https://picsum.photos/seed/picsum/200/300",
        index: 26,
      },
      {
        title: "Item 27",
        description: "Description 27",
        image: "https://picsum.photos/id/10/200/300.jpg",
        index: 27,
      },
    ]);
  });
});

describe("errorTransformer", () => {
  it("should return the last valid response from localStorage", async () => {
    localStorage.setItem(
      "lastValidResponse",
      JSON.stringify([
        {
          title: "Item 5",
          description: "Description 5",
          image: "https://picsum.photos/id/6/200/200",
          index: 5,
        },
        {
          title: "Item 26",
          description: "Description 26",
          image: "https://picsum.photos/seed/picsum/200/300",
          index: 26,
        },
        {
          title: "Item 27",
          description: "Description 27",
          image: "https://picsum.photos/id/10/200/300.jpg",
          index: 27,
        },
      ])
    );

    const result = await errorTransformer();
    expect(result).toEqual([
      {
        title: "Item 5",
        description: "Description 5",
        image: "https://picsum.photos/id/6/200/200",
        index: 5,
      },
      {
        title: "Item 26",
        description: "Description 26",
        image: "https://picsum.photos/seed/picsum/200/300",
        index: 26,
      },
      {
        title: "Item 27",
        description: "Description 27",
        image: "https://picsum.photos/id/10/200/300.jpg",
        index: 27,
      },
    ]);
  });

  it("should return null if no data is found in localStorage", async () => {
    localStorage.clear();
    const result = await errorTransformer();
    expect(result).toBeNull();
  });
});
