import React, { useEffect, useState } from "react";
import { useWishStore } from "../store/wishlistStore";
import { useAuthStore } from "../store/loginSignupStore";
import { useDummyStore } from "../store/dummyStore";
import Skeleton from "@mui/material/Skeleton";
import WishlistButton from "./oth_Component/WishlistButton";
import { useCartStore } from "../store/cartStore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "./oth_Component/AddToCartBtn";

function ProductCard() {
  const [server, setServer] = useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const setAddWishlist = useWishStore((state) => state.setAddWishlist);
  const removeWishlist = useWishStore((state) => state.removeWishlist);
  const getWishlist = useWishStore((state) => state.getWishlist);
  const wishlist = useWishStore((state) => state.wishlist);
  const catsByName = useDummyStore((s) => s.catsByName);
  const loading = useDummyStore((s) => s.isCategoryLoading);
  const cart = useCartStore((s) => s.cart);

  useEffect(() => {
    async function startBackend() {
      setServer(true);
      try {
        await fetch(`https://e-commerce-backend-zvji.onrender.com`);
      } catch (e) {
        console.error("Server wake-up failed", e);
      } finally {
        setServer(false);
      }
    }
    startBackend();
  }, []);

  useEffect(() => {
    if (user?.id) {
      getWishlist(user.id);
    }
  }, [user?.id, getWishlist]);

  const handleWishlist = (productId, isWishlisted) => {
    if (!user) return alert("Please login to access wishlist");
    if (isWishlisted) {
      removeWishlist(user.id, productId);
    } else {
      setAddWishlist(user.id, productId);
    }
  };

  const displayProducts = loading
    ? Array.from(new Array(8))
    : catsByName?.data?.products || [];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  if (server) {
    return (
      <div className="min-h-125 content-center">
        <p className="w-20 aspect-square rounded-full border-t-4 mx-auto animate-spin"></p>
      <p className="text-center my-5">Booting up server please wait <span className="animate-bounce">...</span></p>
      </div>
    );
  }

  return (
    <section>
      <div className="p-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 bg-gray-100">
        {displayProducts?.map((pr, index) => {
          const rating = Math.floor(pr?.rating);
          const isWishlisted = pr
            ? wishlist?.some((w) => String(w.productId) === String(pr.id))
            : false;

          return (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key={pr?.id || index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gray-300">
                {pr ? (
                  <img
                    loading="lazy"
                    src={pr.thumbnail}
                    alt={pr.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                )}
                {pr && (
                  <WishlistButton
                    productId={pr.id}
                    isWishlisted={isWishlisted}
                    onToggle={handleWishlist}
                  />
                )}
              </div>

              <div className="px-3 md:px-4 lg:px-5 py-3">
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex text-yellow-400 text-xs">
                    {pr ? (
                      "★".repeat(Math.min(5, Math.max(0, rating))) +
                      "☆".repeat(Math.min(5, Math.max(0, 5 - rating)))
                    ) : (
                      <Skeleton width={60} />
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {pr ? (
                      `(${pr.reviews?.length || 0} reviews)`
                    ) : (
                      <Skeleton width={40} />
                    )}
                  </span>
                </div>

                {pr ? (
                  <>
                    <h2
                      className="text-lg font-bold text-gray-900 line-clamp-1 cursor-pointer hover:underline"
                      onClick={() => navigate(`/${pr.title}`)}
                    >
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

                <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                  <p className="text-xl font-bold text-slate-800">
                    {pr ? `$${pr.price}` : <Skeleton width={50} />}
                  </p>

                  {pr ? (
                    <AddToCartBtn product={pr} user={user} cart={cart} />
                  ) : (
                    <Skeleton variant="rounded" width={80} height={35} />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default React.memo(ProductCard);
