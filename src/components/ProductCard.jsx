import React, { useEffect } from 'react';
import { useWishStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/loginSignupStore';
import { useDummyStore } from '../store/dummyStore';
import { MdOutlineShoppingBag } from "react-icons/md";
import Skeleton from '@mui/material/Skeleton';
import WishlistButton from './oth_Component/WishlistButton';
import { useCartStore } from '../store/cartStore';
import { motion } from 'framer-motion'
import AddToCartBtn from './oth_Component/AddToCartBtn';

function ProductCard() {
  const user = useAuthStore(state => state.user);
  const setAddWishlist = useWishStore(state => state.setAddWishlist);
  const removeWishlist = useWishStore(state => state.removeWishlist);
  const getWishlist = useWishStore(state => state.getWishlist);
  const wishlist = useWishStore(state => state.wishlist);
  const catsByName = useDummyStore(state => state.catsByName);
  const loading = useDummyStore(state => state.loading);
  const { setAddToCart } = useCartStore();

  useEffect(() => {
    if (user?.id)
      getWishlist(user.id)
  }, [user?.id, getWishlist])

  const handleWishlist = (productId, isWishlisted) => {
    if (!user) return alert("Please login to access wishlist");
    if (isWishlisted) {
      removeWishlist(user.id, productId);
    } else {
      setAddWishlist(user.id, productId);
    }
  };
  const handleCart = (productId) => {
    if (user) {
      let quantity;
      setAddToCart(user.id, productId, quantity = 1)
    } else return alert("Please login to access cart")
  }

  const displayProducts = loading ? Array.from(new Array(8)) : (catsByName?.data?.products || []);

  const variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === 1 ? -300 : 300
    }),
    visible: { opacity: 1, x: 0 }
  }
  return (
    <section>
      <main className="p-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 bg-gray-300">
        {displayProducts?.map((pr, index) => {

          const isWishlisted = pr ? wishlist?.some(w => String(w.productId) === String(pr.id)) : false;

          return (
            <motion.div variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key={pr?.id || index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-56 bg-gray-300">
                {pr ? (
                  <img loading='lazy' src={pr.thumbnail} alt={pr.title} className="w-full h-full object-cover" />
                ) : (
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                )}
                {pr && (
                  <WishlistButton productId={pr.id} isWishlisted={isWishlisted} onToggle={handleWishlist} />
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex text-yellow-400 text-xs">
                    {pr ? "★★★★★" : <Skeleton width={60} />}
                  </div>
                  <span className="text-xs text-gray-400">
                    {pr ? `(${pr.reviews?.length || 0} reviews)` : <Skeleton width={40} />}
                  </span>
                </div>

                {pr ? (
                  <>
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                      {pr.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">
                      {pr.description}
                    </p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="100%" />
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xl font-bold text-slate-800">
                    {pr ? `$${pr.price}` : <Skeleton width={50} />}
                  </p>

                  {pr ? (
                    <AddToCartBtn productId={pr.id} />
                  ) : (
                    <Skeleton variant="rounded" width={80} height={35} />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </main>
    </section>
  );
}

export default ProductCard;
