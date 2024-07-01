import LoadingCard from "./loading-card";

const Loading = () => {
  return (
    <section className="container mx-auto px-4 max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {new Array(10).fill(0).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default Loading;
