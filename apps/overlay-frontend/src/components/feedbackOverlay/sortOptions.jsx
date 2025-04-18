import chevron from "../../assets/icons/chevron_icon.svg";

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
          <img src={chevron} alt="Chevron" className="w-4 h-4" />
          {/* <ChevronLeft size={14} /> */}
        </button>
      </div>
    </div>
  );
}
