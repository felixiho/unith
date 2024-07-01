import LoadingCard from "./loading-card";

const Loading = () => {
  return (
    <section className="container mx-auto px-4 max-w-screen-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {new Array(6).fill(0).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default Loading;
