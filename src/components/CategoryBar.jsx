import React, { memo, useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { motion } from 'framer-motion';
import { useDummyStore } from '../store/dummyStore';

const CategoryBar = memo(() => {
  const categories = useDummyStore(state => state.categories);
  const setCategories = useDummyStore(state => state.setCategories);
  const getCatsByName = useDummyStore(state => state.getCatsByName);
  const setActiveCat = useDummyStore(state => state.setActiveCat);
  const activeCat = useDummyStore(state => state.activeCat);

  useEffect(() => {
    const fetchCategories = async () => {
      await setCategories(activeCat);
    };
    fetchCategories();
  }, [setCategories]);
  

  useEffect(() => {
    if (categories && categories.length > 0 && !activeCat) {
      setActiveCat(categories?.[0]);
      getCatsByName(categories[0]);
    }
  }, [categories]);

  const handleChange = (e, nextView) => {
    if (nextView !== null) {
      setActiveCat(nextView);
      getCatsByName(nextView);
    }
  };
  if (!categories) return;

  return (
    <div className='p-2 overflow-x-auto scrollbar-hidden'>
      <ToggleButtonGroup
        value={activeCat}
        exclusive
        onChange={handleChange}
        aria-label="categories"
        sx={{
          border: "none",
          gap: 1,
          '& .MuiToggleButtonGroup-grouped': {
            border: 'none',
            borderRadius: '20px !important',
          }
        }}
      >
        {categories.map((cat) => (
          <ToggleButton
            key={cat}
            value={cat}
            disableRipple
            sx={{
              py: 0.5,
              px: 3,
              position: "relative",
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
              textTransform: 'capitalize',
              color: activeCat === cat ? 'black' : 'gray',
              '&.Mui-selected': {
                backgroundColor: 'transparent',
                color: 'black',
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'transparent',
              }
            }}
          >
            <span className="relative z-10">{cat}</span>
            {activeCat === cat && (
              <motion.div
                layoutId='pill'
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className='absolute inset-0 w-full h-full bg-blue-200 rounded-full'
              />
            )}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  )
})

export default CategoryBar;
