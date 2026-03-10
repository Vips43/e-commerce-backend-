import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

function UserWishlistCard({ product, userId, removeWishlist }) {

  return (
    <div className='group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col'>

      {/* 1. Fix: Centered Trash Icon */}
      <button className="absolute top-3 right-3 z-10 bg-white/90 text-gray-400 hover:text-red-500 w-9 h-9 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        title="Remove" onClick={() => removeWishlist(userId, product.id)}
      >
        <FaTrashAlt size={14} />
      </button>

      <div className="relative w-full aspect-4/5 bg-gray-100 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={`${product.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-semibold text-gray-800 line-clamp-1 mb-1">
          {product.title}
        </h4>
        <p className="text-sm text-gray-500 mb-3 line-clamp-3">{product.description}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            $ {product.price}
          </span>

          {/* 2. Fix: Flex row with gap for Icon + Text */}
          <button className="flex items-center gap-2 bg-gray-900 text-white text-xs px-4 py-2 rounded-lg hover:bg-gray-700 transition active:scale-95">
            <span>Add</span>
            <MdOutlineShoppingBag className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserWishlistCard;
