import React, { useEffect, useState } from 'react';
import UserCartProducts from '../components/user/UserCartProducts';
import { FaRegUserCircle, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { Tab, Tabs, Box } from '@mui/material';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/loginSignupStore';
import { useDummyStore } from '../store/dummyStore';
import { useWishStore } from '../store/wishlistStore';
import UserWishlistCard from '../components/UserWishlistCard';

function UserInfo() {
  const [activeTab, setActiveTab] = useState(0);

  const { getUserCart, cart } = useCartStore();
  const { getLoggedStatus, user } = useAuthStore();
  const { getWishlist, wishlist } = useWishStore();
  const { productById, fetchProductById, loading } = useDummyStore();

  const [qty, setQty] = useState([]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (cart) setQty(cart?.map(c => c.quantity));
    getLoggedStatus();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (activeTab === 1) {
        await getUserCart();
        await fetchProductById(cart);
      } else if (activeTab === 0) {
        await getWishlist(user?.id);
        await fetchProductById(wishlist);
      }
    };
    getData();
  }, [activeTab, getUserCart]);

  const LoadingSpinner = () => (
    <div className='w-full col-span-full min-h-[50vh] flex justify-center items-center'>
      <div className='w-12 aspect-square rounded-full border-y-4 border-y-blue-600 animate-spin'></div>
    </div>
  );

  return (
    <div className='grid grid-cols-[80px_1fr_10px] md:grid-cols-[260px_1fr] min-h-screen bg-gray-50 transition-all duration-300'>
      <aside className='bg-white border-r border-gray-200 py-6 px-1 md:px-4 sticky top-0 h-screen overflow-y-auto flex flex-col items-center md:items-stretch shadow-sm'>
        <h6 className="mb-8 px-2 font-semibold text-2xl text-blue-500 tracking-wide inline-flex items-center gap-4 capitalize">
          <FaRegUserCircle /> <span className='hidden md:block'> {user?.name}</span>
        </h6>

        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            width: '100%',
            alignItems: 'center',
            '@media (min-width: 768px)': {
              alignItems: 'stretch'
            },
            '& .MuiTabs-flexContainer': { gap: 1.5 }
          }}
        >
          <Tab
            icon={<FaHeart size={20} />}
            iconPosition="start"
            label={<span className="hidden md:inline whitespace-nowrap text-base">Wishlist Items</span>}
            disableRipple
            sx={{
              minHeight: '45px',
              mx: 'auto',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              color: '#6b7280',
              transition: 'all 0.2s ease-in-out',
              width: '45px',
              minWidth: '45px',
              justifyContent: 'center',
              px: 0,
              '& .MuiTab-iconWrapper': {
                margin: 0
              },
              '@media (min-width: 768px)': {
                width: '100%',
                minWidth: '100%',
                justifyContent: 'flex-start',
                px: 2.5,
                '& .MuiTab-iconWrapper': {
                  margin: '0 16px 0 0'
                }
              },
              '&:hover': {
                bgcolor: '#f9fafb',
              },
              '&.Mui-selected': {
                color: '#ef4444',
                bgcolor: '#fef2f2',
              }
            }}
          />

          <Tab
            icon={<FaShoppingCart size={20} />}
            iconPosition="start"
            label={<span className="hidden md:inline whitespace-nowrap text-base">Cart Items</span>}
            disableRipple
            sx={{
              minHeight: '45px',
              mx: 'auto',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              color: '#6b7280',
              transition: 'all 0.2s ease-in-out',
              width: '45px',
              minWidth: '40px',
              justifyContent: 'center',
              px: 0,
              '& .MuiTab-iconWrapper': {
                margin: 0
              },
              '@media (min-width: 768px)': {
                width: '100%',
                minWidth: '100%',
                justifyContent: 'flex-start',
                px: 2.5,
                '& .MuiTab-iconWrapper': {
                  margin: '0 16px 0 0'
                }
              },
              '&:hover': {
                bgcolor: '#f9fafb',
              },
              '&.Mui-selected': {
                color: '#2563eb',
                bgcolor: '#eff6ff',
              }
            }}
          />
        </Tabs>
      </aside>

      <main className='md:p-10 w-full max-w-300 mx-auto overflow-x-hidden'>
        <Box role="tabpanel">
          {activeTab === 0 && (
            <div className="animate-in fade-in duration-500">
              <h5 className="my-6 ml-5 font-semibold text-2xl text-gray-800 tracking-tight">
                Your Wishlist
              </h5>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 divide-y grid gap-3 grid-cols-[repeat(auto-fill,minmax(170px,1fr))] divide-gray-100">
                {loading ? (
                  <LoadingSpinner />
                ) : productById.length > 0 ? (
                  productById.map((item, i) => (
                    <UserWishlistCard userId={user?.id} key={i} quantity={qty} product={item} />
                  ))
                ) : (
                  <div className="py-16 col-span-full flex flex-col items-center justify-center">
                    <FaRegHeart className="text-gray-200 text-6xl mb-4" />
                    <p className="text-lg text-gray-500 font-medium">Your wishlist is empty</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="animate-in fade-in duration-500">
              <h5 className="my-6 font-semibold text-2xl ml-5 text-gray-800 tracking-tight">
                Shopping Cart
              </h5>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 divide-y divide-gray-100">
                {loading ? (
                  <LoadingSpinner />
                ) : productById.length > 0 ? (
                  productById.map((item, i) => (
                    <UserCartProducts key={i} quantity={qty} item={item} />
                  ))
                ) : (
                  <div className="py-16 flex flex-col items-center justify-center">
                    <FaShoppingCart className="text-gray-200 text-6xl mb-4" />
                    <p className="text-lg text-gray-500 font-medium">Your cart is empty</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Box>
      </main>
      <aside className='bg-white'></aside>
    </div>
  );
}

export default UserInfo;