import { QueryClient, useQuery } from "@tanstack/react-query";
import { Pagination } from "flowbite-react";
import { LoaderFunctionArgs, useSearchParams } from "react-router-dom";
import { ProductItem } from "~/features/products/components/product-item";
import { productsQueryOptions } from "~/lib/queryOptions";

export const productsLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const page = Number(new URL(request.url).searchParams.get("page") || 1);
    const res = await queryClient.ensureQueryData(productsQueryOptions({ page }));

    return {
      data: res.data.items,
    };
  };

export const ProductRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const { data } = useQuery(productsQueryOptions({ page }));

  const handleChange = (page: number) => {
    if (page === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: String(page) });
    }
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const productList = data?.data.items.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));

  return (
    <div className="container py-20 mx-auto space-y-2">
      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {productList}
      </div>
      <Pagination
        currentPage={page}
        totalPages={Math.round((data?.data.total ?? 0) / (data?.data.limit ?? 1))}
        onPageChange={handleChange}
      />
    </div>
  );
};
