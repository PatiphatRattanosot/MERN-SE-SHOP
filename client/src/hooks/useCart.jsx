import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import CartServices from "../services/cart.service";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await CartServices.getCartItemByEmail(user?.email);
      return response.data;
    },
  });
  return [cart, refetch];
};
export default useCart;
