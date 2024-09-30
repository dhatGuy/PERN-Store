import { Card, Pagination } from "@windmill/react-ui";
import { ContentLayout } from "~/components/layouts";
import Product from "~/components/Product";
import Spinner from "~/components/Spinner";
import { useProduct } from "~/context/ProductContext";

const ProductList = () => {
  const { products, setPage } = useProduct();

  const handleChange = (page) => {
    setPage(page);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  if (!products) {
    return (
      <>
        <ContentLayout>
          <Spinner size={100} loading />
        </ContentLayout>
      </>
    );
  }

  return (
    <ContentLayout>
      <div className="container py-20 mx-auto space-y-2">
        <Card className="flex flex-wrap h-full mx-2">
          {/* TODO: change */}
          {products.products?.map((prod) => (
            <div
              className="w-full flex flex-col justify-between sm:w-1/2 md:w-1/3 lg:w-1/4 my-2 px-2 box-border"
              key={prod.product_id}
            >
              <Product product={prod} />
            </div>
          ))}
        </Card>
        <Pagination
          totalResults={products.totalProducts}
          resultsPerPage={12}
          onChange={handleChange}
          label="Page navigation"
        />
      </div>
    </ContentLayout>
  );
};

export default ProductList;