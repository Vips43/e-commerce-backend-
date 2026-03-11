import React, { useEffect, useState } from 'react';
import UserCartProducts from '../components/user/UserCartProducts';
import UserWishlistProducts from '../components/user/UserWishlistProducts';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/loginSignupStore';
import { useDummyStore } from '../store/dummyStore';

function UserInfo() {
  const [activeTab, setActiveTab] = useState(0);
  
  const { getUserCart, cart } = useCartStore();
  const { user, getLoggedStatus } = useAuthStore();
  const { productById, fetchProductById } = useDummyStore();
  
  const [qty, setQty] = useState(cart.map(c => c.quantity))
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    getLoggedStatus();
  }, [])

  useEffect(() => {
    const getData = async () => {
      if (activeTab === 1) {
        await getUserCart();
        await fetchProductById(cart)
      }
    };
    getData();
  }, [cart]);

  return (
    <section className='grid grid-cols-[auto_1fr] md:grid-cols-[1fr_3fr] min-h-screen bg-gray-50'>
      <aside className='bg-white border-r border-gray-200 p-4'>
        <Typography variant="h6" className="mb-6 px-4 font-bold text-gray-700 hidden lg:block">
          My Account
        </Typography>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: 'none' } }} // Hide the bar
          sx={{ alignItems: 'flex-start', minHeight: 0 }}
        >
          <Tab
            icon={<FaHeart />}
            iconPosition="start"
            label={<span className="hidden lg:inline">Wishlist Items</span>}
            disableRipple
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 0,
              py: 1.5,
              width: '100%',
              justifyContent: 'flex-start',
              '&.Mui-selected': {
                bgcolor: "#f3f4f6",
                borderRadius: '8px',
                '& .MuiTab-iconWrapper': { color: '#ef4444' },
              },
            }}
          />

          <Tab
            icon={<FaShoppingCart />}
            iconPosition="start"
            label={<span className="hidden lg:inline">Cart Items</span>}
            disableRipple
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 0,
              py: 1.5,
              width: '100%',
              justifyContent: 'flex-start',
              '&.Mui-selected': {
                color: '#2563eb',
                bgcolor: "#eff6ff",
                borderRadius: '8px',
              }
            }}
          />
        </Tabs>
      </aside>

      <section className='p-8'>
        <Box role="tabpanel">
          {activeTab === 0 && (
            <div className="animate-in fade-in duration-300">
              <Typography variant="h4" className="mb-6 font-bold">Your Wishlist</Typography>
              <UserWishlistProducts />
            </div>
          )}
          {activeTab === 1 && (
            <div className="animate-in fade-in duration-300">
              <Typography variant="h4" className="mb-6 font-bold">Shopping Cart</Typography>
              <div className="bg-white rounded-xl shadow-sm px-6 divide-y divide-gray-100">
                {productById.length > 0 ? (
                  productById.map((item,i) => (
                    <UserCartProducts key={i} quantity={qty} item={item} />
                  ))
                ) : (
                  <p className="py-10 text-center text-gray-400">Your cart is empty</p>
                )}
              </div>
            </div>
          )}
        </Box>
      </section>
    </section>
  );
}

export default UserInfo;
