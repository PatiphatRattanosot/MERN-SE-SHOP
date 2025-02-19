import React from "react";
import { Outlet } from "react-router";
import logo from "/images/logo.jpg";
const index = () => {
  const IsAdmin = true;
  return (
    <div>
      {IsAdmin ? (
        <div className="drawer drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard" className="flex justify-start mb-3 ">
                  <img className="h-20" src={`${logo}`} alt="" />
                  <div className="badge badge-primary">Admin</div>
                </a>
              </li>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Menu</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/admin/dashboard">Dashborad</a>
              </li>
              <li>
                <a href="/admin/orders">Manage Orders</a>
              </li>
              <li>
                <a href="/admin/add-product">Add Product</a>
              </li>
              <li>
                <a href="/admin/manage-item">Manage Item</a>
              </li>
              <li>
                <a href="/admin/user-list">All Users</a>
              </li>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Hot Link</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Product</a>
              </li>
              <li>
                <a>Order Tracking</a>
              </li>
              <li>
                <a>Customer Support</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default index;
