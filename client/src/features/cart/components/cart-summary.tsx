import { Button } from "flowbite-react";
import { ArrowRight } from "react-feather";
import { Link } from "react-router-dom";

export function CartSummary() {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-gray-900">Cart summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Subtotal</dt>
            <dd className="text-base font-medium text-gray-900">$7,592.00</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Shipping fee</dt>
            <dd className="text-base font-medium text-green-600">-$299.00</dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base font-bold text-gray-900">Total</dt>
          <dd className="text-base font-bold text-gray-900">$8,191.00</dd>
        </dl>
      </div>

      <Button as={Link} to="#">
        Proceed to Checkout
      </Button>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-gray-500"> or </span>
        <Link
          to="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
