import { FaRegUser, FaTrashAlt, FaAngleDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import User from "./User";
import logo from '../assets/Flipkar-logo.svg'
import ShoppingCart from "./ShoppingCart";
import { useAuthStore } from "../store/loginSignupStore";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useWishStore } from "../store/wishlistStore";
import UserWishlist from "./UserWishlist";
import { useCartStore } from "../store/cartStore";
import { useDummyStore } from "../store/dummyStore";

function NavBar() {
  const [show, setShow] = useState(false)
  const [cartDropDown, setCartDropDown] = useState(false);
  const cartRef = useRef(null);

  const user = useAuthStore(state => state.user)
  const { getWishlist, wishlist } = useWishStore();
  const { cart, getUserCart } = useCartStore();
  const { fetchProductById } = useDummyStore();

  useEffect(() => {
    async function getdata() {
      if (user && user.id) {
        await getWishlist(user.id);
        await getUserCart(user.id)
      }
    }
    getdata();
  }, [user, getWishlist, getUserCart])

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartDropDown && cartRef.current && !cartRef.current.contains(event.target)) {
        setCartDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [cartDropDown])
  const handleCart = async () => {
    if (!user) return alert("please login to use cart")

    if (!cartDropDown)
      await fetchProductById(cart.map(c => c.product));
    setCartDropDown(!cartDropDown);

  }

  return (
    <nav className="z-100 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto md:px-4 h-16 flex items-center gap-2 md:gap-6">
        <div className="shrink-0">
          <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
        </div>

        <div className="relative grow max-w-2xl group">
          <div className="relative flex items-center">
            <input id="inputTag" type="search" placeholder="Search for products, brands and more" className="w-full bg-gray-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all" />
            <div className="absolute left-3 text-gray-400">
              <CiSearch />
            </div>
          </div>

          <ul
            id="inputDropDown"
            className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl hidden z-50 overflow-hidden"
          ></ul>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <section className="group relative flex items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            {user ? (
              <div className="flex items-center gap-2 text-blue-600">
                <FaRegUser />
                <span className="text-sm font-semibold hidden md:block capitalize">
                  {user.name}
                </span>
                <FaAngleDown className="transition-transform group-hover:rotate-180" />
              </div>
            ) : (
              <Link
                className="flex items-center gap-2 text-gray-700"
                to="/login" >
                <FaRegUser />
                <span className="text-sm font-semibold hidden md:block capitalize">
                  Login
                </span>
              </Link>
            )}

            {/* Dropdown menu appears on group hover */}
            {user && (
              <>
                <User setShow={setShow} show={show} />
              </>
            )}
          </section>

          {/* divider */}
          <div className="h-6 w-px bg-gray-200"></div>
          {/* cart section */}
          <section
            ref={cartRef}
            className="group relative flex items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer select-none"
          >
            <div className="relative flex items-center gap-2 text-gray-700" onClick={handleCart}>
              <div className="relative text-xl">
                <MdOutlineShoppingBag />
                <span
                  className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white" >
                  {user ? (cart ? cart.length : 0) : 0}
                </span>
              </div>
              <span className="text-sm font-semibold hidden md:block">
                Cart
              </span>
            </div>
            {/* cart dropdown  */}
            {cartDropDown && <ShoppingCart />}
          </section>
        </div>
      </div>

      {/* wishlist */}
      <UserWishlist setShow={setShow} show={show} />
    </nav>
  );
}

export default NavBar;
