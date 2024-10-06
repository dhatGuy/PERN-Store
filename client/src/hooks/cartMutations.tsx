import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meQueryOption } from "~/lib/queryOptions";
import cartService from "~/services/cart.service";

const addItemMutation = useMutation({
  mutationFn: async ({ product, quantity }) => {
    if (isLoggedIn) {
      return await cartService.addToCart(product.product_id, quantity);
    } else {
      localCart.addItem(product, quantity);
      return { data: { items: localCart.getItems() } };
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["cart"]);
  },
});

const removeItemMutation = useMutation({
  mutationFn: async (product_id) => {
    if (isLoggedIn) {
      return await cartService.removeFromCart(product_id);
    } else {
      localCart.removeItem(product_id);
      return { data: { items: localCart.getItems() } };
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["cart"]);
  },
});

const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(meQueryOption.queryKey);
  return useMutation({
    mutationKey: ["cart", "update-quantity"],
    mutationFn: async ({ product_id, increment }) => {
      if (user?.data) {
        return increment
          ? await cartService.increment(product_id)
          : await cartService.decrement(product_id);
      } else {
        increment
          ? localCart.incrementQuantity(product_id)
          : localCart.decrementQuantity(product_id);
        return { data: { items: localCart.getItems() } };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
