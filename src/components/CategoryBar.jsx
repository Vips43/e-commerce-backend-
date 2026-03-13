import React, { memo, useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { motion } from 'framer-motion';
import { useDummyStore } from '../store/dummyStore';

const CategoryBar = memo(() => {
  const categories = useDummyStore(state => state.categories);
  const setCategories = useDummyStore(state => state.setCategories);
  const getCatsByName = useDummyStore(state => state.getCatsByName);
  const catsByName = useDummyStore(state => state.catsByName);

  useEffect(() => {
    const fetchCategories = async () => {
      await setCategories(active);
    };
    fetchCategories();
  }, [setCategories]);
  
  const [active, setActive] = useState(categories?.[0] || '');

  useEffect(() => {
    if (categories && categories.length > 0 && !active) {
      setActive(categories?.[0]);
      getCatsByName(categories[0]);
    }
    console.log(catsByName)
  }, [categories]);

  const handleChange = (e, nextView) => {
    if (nextView !== null) {
      setActive(nextView);
      getCatsByName(nextView);
    }
  };
  if (!categories) return;

  return (
    <div className='p-2 overflow-x-auto scrollbar-hidden'>
      <ToggleButtonGroup
        value={active}
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
              color: active === cat ? 'black' : 'gray',
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
            {active === cat && (
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
