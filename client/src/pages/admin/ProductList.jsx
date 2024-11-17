import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "helpers/formatCurrency";
import useAxios from "hooks/useAxios";
import { useState } from "react";
import { Edit, Trash2 } from "react-feather";

function ProductList() {
  const [page, setPage] = useState(1);
  const { response, loading, error } = useAxios(
    {
      method: "GET",
      url: `/admin/products?page=${page}`,
    },
    [page]
  );

  const onPageChange = (page) => {
    setPage(page);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Products</h1>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell className="text-center">Orders</TableCell>
              <TableCell className="text-center">Rating</TableCell>
              <TableCell>Date Created</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {response.products?.map((product, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <img
                      className="hidden mr-3 md:block rounded-sm w-14 h-14"
                      src={product.image_url}
                      alt="Product image"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{product.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatCurrency(product.price)}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm">{product.totalOrders}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span>{product.avgRating}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{format(parseISO(product.createdAt), "PPpp")}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <Edit className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <Trash2 className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={response.totalProducts ?? 0}
            resultsPerPage={12}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </div>
  );
}
export default ProductList;
