import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import authService from "~/services/auth.service";
import productService from "~/services/product.service";

export const meQueryOption = queryOptions({
  queryKey: ["me"],
  queryFn: authService.getCurrentUser,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  retry(failureCount, error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return false;
    }
    return failureCount < 3;
  },
});

export const productsQueryOptions = ({ page }: { page: number }) =>
  queryOptions({
    queryKey: ["products", page],
    queryFn: () => productService.getProducts(page),
  });

export const productBySlugQueryOptions = ({ slug }: { slug: string }) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: () => productService.getProductBySlug(slug),
  });
