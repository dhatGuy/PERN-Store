import { Button } from "@windmill/react-ui";
import Spinner from "components/Spinner";
import { formatCurrency } from "helpers/formatCurrency";
import useAxios from "hooks/useAxios";
import ReactStars from "react-rating-stars-component";
import { NavLink, useParams } from "react-router-dom";

function ProductDetails() {
  const { slug } = useParams();

  const {
    response: product,
    loading,
    error,
  } = useAxios(
    {
      method: "GET",
      url: `/products/${slug}`,
    },
    [slug]
  );

  if (loading) return <Spinner size={100} />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="my-6 text-2xl font-semibold text-gray-700">Product Details</h1>

        <div className="flex">
          <NavLink to={`/admin/products/${product?.slug}/edit`}>
            <Button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Edit
            </Button>
          </NavLink>
        </div>
      </div>

      <section className="body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              decoding="async"
              loading="lazy"
              src={product?.image_url}
              alt={product?.name}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-contain md:object-cover object-center rounded"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-3xl title-font font-medium mb-1">{product?.name}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    edit={false}
                    value={+product?.avg_rating}
                    activeColor="#ffd700"
                  />
                  <span className="ml-3">
                    {+product?.count > 0 ? `${+product.count} Ratings` : "No ratings available"}
                  </span>
                </span>
              </div>
              <p className="leading-relaxed pb-6 border-b-2 border-gray-800">
                {product?.description}
              </p>
              <div className="flex mt-4 justify-between">
                <span className="title-font font-medium text-2xl">
                  {formatCurrency(product?.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ProductDetails;
