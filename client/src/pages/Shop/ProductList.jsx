import { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import Card from "../../components/Card";
import { useSearchParams } from "react-router";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [selected, setSelected] = useState("all");
  //useSearchParams จัดการคิวรี่สตริงใน URL
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const categoryQuery = searchParams.get("category") || "all";
  const itemsPerPageQuery = searchParams.get("itemsPerPage") || 4;
  useEffect(() => {
    setSelected(categoryQuery);
    setItemPerPage(itemsPerPageQuery);
  }, [categoryQuery, itemsPerPageQuery]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductService.getAll();
      setProducts(response.data);
      setCategories([
        "all",
        ...new Set(response.data.map((item) => item.category)),
      ]);
      setFilteredItems(response.data);
    };
    fetchData();
  }, []);

  const filterItem = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    setFilteredItems(filtered);
    handleSortChange(filtered);
    setSelected(category);
  };

  const handleSortChange = (option, products) => {
    setSortOption(option);
    let sortedItem = [...products];
    switch (option) {
      case "a-z":
        sortedItem.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedItem.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItem.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItem.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedItem.sort((a, b) => a.price - b.price);
        break;
    }
    setFilteredItems(sortedItem);
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8 ">
          {/* Filter */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            {categories.map((category, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    selected === category ? "active" : ""
                  } px-4 py-2 rounded-full`}
                  onClick={() => filterItem(category)}
                >
                  <p className="capitalize">{category}</p>
                </button>
              );
            })}
          </div>
          {/* Sort Options */}
          <div className="flex justify-end md-4 rounded-sm">
            <div className="bg-black p-2">
              <select
                name="sortOption"
                id="sortOption"
                onChange={(e) =>
                  handleSortChange(e.target.value, filteredItems)
                }
                className="bg-black text-white px-2 rounded-sm"
              >
                <option value="default">default</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>
          {/* Product List */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {currentItem.length > 0 &&
              currentItem.map((item, index) => {
                return <Card key={index} item={item} />;
              })}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center my-8 flex-wrap gap-2">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemPerPage),
          }).map((__, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === index + 1 ? "bg-red text-white" : "bg-gray-50"
              } `}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
