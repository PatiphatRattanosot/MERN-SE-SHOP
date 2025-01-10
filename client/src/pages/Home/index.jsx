import Banner from "./Banner";
import Product from "./Product";
import Service from "./Service";
import Testimonials from "./Testimonials";
import Category from "./Category";
const index = () => {
  return (
    <div className="">
      <Banner />
      <Category />
      <Product />
      <Testimonials />
      <Service />
    </div>
  );
};

export default index;
