const LoadingCard = () => {
  return (
    <div className=" shadow-sm rounded-md p-3 sm:p-4  w-full fade-in">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-48 bg-slate-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid  gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
