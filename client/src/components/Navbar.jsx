import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Profile from "./Profile";
import UserIcon from "./icons/UserIcon";
import Modal from "./Modal";

const Navbar = () => {
  const { user, getUser } = useContext(AuthContext);
  const userCookie = getUser();



  return (
    <>
      <div className="navbar fixed  bg-base-100 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <details>
                  <summary>Category</summary>
                  <ul className="p-2">
                    <li>
                      <a href="/shop">All</a>
                    </li>
                    <li>
                      <a href="/shop?category=cloting">Clothing</a>
                    </li>
                    <li>
                      <a href="/shop?category=accessories">Accessories</a>
                    </li>
                    <li>
                      <a href="/shop?category=gadgets">Gadgets</a>
                    </li>
                    <li>
                      <a href="/shop?category=swag">Swag</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Service</summary>
                  <ul className="p-2">
                    <li>
                      <a href="">Order Online</a>
                    </li>
                    <li>
                      <a href="">Order Tracking</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Promotion</a>
              </li>
              <li>
                <a>About Us</a>
              </li>

            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-xl">
            🛒daisyUI
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <details>
                <summary>Category</summary>
                <ul className="p-2">
                  <li>
                    <a href="/shop">All</a>
                  </li>
                  <li>
                    <a href="/shop?category=cloting">Clothing</a>
                  </li>
                  <li>
                    <a href="/shop?category=accessories">Accessories</a>
                  </li>
                  <li>
                    <a href="/shop?category=gadgets">Gadgets</a>
                  </li>
                  <li>
                    <a href="/shop?category=swag">Swag</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Service</summary>
                <ul className="p-2">
                  <li>
                    <a href="">Order Online</a>
                  </li>
                  <li>
                    <a href="">Order Tracking</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Promotion</a>
            </li>
            <li>
              <a>About Us</a>
            </li>

          </ul>
        </div>
        <div className="navbar-end space-x-1">
          {/* Ternary operator */}

          {user ? (
            <Profile />
          ) : (
            <div className="space-x-2 flex">
              <button
                onClick={() => document.getElementById("register").showModal()}
                className="btn btn-ghost rounded-full px-5 flex items-center"
              >
                register
              </button>
              <button
                onClick={() => document.getElementById("login").showModal()}
                className="btn bg-red text-white rounded-full px-5 flex items-center"
              >
                <UserIcon /> Login
              </button>
            </div>
          )}
        </div>
        <Modal name="login" />
        <Modal name="register" />
      </div>
    </>
  );
};

export default Navbar;
