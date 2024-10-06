import { useGetCart } from "~/api/cart/get-cart";
import EmptyCart from "~/features/cart/components/cart-empty";
import { CartItem } from "~/features/cart/components/cart-item";
import { CartSummary } from "~/features/cart/components/cart-summary";

export const CartRoute = () => {
  const { data: cart } = useGetCart();
  const cartItemList = cart?.data.map((item, index) => <CartItem item={item} key={index} />);

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>
        {cart?.data.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 relative">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-6">
              {cartItemList}
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full lg:sticky lg:top-20">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
