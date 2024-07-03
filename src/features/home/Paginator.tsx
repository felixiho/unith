const Paginator = ({
  handleChange,
  currentPage,
  maxPages,
}: {
  handleChange: (page: number) => void;
  currentPage: number;
  maxPages: number;
}) => {
  return (
    <div className=" flex w-full justify-end mt-6 lg:mt-8">
      <button
        className={`${currentPage === 1 ? "cursor-not-allowed" : ""}`}
        onClick={() => handleChange(currentPage - 1)}
      >
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
            fill="#000000"
          />
        </svg>
      </button>
      <p className=" text-black mx-4"> {currentPage}</p>
      <button
        className={`${currentPage === maxPages ? "cursor-not-allowed" : ""}`}
        onClick={() => handleChange(currentPage + 1)}
      >
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
            fill="#000000"
          />
        </svg>
      </button>
    </div>
  );
};

export default Paginator;
