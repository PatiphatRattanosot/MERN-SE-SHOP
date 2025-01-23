import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useRef, useState } from "react";
import Card from "../../components/Card";
import { useEffect } from "react";
import ProductService from "../../services/product.service";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
    >
      Next
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
    >
      Prev
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const slider = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductService.getAll();
      setProducts(response.data);
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Item</p>
        <h2 className="title">Standout Item from Our Products</h2>
      </div>
      <div className="md:absolute right-3 top-3 mb-10 md:mr-24  space-x-2">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn btn-red p-2 rounded-full w-20 h-20 mt-5  text-white hover:bg-blue-400"
        >
          👈
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn btn-red p-2 rounded-full w-20 h-20  mt-5  text-white hover:bg-blue-400"
        >
          👉
        </button>
      </div>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden mt-10 space-x-5"
        >
          {products.length > 0 &&
            products.map((item, index) => (
              <Card item={item} key={index}></Card>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Product;
