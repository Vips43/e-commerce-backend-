import { MdOutlineShoppingBag } from "react-icons/md";
import ShoppingCart from "../ShoppingCart";
import { useEffect, useRef, useState } from "react";
import { useDummyStore } from "../../store/dummyStore";

function NavCart({ user, cart }) {
  const [active, setActive] = useState(false);

  const cartRef = useRef(null);
  const fetchProductById = useDummyStore((s) => s.fetchProductById);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        active &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);
  const handleCart = async () => {
    if (!user) return alert("please login to use cart");

    if (!active) await fetchProductById(cart);
    setActive(!active);
  };
  return (
    <>
      <section
        ref={cartRef}
        className="group relative flex items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer select-none"
      >
        <div
          className="relative flex items-center gap-2 text-gray-700"
          onClick={handleCart}
        >
          <div className="relative text-xl">
            <MdOutlineShoppingBag />
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
              {user ? (cart ? cart.length : 0) : 0}
            </span>
          </div>
          <span className="text-sm font-semibold hidden md:block">Cart</span>
        </div>
        {/* cart dropdown  */}
        <ShoppingCart active={active}/>
      </section>
    </>
  );
}

export default NavCart;
