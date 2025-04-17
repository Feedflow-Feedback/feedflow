export default function SortOptions() {
  return (
    <div className="">
      <span className="font-semibold text-sm">Sort</span>
      <div className="flex items-center space-x-4">
        <button className="border border-black rounded-md px-3 py-1 text-sm hover:bg-gray-100">
          Newest
        </button>

        <button className="border border-black rounded-md px-3 py-1 text-sm hover:bg-gray-100">
          Oldest
        </button>

        <button className="border border-black rounded-md px-3 py-1 text-sm flex items-center space-x-1 hover:bg-gray-100">
          <span>Typ</span>
          {/* <ChevronLeft size={14} /> */}
        </button>
      </div>
    </div>
  );
}
