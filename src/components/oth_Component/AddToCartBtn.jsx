import React, { useEffect, useId } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/loginSignupStore";

function AddToCartBtn({ product }) {
  const user = useAuthStore((s) => s.user);
  const getUserCart = useCartStore((s) => s.getUserCart);
  const addToCart = useCartStore((s) => s.addToCart);
  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const inCart = cart?.find((c) => String(c?.product) === String(product?.id));
  useEffect(() => {
    if (cart.length === 0 || !cart) return;
    const controller = new AbortController();
    const { signal } = controller;
    async function getData() {
      await getUserCart(user.id, signal);
    }
    getData();

    return () => controller.abort();
  }, []);

  const handleCart = (e) => {
    if (!useId) return alert("Please login to add items to cart");

    const productId = e.currentTarget.dataset.id;
    const inCart = cart.find((c) => String(c.product) === String(productId));

    if (inCart) {
      removeFromCart(user.id, productId);
    } else {
      addToCart(user.id, productId, 1);
    }
  };

  return (
    <>
      <button
        data-id={product.id}
        className={`${user ? (inCart ? "bg-red-700" : "bg-cyan-700") : "bg-cyan-700"} text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition-all active:scale-95`}
        onClick={handleCart}
      >
        <span>{inCart ? "Remove" : "Add"}</span> <MdOutlineShoppingBag />
      </button>
    </>
  );
}

export default AddToCartBtn;
