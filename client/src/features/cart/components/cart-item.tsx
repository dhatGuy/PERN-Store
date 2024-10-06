import { Button } from "flowbite-react";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "react-feather";
import toast from "react-hot-toast";
import { useRemoveCartItem } from "~/api/cart/remove-item";
import { useUpdateQuantity } from "~/api/cart/update-quantity";
import type { CartItem } from "~/enitities/cart";
import { formatCurrency } from "~/helpers/formatCurrency";
import { useDebouncedCallback } from "~/hooks/useDebouncedCallback";

export function CartItem({ item }: { item: CartItem }) {
  const updateQuantityMutation = useUpdateQuantity();
  const removeItemMutation = useRemoveCartItem();
  const [value, setValue] = useState(item.quantity);

  const updateQuantity = useDebouncedCallback(async (quantity: number) => {
    toast.promise(updateQuantityMutation.mutateAsync({ product: item, quantity }), {
      loading: "Updating quantity...",
      success: "Quantity updated",
      error: "An error occurred. Please try again",
    });
  }, 1000);

  const removeItem = async () => {
    toast.promise(removeItemMutation.mutateAsync({ item }), {
      loading: "Removing item...",
      success: "Item removed",
      error: "An error occurred. Please try again",
    });
  };

  const handleChange = (qty: number) => {
    if (isNaN(qty) || qty < 1) {
      setValue(item.quantity); // reset to original value if invalid
    } else {
      setValue(qty);
      updateQuantity(qty);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img className="h-20 w-20" src={item.imageUrl} alt={item.name} />
        </div>
        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              color="gray"
              disabled={value === 1}
              onClick={() => handleChange(parseInt(String(value), 10) - 1)}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
            >
              <Minus size={20} strokeWidth={1.5} />
            </Button>
            <input
              type="text"
              id="counter-input-3"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
              value={value}
              onChange={(e) => handleChange(parseInt(e.target.value, 10))}
              required
            />

            <Button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              color="gray"
              onClick={() => handleChange(parseInt(String(value), 10) + 1)}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
            >
              <Plus size={20} strokeWidth={1.5} />
            </Button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900">{formatCurrency(item.price)}</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-gray-900">{item.name}</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
              onClick={removeItem}
              disabled={removeItemMutation.isPending}
            >
              <Trash2 size={20} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
