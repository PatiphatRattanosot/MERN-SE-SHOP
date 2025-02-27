import StripeServices from "../services/stripe.service";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const PaymentButton = ({ cartItem }) => {
  const { user } = useContext(AuthContext);
  const handleCheckOut = async () => {
    StripeServices.createCheckoutSession({
      email: user.email,
      cartItem,
    })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <button
        className="btn-md bg-red text-white px-8 py-1"
        onClick={handleCheckOut}
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default PaymentButton;
