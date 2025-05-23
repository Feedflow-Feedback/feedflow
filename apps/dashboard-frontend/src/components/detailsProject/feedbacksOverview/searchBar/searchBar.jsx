import searchIcon from "../../../../assets/icons/searchIcon.png";

export default function SearchBar() {
  return (
    <>
      <div className="px-4 py-1  bg-black/20 rounded-md flex items-center">
        <img src={searchIcon} alt="search" className="inline-block mr-2 h-4 " />
        <p>Search</p>
      </div>
    </>
  );
}
