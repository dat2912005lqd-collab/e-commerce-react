import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {ProductsPage} from "../pages/products/ProductsPage";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProductsPage />}
        />
        <Route
          path="/products"
          element={<ProductsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}