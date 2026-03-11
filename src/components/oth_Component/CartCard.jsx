import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import IncDecBtn from "./IncDecBtn";
import { useAuthStore } from "../../store/loginSignupStore";

function CartCard({ item, onRemove }) {
  const user = useAuthStore((state) => state.user);
  const { cart } = useCartStore();
  const cartItem = cart.find((c) => String(c.product) === String(item.id));
  const quantity = cartItem ? cartItem.quantity : 1;
  console.log(item)
  const {
    title = item.title,
    productId = item.id,
    price = item.price || 0,
    thumbnail = item.thumbnail,
    category = item.category,

  } = item || {};

  return (
    <div className="group flex items-start gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">

      {/* 1. Image Section (Left) */}
      <div className="relative w-24 h-28 sm:h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden content-center border border-gray-200">
        <img
          src={thumbnail}
          alt={title}
          className="w-full object-cover"
        />
      </div>

      {/* 2. Info Section (Right) */}
      <div className="flex flex-col flex-1 h-28 sm:h-32 justify-between">

        {/* Top: Title & Remove */}
        <div className="flex justify-between items-start">
          <div>
            <h5 className="font-semibold text-gray-800 line-clamp-1 text-base"
              title={title}
            >
              {title}
            </h5>
            <p className="text-sm text-gray-500 capitalize">
              {category}
            </p>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
            title="Remove Item"
          >
            <FaTrashAlt size={16} />
          </button>
        </div>

        {/* Bottom: Quantity & Price */}
        <div className="flex flex-col gap-2 items-start justify-between mt-auto">

          {/* Price */}
          <div className="text-right flex justify-between w-full items-center">
            <p className="text-xs text-gray-400 font-medium">Unit Price</p>
            <p className="text-lg font-bold text-gray-900">
              ${(price * quantity).toFixed(2)}
            </p>
          </div>
          {/* Quantity Controls */}
          {/* <IncDecBtn quantity={quantity}
            user={user}
            productId={productId} /> */}
        </div>
      </div>
    </div>
  );
}

export default CartCard;