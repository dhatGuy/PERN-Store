import Spinner from "components/Spinner";
import Header from "components/admin/Header";
import Sidebar from "components/admin/sidebar";
import { useSidebar } from "context/SidebarContext";
import { useUser } from "context/UserContext";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const { userData, isLoading } = useUser();
  const { isSidebarOpen } = useSidebar();

  if (isLoading || !userData) return <Spinner size={100} loading />;

  if (!userData?.roles.includes("admin")) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="m-auto">
          <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            You are not authorized to access this page.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-gray-50 ${isSidebarOpen && "overflow-hidden"}`}>
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <main className="h-full overflow-y-auto">
          <Header />
          <div className="container grid px-6 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
