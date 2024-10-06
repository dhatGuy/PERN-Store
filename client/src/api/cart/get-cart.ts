import { queryOptions, useQuery } from "@tanstack/react-query";
import { cartApiResponse } from "~/enitities/cart";
import { default as localCart } from "~/helpers/localCart";
import API from "../axios.config";

export const getCart = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const response = await API.get("/cart");
    return cartApiResponse.parse(response.data);
  }

  // return local cart
  return cartApiResponse.parse({
    status: "OK",
    message: "Success",
    data: localCart.getItems(),
  });
};

export const getCartQueryOptions = () => {
  return queryOptions({ queryKey: ["cart"], queryFn: getCart });
};

// export

export const useGetCart = () => {
  return useQuery(getCartQueryOptions());
};
