import {
  Dropdown,
  DropdownItem,
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
import { ChevronDown } from "react-feather";
import { NavLink } from "react-router-dom";

const Row = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  return (
    <TableRow>
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
        <span className="text-sm">{format(parseISO(product?.createdAt), "PPpp")}</span>
      </TableCell>
      <TableCell>
        <div className="relative">
          <div className="inline-flex items-center overflow-hidden rounded-2xl border bg-white">
            <NavLink
              to={`${product.slug}`}
              className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50"
            >
              View
            </NavLink>

            <button className="h-full p-2 text-gray-600 hover:bg-gray-50">
              <span className="sr-only">Menu</span>
              <ChevronDown onClick={toggleDropdown} className="w-4 h-4" aria-hidden="true" />
              <Dropdown
                isOpen={isOpen}
                // onClose={() => setIsOpen(false)}
                align="left"
                aria-label="Actions"
                aria-haspopup="true"
                className="z-10 w-36 p-0 mt-2"
              >
                <DropdownItem tag="a" href="#" className="">
                  <NavLink to={`${product.slug}/edit`} className="w-full text-left">
                    <span>Edit</span>
                  </NavLink>
                </DropdownItem>

                <DropdownItem onClick={() => alert("Alerts!")} className="">
                  <span>Delete</span>
                </DropdownItem>
              </Dropdown>
            </button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

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
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {response.products?.map((product, i) => (
              <Row key={i} product={product} />
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
