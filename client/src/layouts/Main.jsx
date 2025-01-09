import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
