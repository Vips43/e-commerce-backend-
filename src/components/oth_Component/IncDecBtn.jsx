import { FaMinus, FaPlus } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";

function IncDecBtn({ user, productId, quantity }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQty = useCartStore((state) => state.decreaseQuantity);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(user.id, productId, 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    decreaseQty(user.id, productId);
  };

  return (
    <>
      <div className="h-8 flex items-center justify-around gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
        <button
          onClick={handleDecrease}
          disabled={quantity === 0}
          className="flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" >
          <FaMinus size={10} />
        </button>

        <span className="text-sm font-semibold w-4 text-center text-gray-800">
          {quantity}
        </span>

        <button
          onClick={handleAdd}
          className=" flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FaPlus size={10} />
        </button>
      </div>
    </>
  )
}

export default IncDecBtn