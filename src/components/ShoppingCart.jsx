import React, { useEffect } from "react";
import CartCard from "./oth_Component/CartCard";
import { useDummyStore } from "../store/dummyStore";
import { useCartStore } from "../store/cartStore";

function ShoppingCart() {
  const handleIncrease = (id) => console.log("Inc", id);
  const handleDecrease = (id) => console.log("Dec", id);
  const handleRemove = (id) => console.log("Remove", id);
  const { cart } = useCartStore();
  const { productById, cartProducts } = useDummyStore();

  return (
    <>
      <section className={`absolute top-full right-0 mt-2 w-96 transition-all duration-200 ease-out origin-top-right z-50`}>
        <div className="bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-3 border-b flex justify-between items-center bg-gray-50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              My Cart
            </span>
            <button className="text-[10px] font-bold text-red-500 hover:underline">
              CLEAR ALL
            </button>
          </div>

          <div
            className="max-h-60 overflow-y-auto p-2 space-y-2"
          >
            {productById ? productById.map(item =>
              <CartCard
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            )
              : <p className="text-center py-4 text-sm text-gray-400">
                Your cart is empty
              </p>
            }
          </div>

          <div className="p-4 bg-gray-50 border-t">
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span id="Amt">₹0</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>GST (18%)</span>
                <span id="gst">₹0</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-800 border-t pt-1">
                <span>Total</span>
                <span id="total">₹0</span>
              </div>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-bold transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShoppingCart;
