import { MdOutlineShoppingBag } from "react-icons/md";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/loginSignupStore";
import IncDecBtn from "./IncDecBtn";

function AddToCartBtn({ productId }) {
  const user = useAuthStore((state) => state.user);

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const cartItem = cart.find((c) => String(c.product) === String(productId));
  const quantity = cartItem ? cartItem.quantity : 0;
  const isInCart = quantity > 0;

  const handleAdd =async()=>{
    await addToCart(user.id,productId)
  }

  return (
    <div onClick={(e) => e.preventDefault()}>
      {!isInCart ? (
        <button
          className="bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition-transform active:scale-95"
          onClick={handleAdd}
        >
          <span>Add</span> <MdOutlineShoppingBag />
        </button>
      ) : (
        <IncDecBtn
          quantity={quantity}
          user={user}
          productId={productId}
        />
      )}
    </div>
  );
}

export default AddToCartBtn