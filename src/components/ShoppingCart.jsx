import React, { useEffect } from "react";
import CartCard from "./oth_Component/CartCard";
import { useDummyStore } from "../store/dummyStore";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/loginSignupStore";

function ShoppingCart() {
  const cart = useCartStore(s => s.cart)
  const getUserCart = useCartStore(s => s.getUserCart)
  const emptyCart = useCartStore(s => s.emptyCart)
  const productById = useDummyStore(s => s.productById);
  const user = useAuthStore(s => s.user);

  async function handleEmpty() {
    if (user?.id) await emptyCart(user.id);
  }

  useEffect(() => {
    if (user?.id) {
      getUserCart(user.id);
    }
  }, [getUserCart, user?.id]);

  // Dynamically calculate totals based on real-time cart and product data
  const subtotal = cart && cart.reduce((total, cartItem) => {
    const productId = cartItem?.product || cartItem.productId;
    const productData = productById.find((p) => p.id === productId);
    const price = productData ? productData.price : 0;
    return total + price * cartItem.quantity;
  }, 0);

  const gst = subtotal * 0.18;
  const totalAmount = subtotal + gst;

  return (
    <section className="absolute top-full right-0 mt-2 w-96 transition-all duration-200 ease-out origin-top-right z-50 bg-gray-200 rounded-xl">
      <div className="border border-gray-100  shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-3 border-b flex justify-between items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            My Cart ({cart.length})
          </span>
          <button
            className="text-[10px] font-bold text-red-500 hover:underline disabled:opacity-50"
            onClick={handleEmpty}
            disabled={cart.length === 0}
          >
            CLEAR ALL
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-h-60 overflow-y-auto p-2 space-y-2 bg-gray-50 scrollbar-hidden">
          {cart && cart.length > 0 ? (
            cart.map((cartItem) => {
              // Find the corresponding product data from dummyStore
              const productId = cartItem.product || cartItem.productId;
              const productData = productById.find((p) => p.id === productId);

              if (!productData) return null; // Handle loading state silently

              // Merge real-time quantity from cart with static data from product
              const itemToRender = {
                ...productData,
                quantity: cartItem.quantity,
              };

              return <CartCard key={productId} item={itemToRender} />;
            })
          ) : (
            <p className="text-center py-4 text-sm text-gray-400">
              Your cart is empty
            </p>
          )}
        </div>

        {/* Footer / Checkout */}
        <div className="p-4 border-t">
          <div className="space-y-1 mb-3">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>GST (18%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-800 border-t pt-1 mt-1">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <button
            disabled={cart.length === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;