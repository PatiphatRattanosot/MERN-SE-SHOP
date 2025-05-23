import ProductItem from "../../components/ProductItem";
const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#f05858] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center">
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="banner" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-16 gap-4">
            <ProductItem
              image="/images/home/gamepad.png"
              name="Game Pad"
              rating="3"
              price="400"
            />
            <ProductItem
              image="/images/home/headphone.png"
              name="headphone"
              rating="4"
              price="1000"
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-snug">
            Discover Uniq <span className="text-red">Software Engineering</span>{" "}
            Swang for Every Coding En
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            our Mission: To merge the fashion with functionality in the world of
            Sofware Engineering
          </p>
          <a
            className="btn bg-red px-8 py-3 font-semibold text-white rounded-full"
            href="/shop"
          >
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
