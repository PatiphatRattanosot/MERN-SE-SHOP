import { useState } from "react";

const categoryItem = [
  {
    id: 1,
    title: "Clothing",
    number: 86,
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 2,
    title: "Accessories",
    number: 12,
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 3,
    title: "Gadgets",
    number: 48,
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 4,
    title: "Swag",
    number: 255,
    image: "/images/home/category/img1.jpg",
  },
];

const Category = () => {
  const [categories, setCategories] = useState(categoryItem);
  return (
    <div className="section-container py-16">
      <div className="text-canter">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Categories</h2>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-around item-center-mt12">
        {categories.length > 0 &&
          categories.map((item) => (
            <div
              key={item.id}
              className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300"
            >
              <div className="w-full mx-auto flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="bg-red p-2 rounded-full w-28 h-28"
                />
              </div>
              <div className="mt-5 space-y-1">
                <h5 className="text-[#0a0a0a] font-semibold">{item.title}</h5>
                <p className="text-secondary text-sm">({item.number} item)</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
