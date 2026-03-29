import { useAuthStore } from "../store/loginSignupStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import SearchInput from "./navbar-compo/SearchInput";
import NavUser from "./navbar-compo/NavUser";
import UserWishlist from "./navbar-compo/UserWishlist";
import NavCart from "./navbar-compo/NavCart";

function NavBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const cart = useCartStore((s) => s.cart);


  return (
    <nav className="z-100 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto md:px-4 h-16 flex items-center gap-2 md:gap-6">
        <div
          className="shrink-0 cursor-pointer text-blue-500"
          onClick={() => navigate(`/`)}
        >
          <span className="text-2xl font-bold pl-4">E-Comm</span>
        </div>

        <SearchInput />

        <div className="flex items-center gap-1 md:gap-4">
          <NavUser setShow={setShow} show={show} user={user} />
          {/* divider */}
          <div className="h-6 w-px bg-gray-200"></div>
          {/* cart section */}
          <NavCart user={user} cart={cart} />
        </div>
      </div>

      {/* wishlist */}
      <UserWishlist setShow={setShow} show={show} />
    </nav>
  );
}

export default NavBar;
