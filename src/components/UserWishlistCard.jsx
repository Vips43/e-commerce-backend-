import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import AddToCartBtn from "./oth_Component/AddToCartBtn";
import { useWishStore } from "../store/wishlistStore";
import { useEffect } from "react";

function UserWishlistCard({ product, userId }) {
  const removeWishlist = useWishStore(s=>s.removeWishlist)
  const getWishlist = useWishStore(s=>s.getWishlist)
  
  useEffect(() => {
    async function getData() {
      await getWishlist(userId);
    }
    getData();
  }, [])

  return (
    <div className='group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col'>

      <button className="absolute top-3 right-3 z-10 bg-white/90 text-gray-400 hover:text-red-500 w-9 h-9 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        title="Remove" onClick={() => removeWishlist(userId, product.id)}
      >
        <FaTrashAlt size={14} />
      </button>

      <div className="relative w-full h-40 aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={`${product.name}`}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-semibold text-gray-800 line-clamp-1 mb-1">
          {product.title}
        </h4>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-base md:text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          {/* 2. Fix: Flex row with gap for Icon + Text */}
          <AddToCartBtn product={product} user={userId} />
        </div>
      </div>
    </div>
  )
}

export default UserWishlistCard;
