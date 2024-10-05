import { queryOptions } from "@tanstack/react-query";
import authService from "~/services/auth.service";
import productService from "~/services/product.service";

export const meQueryOption = queryOptions({
  queryKey: ["me"],
  queryFn: authService.getCurrentUser,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  enabled() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const parsedToken = JSON.parse(token);
    if (!parsedToken) return false;

    return true;
  },
  retry: false,
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
