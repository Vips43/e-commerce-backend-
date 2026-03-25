import React, { useCallback, useEffect } from 'react';
import { useDummyStore } from '../store/dummyStore';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { debounce } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { IoRefreshOutline } from 'react-icons/io5';

function SliderContainer() {
  const navigate = useNavigate();
  const fetchRandom = useDummyStore(s => s.fetchRandom)
  const random = useDummyStore(s => s.random)
  const loading = useDummyStore(s => s.isRandomLoading)
  const setRefresh = useDummyStore(s => s.setRefresh)

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  const debouncedRefresh = useCallback(
    debounce(() => setRefresh(), 900),
    [setRefresh]
  );

  const displayProducts = loading ? Array.from(new Array(8)) : (random || []);

  return (
    <section className="bg-teal-800 text-white my-10 py-6 border-y border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center px-4 mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Top Picks for you</h2>
        <button
          className={`flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer ${loading ? 'opacity-50' : ''}`}
          onClick={debouncedRefresh}
        >
          <span>
            <IoRefreshOutline size={18} />
          </span>
          {loading ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 mx-4 pb-6 snap-x snap-mandatory scrollbar-hidden">
        <AnimatePresence mode="wait">
          {displayProducts.map((r, i) => (
            <motion.div
              key={r?.id || `skeleton-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="snap-start shrink-0 group cursor-pointer bg-gray-50 rounded-2xl p-2"
            >
              {/* Image Card */}
              <div className="w-36 h-36 md:w-44 md:h-44 bg-gray-50 rounded-2xl overflow-hidden mb-3 shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                {r ? (
                  <img
                    src={r.thumbnail}
                    alt={r.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                )}
              </div>

              {/* Details */}
              <div className="w-36 md:w-44 space-y-1">
                {r ? (
                  <>
                    <h3
                      className="text-sm font-medium text-gray-700 line-clamp-1 group-hover:text-blue-600 transition-colors"
                      onClick={() => navigate(`/${r.title}`)}
                    >
                      {r.title}
                    </h3>
                    <p className="text-sm font-bold text-gray-900">$ {r.price}</p>
                  </>
                ) : (
                  <>
                    <Skeleton width="80%" height={20} />
                    <Skeleton width="40%" height={20} />
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default SliderContainer;
