import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApiResponse, CartItem } from "~/enitities/cart";
import { Product } from "~/enitities/product";
import localCart from "~/helpers/localCart";
import API from "../axios.config";
import { getCartQueryOptions } from "./get-cart";

export const updateQuantity = async ({
  product,
  quantity,
}: {
  product: Product | CartItem;
  quantity: number;
}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      localCart.updateItem(product, quantity);
      return;
    }
    const response = await API.put(`/cart`, { productId: product.id, quantity });

    return cartApiResponse.parse(response.data);
  } catch (error) {
    console.log("🚀 ~ file: update-quantity.ts:15 ~ error:", error);
  }
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuantity,
    mutationKey: ["update-quantity"],
    onSuccess: () => {
      queryClient.invalidateQueries(getCartQueryOptions());
    },
  });
};
