import { useContext } from "react";
import { Outlet } from "react-router";
import logo from "/images/logo.jpg";
import { AuthContext } from "../../contexts/AuthContext";

const Index = () => {
  const { logout, user } = useContext(AuthContext);
  const IsAdmin = true;

  return (
    <div className="flex">
      {IsAdmin ? (
        <div className="drawer drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-start justify-start p-4">
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-2 text-left">
              {/* Sidebar content here */}
              <li className="mb-4">
                <a href="/dashboard" className="flex items-center space-x-2">
                  <img className="h-14" src={`${logo}`} alt="Logo" />
                  <span className="badge badge-primary">Admin</span>
                </a>
              </li>
              <li className="text-sm text-gray-500">Email: {user.email}</li>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li>
                <div className="hover:underline hover:cursor-pointer hover:bg-rose-400 hover:text-white p-2 rounded" onClick={logout}>
                  Logout
                </div>
              </li>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Hot Link</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li><a className="hover:underline" href="/admin/">Dashboard</a></li>
              <li><a className="hover:underline" href="/admin/orders">Manage Orders</a></li>
              <li><a className="hover:underline" href="/admin/add-product">Add Product</a></li>
              <li><a className="hover:underline" href="/admin/manage-item">Manage Item</a></li>
              <li><a className="hover:underline" href="/admin/user-list">All Users</a></li>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Hot Link</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li><a className="hover:underline" href="/">Home</a></li>
              <li><a className="hover:underline" href="/products">Product</a></li>
              <li><a className="hover:underline" href="/order-tracking">Order Tracking</a></li>
              <li><a className="hover:underline" href="/support">Customer Support</a></li>
            </ul>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Index;
