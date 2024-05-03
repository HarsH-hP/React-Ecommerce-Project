import { useEffect, useState } from "react";
import "./App.css";
import ProductList from "./features/product-list/components/ProductList";
import { Provider, useDispatch, useSelector } from "react-redux";
import HomePage from "./complete-web-pages/HomePage";
import LogInPage from "./complete-web-pages/LogInPage";
import SignUpPage from "./complete-web-pages/SignUpPage";
import CartPage from "./complete-web-pages/CartPage";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import CheckoutPage from "./complete-web-pages/CheckoutPage";
import ProductDetailPage from "./complete-web-pages/ProductDetailPage";
import { store } from "./Store";
import Protected from "./features/authorization/components/Protected";
import { fetchUserCartItemsAsyncThunk } from "./features/cart-details/slices/cartSlice";
import { selectLoggedInUser } from "./features/authorization/slices/authSlice";
import ErrorPage from "./complete-web-pages/ErrorPage";
import OrderSuccessPage from "./complete-web-pages/OrderSuccessPage";
import UserOrdersPage from "./complete-web-pages/UserOrdersPage";
import UserProfilePage from "./complete-web-pages/UserProfilePage";
import { fetchLoggedInUserInfoAsyncThunk } from "./features/user/slices/userSlice";
import LogOutComponent from "./features/authorization/components/LogOutComponent";
import ProtectedAdmin from "./features/authorization/components/ProtectedAdmin";
import AdminHomePage from "./complete-web-pages/AdminPages/AdminHomePage";
import AdminProductDetailPage from "./complete-web-pages/AdminPages/AdminProductDetailPage";
import AdminProductFormComponent from "./features/admin/components/AdminProductFormComponent";
import AdminProductFormPage from "./complete-web-pages/AdminPages/AdminProductFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <HomePage></HomePage>
    ),
  },
  {
    path: "/login",
    element: <LogInPage></LogInPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id", //:id => can be used using params.id where const params = useParams()
    element: (
      
        <ProductDetailPage></ProductDetailPage>
    
    ),
  },
  {
    path: '/order-success/:id',
    element: (
      <Protected>
      <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    )
  },
  {
    path: '/orders',
    element: (
      <Protected>
      <UserOrdersPage></UserOrdersPage>
      </Protected>
    )
  },
  {
    path: '/profile',
    element: (
      <Protected>
      <UserProfilePage></UserProfilePage>
      </Protected>
    )
  },
  {
    path: '/logout',
    element: (
      <LogOutComponent></LogOutComponent>
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHomePage></AdminHomePage>
      </ProtectedAdmin>
    )
  },
  {
    path:"/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    )
  },
  {
    path:"/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    )
  },
  {
    path:"/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    )
  },
  {
    path: '*',
    element: (
      <ErrorPage></ErrorPage>
    )
  },
]);

function App() {
  
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchUserCartItemsAsyncThunk(user.id));
      dispatch(fetchLoggedInUserInfoAsyncThunk(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      {/* <Provider store={store}> */}
      <RouterProvider router={router} />
      {/* </Provider> */}
    </>
  );
}

export default App;
