import { useCallback, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDummyStore } from "../../../store/dummyStore";
import { useNavigate } from "react-router-dom";


function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

function SearchInput() {
  const navigate = useNavigate();
  const liRef = useRef(null);
  const [show, setShow] = useState(false)
  const [inputval, setInputval] = useState(null)
  const [click, setClick] = useState(false)

  const fetchSearch = useDummyStore(state => state.fetchSearch);
  const search = useDummyStore(state => state.search);

  const debounceFetch = useCallback(debounce((val) => {
    if (val.length > 2) {
      fetchSearch(val)
      setShow(true)
    } else {
      setShow(false);
    }
  }, 700), [fetchSearch])

  const handleChange = (e) => {
    const value = e.target.value;
    setInputval(value);
    debounceFetch(value);
  }

  const handleLiClick = (title) => {
    console.log(title)
    navigate(`/${title}`)
    setShow(false)

  }

  return (
    <>
      <div className="relative grow max-w-2xl group">
        <div className="relative flex items-center">
          <input type="search" placeholder="Search for products, brands and more" className="w-full bg-gray-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all" onChange={handleChange} />
          <div className="absolute left-3 text-gray-400">
            <CiSearch />
          </div>
        </div>
        {show && search && search.length > 0 && (
          <ul className={`absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl p-2 z-50 max-h-96  overflow-auto scrollbar-hidden`} >
            {search.map(s => (
              <li ref={liRef} key={s.id} className="p-1 w-full not-last:border-b border-b-gray-300 hover:bg-gray-100 transition-all cursor-pointer" onClick={() => handleLiClick(s.title)}>
                {s.title}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default SearchInput