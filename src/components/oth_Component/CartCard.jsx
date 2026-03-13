import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/loginSignupStore";
import IncDecBtn from "./IncDecBtn";

function CartCard({ item }) {
  const user = useAuthStore((state) => state.user);
  const removeFromCart = useCartStore(s => s.removeFromCart);

  const {
    id: productId,
    title = "",
    price = 0,
    thumbnail = "",
    category = "",
    quantity = 1,
  } = item || {};

  const handleRemove = async () => {
    if (user?.id) {
      await removeFromCart(user.id, productId);
    }
  };

  return (
    <div className="group flex items-start gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative w-24 h-28 sm:h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden content-center border border-gray-200">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 h-28 sm:h-32 justify-between">

        <div className="flex justify-between items-start">
          <div className="pr-2">
            <h5 className="font-semibold text-gray-800 line-clamp-1 text-base" title={title} >
              {title}
            </h5>
            <p className="text-sm w-full text-gray-500 capitalize flex justify-between gap-3">
              <span>{category}</span>
              <span className="font-medium text-sm text-gray-400">Qty: {quantity}</span>
            </p>
          </div>

          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors shrink-0"
            title="Remove Item"
          >
            <FaTrashAlt size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-2 items-start justify-between mt-auto">

          <div className="text-right flex justify-between w-full items-center">
            <p className="text-xs text-gray-400 font-medium">Total Price</p>
            <p className="text-lg font-bold text-gray-900">
              ₹{(price * quantity).toFixed(2)}
            </p>
          </div>

          {/* Quantity Controls */}
          <IncDecBtn
            quantity={quantity}
            user={user}
            productId={productId}
          />
        </div>
      </div>
    </div>
  );
}

export default CartCard;