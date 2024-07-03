"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { SET_PAGINATED_DATA, getImages } from "@/lib/redux/slices/image-slice";
import { useEffect, useState } from "react";
import Loading from "./loader/loading";
import Card from "./Card";
import Paginator from "./Paginator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { data, paginatedData, maxPages, loading } = useAppSelector(
    (state) => state.images
  );
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.has("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (!paginatedData) {
      if (searchParams.has("page")) {
        const page = parseInt(searchParams.get("page") as string);
        dispatch(getImages(page));
      } else {
        dispatch(getImages());
      }
    }
  }, []);

  const handlePageChange = (page: number) => {
    if (!data) return;
    if (page < 1 || page > maxPages) return;
    const paginatedData = data.slice((page - 1) * 10, page * 10);
    const params = new URLSearchParams(searchParams);
    dispatch(SET_PAGINATED_DATA(paginatedData));
    setCurrentPage(page);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  if (loading) return <Loading />;
  if (paginatedData)
    return (
      <section className="container text-black mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {paginatedData?.map((photos) => (
            <Card key={photos.index} data={photos} />
          ))}
        </div>
        <Paginator
          maxPages={maxPages}
          currentPage={currentPage}
          handleChange={handlePageChange}
        />
      </section>
    );
  return null;
};

export default HomePage;
