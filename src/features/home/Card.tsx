import { Photo } from "@/lib/api/types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { SET_ACTIVE } from "@/lib/redux/slices/image-slice";
import { useRouter } from "next/navigation";

const Card = ({ data }: { data: Photo }) => {
  const router = useRouter();
  const { active } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();
  const activeClass = active === data.index ? "border border-red-400" : "";

  const handleOnClick = () => {
    dispatch(SET_ACTIVE({ index: data.index }));
    router.push(`/${data.index}/item`);
  };
  return (
    <div
      className={`cursor-pointer shadow-md rounded-md p-3 sm:p-4  w-full fade-in  transition ease-in-out delay-150   hover:scale-105 ${activeClass}`}
      onClick={handleOnClick}
    >
      <div className="  flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="   rounded">
            <img
              src={data.image}
              alt={data.title}
              className="h-48 w-full object-cover rounded"
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
                <p className="text-sm text-black">{data.title}</p>
              </div>
              <div className="  rounded col-span-2">
                <p className="text-sm  text-black">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
