import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuthStore } from '../../store/loginSignupStore';

const WishlistButton = ({ productId, isWishlisted, onToggle }) => {
  const user = useAuthStore((state) => state.user);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      alert("please log in to manage wishlist")
      return;
    }
    onToggle(productId, isWishlisted)
  }

  return (
    <>
      {user ?
        <button
          onClick={handleClick}
          className={`absolute top-3 right-3 bg-white/80 backdrop-blur-sm w-8 h-8 grid place-items-center rounded-full transition-colors 
        ${user ? (isWishlisted ? 'text-red-500' : 'text-gray-500 hover:text-red-400') : "text-gray-500"}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
        :
        <button
          onClick={handleClick}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm w-8 h-8 grid place-items-center rounded-full transition-colors 
         text-gray-500" aria-label="Add to wishlist" >
          <FaRegHeart />
        </button>
      }
    </>
  );
};

export default WishlistButton;
