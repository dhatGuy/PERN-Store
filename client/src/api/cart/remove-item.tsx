import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "~/enitities/cart";
import API from "../axios.config";
import { getCartQueryOptions } from "./get-cart";

export const removeCartItem = async ({ item }: { item: CartItem }) => {
  const { id } = item;

  const response = await API.delete(`/cart`, {
    data: {
      productId: id,
    },
  });

  return response.data;
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart", "remove-item"],
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(getCartQueryOptions());
    },
  });
};
