import './App.css'
import MainLayout from "./MainLayout";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import HomePage from './pages/HomePage';
import AddToCartBtn from './components/oth_Component/AddToCartBtn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/btn", element: <AddToCartBtn /> },
    ]
  }
])

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
