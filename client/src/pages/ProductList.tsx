import { useQuery } from "@tanstack/react-query";
import { Pagination } from "flowbite-react";
// import { Card } from "@windmill/react-ui";
import { useState } from "react";
import Product from "~/components/Product";
import { productsQueryOptions } from "~/lib/queryOptions";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(productsQueryOptions({ page }));

  const handleChange = (page) => {
    setPage(page);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  // console.log("🚀 ~ file: ProductList.tsx:24 ~ ProductList ~ data:", data);
  return (
    <div className="container py-20 mx-auto space-y-2">
      <div className="flex flex-wrap h-full mx-2">
        {data?.data?.items?.map((prod) => (
          <div
            className="w-full flex flex-col justify-between sm:w-1/2 md:w-1/3 lg:w-1/4 my-2 px-2 box-border"
            key={prod.id}
          >
            <Product product={prod} />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={data?.data?.total ?? 0}
        onPageChange={handleChange}
      />
    </div>
  );
};

export default ProductList;
