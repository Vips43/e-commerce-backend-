import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDummyStore } from "../../../store/dummyStore";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function SearchInput() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [show, setShow] = useState(false)
  const [inputval, setInputval] = useState('')

  const fetchSearch = useDummyStore(state => state.fetchSearch);
  const search = useDummyStore(state => state.search);

  const debounceFetch = useMemo(() => debounce((val) => {
    if (val.length > 2) {
      fetchSearch(val)
      setShow(true)
    } else {
      setShow(false);
    }
  }, 700), [fetchSearch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputval(value);
    if (value.length <= 2) setShow(false);
    debounceFetch(value);
  }

  const handleLiClick = (title) => {
    navigate(`/${title}`)
    setShow(false)

  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log("first")
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShow(false);
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [])

  return (
    <>
      <div className="relative grow max-w-2xl group" ref={containerRef}>
        <div className="relative flex items-center">
          <input value={inputval} type="search" placeholder="Search for products, brands and more" className="w-full bg-gray-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all" onChange={handleChange}
            onFocus={() => inputval.length > 3 && setShow(true)} />
          <div className="absolute left-3 text-gray-400">
            <CiSearch />
          </div>
        </div>
        {show && search && search.length > 0 && (
          <ul className={`absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl p-2 z-50 max-h-96  overflow-auto scrollbar-hidden`} >
            {search.map(s => (
              <li key={s.id}
                className="p-1 w-full not-last:border-b border-b-gray-300 hover:bg-gray-100 transition-all cursor-pointer"
                onClick={() => handleLiClick(s.title)}>
                {s.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default SearchInput;