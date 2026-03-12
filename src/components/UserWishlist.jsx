import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import UserWishlistCard from "./UserWishlistCard";
import { useWishStore } from "../store/wishlistStore";
import { useAuthStore } from "../store/loginSignupStore";
import { useDummyStore } from "../store/dummyStore";

function UserWishlist({ setShow, show }) {
  const { user } = useAuthStore();
  const { wishlist, getWishlist, removeWishlist } = useWishStore();
  const { catsByName } = useDummyStore();

  useEffect(() => {
    if (show && user?.id) {
      getWishlist(user.id);
    }
  }, [show, user?.id, getWishlist]);

  const wishlistProducts = wishlist
    ?.map((item) => {
      const product = catsByName?.data?.products?.find(
        (p) => String(p.id) === String(item.productId)
      );
      return product;
    })
    .filter(Boolean);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShow]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4" >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-gray-50 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden" >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-gray-800">
                  Your Wishlist
                </h3>
                <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-full">
                  {wishlistProducts?.length || 0} Items
                </span>
              </div>

              <button
                className="text-gray-400 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer" onClick={() => setShow(false)} >
                <GrClose />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-gray-50/50">
              {wishlistProducts?.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 md:gap-6">
                  {wishlistProducts.map((product) => (
                    <UserWishlistCard 
                      key={product.id}
                      product={product}
                      userId={user?.id} />
                  ))}
                </div>
              ) : (
                // Empty State
                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                  <FaTrashAlt size={40} className="mb-4" />
                  <p>Your wishlist is empty.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-gray-200 flex justify-between items-center">
              <button className="text-red-500 hover:text-red-700 text-sm font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <FaTrashAlt /> Clear All
              </button>

              <button className="bg-rose-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-rose-700 transition-transform active:scale-95 font-medium">
                Add All to Cart
              </button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default UserWishlist;