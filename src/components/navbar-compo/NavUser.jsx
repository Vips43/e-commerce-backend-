import { FaRegUser, FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import User from "../User";
import { useState } from "react";

function NavUser({ setShow, show, user }) {
  const [active, setActive] = useState(false);

  const handleDropdown = () => {
    setActive(!active);
  };

  return (
    <>
      <section className="group relative flex items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
        {user ? (
          <div
            className="flex items-center gap-2 text-blue-600"
            onClick={handleDropdown}
          >
            <FaRegUser />
            <span className="text-sm font-semibold hidden md:block capitalize">
              {user.name}
            </span>
            <FaAngleDown
              className={`transition-transform ${active ? "rotate-180" : ""}`}
            />
          </div>
        ) : (
          <Link className="flex items-center gap-2 text-gray-700" to="/login">
            <FaRegUser />
            <span className="text-sm font-semibold hidden md:block capitalize">
              Login
            </span>
          </Link>
        )}

        {/* Dropdown menu appears on group hover */}
        {user && (
          <>
            <User setShow={setShow} show={show} active={active} />
          </>
        )}
      </section>
    </>
  );
}

export default NavUser;
