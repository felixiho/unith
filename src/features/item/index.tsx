"use client";
import { Photo } from "@/lib/api/types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { SET_ACTIVE, getImages } from "@/lib/redux/slices/image-slice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ItemPage = ({ index }: { index: number }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.images);
  const [activeItem, setActiveItem] = useState<Photo | null>(null);

  useEffect(() => {
    if (!data) {
      dispatch(getImages());
      dispatch(SET_ACTIVE({ index }));
      return;
    }
    const item = data?.find((item) => item.index === index);
    if (item) setActiveItem(item);
  }, [data]);

  const handleClick = () => {
    router.back();
  };

  return (
    <section className="container text-black mx-auto px-4 max-w-screen-sm">
      {activeItem ? (
        <div
          className={`shadow-sm rounded-md p-3 sm:p-4  w-full fade-in transition ease-in-out delay-50  `}
        >
          <div className="  flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="   rounded">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="h-48 w-full object-contain rounded"
                  loading="lazy"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://placehold.co/48";
                  }}
                />
              </div>
              <div className="space-y-3">
                <div className="grid gap-1">
                  <div className=" rounded col-span-1">
                    <p className="text-sm">{activeItem.title}</p>
                  </div>
                  <div className="  rounded col-span-2">
                    <p className="text-sm ">{activeItem.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" shadow-sm rounded-md p-3 sm:p-4  w-full fade-in">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-48 bg-slate-100 rounded"></div>
              <div className="space-y-3">
                <div className="grid  gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" w-full  flex justify-center">
        <button
          onClick={handleClick}
          className="transition text-white ease-in-out delay-150 bg-gray-800 hover:-translate-y-1 hover:scale-105 hover:bg-black duration-300 my-4 w-3/4 p-4 rounded-md"
        >
          Go Home
        </button>
      </div>
    </section>
  );
};

export default ItemPage;
