import { QueryClient, useQuery } from "@tanstack/react-query";
import { LoaderFunctionArgs, useParams } from "react-router-dom";
import { ProductDetails } from "~/features/products/components/product-details";
import { productBySlugQueryOptions } from "~/lib/queryOptions";

export const productLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { slug } = params;
    if (!slug) throw new Response("Not found", { status: 404 });

    const data = await queryClient.ensureQueryData(productBySlugQueryOptions({ slug }));

    if (!data) {
      throw new Response("Not found", { status: 404 });
    }

    return {
      product: data.data,
    };
  };

export const ProductRoute = () => {
  const { slug } = useParams() as { slug: string };
  const { data } = useQuery(productBySlugQueryOptions({ slug }));

  const product = data?.data;

  return (
    <section className="overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <ProductDetails product={product} />
      </div>
    </section>
  );
};
