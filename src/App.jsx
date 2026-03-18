import "./App.css";
import MainLayout from "./MainLayout";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetail";
import UserInfo from "./pages/UserInfo";
import Checkout from "./components/checkout/Checkout";
import { useAuthStore } from "./store/loginSignupStore";
import { useEffect } from "react";

const router = createBrowserRouter([{
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/:productName", element: <ProductDetails /> },
      { path: "/user/:user", element: <UserInfo /> },
    ],
  },
]);
function App() {
  const getLoggedStatus = useAuthStore((state) => state.getLoggedStatus);
  useEffect(() => {
    getLoggedStatus();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
