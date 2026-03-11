import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../store/loginSignupStore";
import { useWishStore } from "../store/wishlistStore";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function User({ setShow, show }) {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)
  const wishlist = useWishStore(state => state.wishlist);
  const logout = useAuthStore(state => state.logout);

  const handleUser =()=>{
    navigate(`/user/${user.name}`)
  }

  return (
    <>
      <div className="absolute top-full right-0 mt-2 w-56 z-50 invisible opacity-0 translate-y-2 scale-95 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out origin-top-right">
        <div className="absolute -top-1 right-4 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100"></div>

        <div className="relative bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="text-base font-semibold text-gray-800 capitalize" 
            onClick={handleUser}>{user ? user.name : "Guest user"}</p>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-red-50 group/item cursor-pointer transition-colors" onClick={() => {
              console.log("clicked")
              setShow(!show);
            }}>
              <div className="flex items-center gap-2">
                <FaHeart className="group-hover/item:text-red-500" />
                <span className="text-sm text-gray-700">Wishlist</span>
              </div>
              <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                {wishlist ? wishlist.length : 9}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-100">
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors" onClick={logout}>
                <span className="text-sm">Logout</span>
                <FiLogOut />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default User;
