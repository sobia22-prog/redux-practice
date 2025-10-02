import Header from "./components/Header";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet /> 
      </main>
    </div>
  );
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductListing />} /> 
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="*" element={<div className="text-center text-gray-500">404 Not Found!</div>} />
        </Route>
      </Routes>
  );
}

export default App;
