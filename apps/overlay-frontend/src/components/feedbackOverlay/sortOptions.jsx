export default function SortOptions() {
  return (
    <div className="">
      <span className="font-bold  text-p-lg font-inter">Sort</span>
      <div className="flex items-center space-x-4 mt-2">
        <button className=" border-black border-[1.75px] font-semibold rounded-md px-3 py-1 text-sm ">
          <p className="mt-0.5"> Newest</p>
        </button>

        <button className="border-[1.75px] border-black font-semibold rounded-md px-3 py-1  text-sm  ">
          <p className="mt-0.5">Oldest</p>
        </button>

        <button className="border-[1.75px] border-black font-semibold rounded-md px-3 py-1  text-sm flex items-center space-x-1 ">
          <span className="mt-0.5">Typ</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>

          {/* <ChevronLeft size={14} /> */}
        </button>
      </div>
    </div>
  );
}
