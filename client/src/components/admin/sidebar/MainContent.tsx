import { Button } from "@windmill/react-ui";
import { Home, Package, ShoppingCart } from "react-feather";
import { NavLink, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubMenu";

const routes = [
  {
    path: "/admin",
    icon: Home,
    name: "Dashboard",
  },
  {
    path: "/admin/products",
    icon: Package,
    name: "Products",
  },
  {
    path: "/admin/orders",
    icon: ShoppingCart,
    name: "Orders",
  },
];

function SidebarContent() {
  const location = useLocation();

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        PERN Store
      </a>
      <ul className="mt-6 flex-[2_2_0%]">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                {location.pathname === route.path && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                )}
                <route.icon className="w-5 h-5" aria-hidden="true" />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;
