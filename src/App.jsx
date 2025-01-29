import OrderOverview from "./components/screens/OrderOverview";
import UserManagement from "./components/screens/UserManagement";
import Tabs from "./components/Tabs";

export default function App() {
  const tabs = [
    {
      key: "OrderOverview",
      label: "Order Overview",
      content: (
        <OrderOverview className=" relative flex flex-col items-center w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border " />
      ),
    },
    {
      key: "UserManagement",
      label: "User Management",
      content: (
        <UserManagement className="relative flex flex-col items-center w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border" />
      ),
    },
  ];
  return (
    <div className="w-screen h-screen flex flex-col  dark:bg-gray-900">
      <Tabs tabs={tabs} />
      <footer className="dark:bg-gray-900 dark:text-gray-300 min-h-12 bg-gray-200 border-t border-gray-300 py-3 flex items-center justify-center text-gray-700 text-sm">
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
