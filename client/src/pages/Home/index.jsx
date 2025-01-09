import Banner from "./Banner";
import Product from "./Product";
import Service from "./Service";
import Testimonials from "./Testimonials";
import Category from "./Category";
const index = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Product />
      <Service />
      <Testimonials />
    </div>
  );
};

export default index;
