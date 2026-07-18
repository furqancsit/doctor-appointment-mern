import { FiSearch, FiX } from "react-icons/fi";

const SearchInput = ({ search, setSearch }) => {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Search Icon */}
        <FiSearch
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        {/* Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by doctor, specialization, or disease..."
          className="
            h-14
            w-full
            rounded-2xl
            bg-white
            pl-14
            pr-14
            text-gray-800
            placeholder:text-gray-400
            ring-1
            ring-gray-200
            outline-none
            transition-all
            duration-300
            focus:ring-2
            focus:ring-blue-500
            focus:shadow-lg
            focus:shadow-blue-500/10
          "
        />

        {/* Clear Button */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
            "
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;