import OrderOverview from "./components/OrderOverview";
import UserManagement from "./components/UserManagement";

export default function App() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col ">
        <header className="h-20 border-b-2">Header</header>
        <main className="grid grid-cols-2 place-items-center divide-x-2 flex-1">
          <section className="size-full">
            <OrderOverview />
          </section>
          <section className="size-full">
            <UserManagement />
          </section>
        </main>
        <footer className="h-20 border-t-2">Footer</footer>
      </div>
    </>
  );
}
