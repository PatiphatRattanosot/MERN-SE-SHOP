import React, { useState } from "react";

const Card = ({ item }) => {
  const { _id, name, description, price, image, category } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleIsHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div className="card shadow-xl relative me-5 md:my-5 h-120">
      <div className="rating gap-1">
        <input
          type="radio"
          name="rating-3"
          className={`mask mask-heart ${isHeartFilled ? "bg-green-400" : " "}`}
          onClick={handleIsHeartClick}
        />
      </div>

      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-60 object-cover h-30"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="title">{name}</h2>
        <p>{description}</p>
        <div className="card-action justify-between item-center mt-2">
          <h5 className="font-bold">
            {price} <span className="text-sm text-red">$</span>
          </h5>
          <button className="btn">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
