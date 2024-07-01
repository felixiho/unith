"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getImages } from "@/lib/redux/slices/image-slice";
import { useEffect } from "react";
import Loading from "./loader/loading";
import Card from "./Card";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.images);

  useEffect(() => {
    if (!data) {
      dispatch(getImages());
    }
  }, []);

  if (loading || !data?.length) return <Loading />;

  return (
    <section className="container mx-auto px-4 max-w-screen-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map((photos) => (
          <Card key={photos.index} data={photos} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
