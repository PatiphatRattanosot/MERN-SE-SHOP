import React, { useState } from "react";
import CartServices from "../services/cart.service";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";
const Card = ({ item }) => {
  const { _id, name, description, price, image, category } = item;
  const { user } = useContext(AuthContext);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [cart, refetch] = useCart();

  const handleIsHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = async () => {
    if (!user || !user.email) {
      Swal.fire({
        title: "Oops...",
        text: "Please login to add to cart!",
        timer: 1500,
        icon: "error",
        position: "center",
        showConfirmButton: false,
      });
      return;
    }

    try {
      const cartItem = {
        productId: _id,
        email: user.email,
        quantity: 1,
        name: name,
        price: price,
        image: image,
      };
      const response = await CartServices.createCartItem(cartItem);
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Item added to cart.",
          timer: 1500,
          icon: "success",
          position: "center",
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error.message,
        timer: 1500,
        icon: "error",
        position: "center",
        showConfirmButton: false,
      });
    }
  };
  return (
    <div>
      <div className="card shadow-xl relative mr-5 md:my-5 h-120">
        <div
          className={`rating gap-1 absolute right-2 top-2 p-4 z-10 heartStart`}
          onClick={handleIsHeartClick}
        >
          <input
            type="radio"
            name="rating-3"
            className={`mask mask-heart  ${isHeartFilled ? "bg-red" : ""} `}
          />
        </div>
        <figure>
          <img
            src={image}
            alt=""
            className="hover:scale-105 transition-all duration-300 md:h-60"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title line-clamp-1">{name}</h2>
          <p className="line-clamp-1">{description}</p>
          <div className="card-action justify-between items-center mt-2">
            <h5 className="font-bold">
              ฿ {price}
              <span className="text-sm text-red"></span>
            </h5>

            <button className="btn bg-red text-white" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
