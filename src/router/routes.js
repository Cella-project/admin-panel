import App from "../App";

import Auth from "../pages/Auth";

import Login from "../pages/auth/login/Login";
import ForgetPassword from "../pages/auth/forgetPassword/ForgetPassword";
import VerifyCode from "../pages/auth/verifyCode/VerifyCode";
import ResetPassword from "../pages/auth/resetPassword/ResetPassword";

import Dashboard from "../pages/Dashboard";

import Home from "../pages/dashboard/home/Home";
import Admins from "../pages/dashboard/admins/Admins";

import Stores from "../pages/dashboard/stores/Stores";
import StoreList from "../pages/dashboard/stores/StoreList";
import StoreDetails from "../pages/dashboard/stores/StoreDetails";

import StoreApplications from "../pages/dashboard/storeApplications/StoreApplications";
import StoreApplicationList from "../pages/dashboard/storeApplications/StoreApplicationList";
import StoreApplicationDetails from "../pages/dashboard/storeApplications/StoreApplicationDetails";

import Customers from "../pages/dashboard/customers/Customers";
import CustomerList from "../pages/dashboard/customers/CustomerList";
import CustomerDetails from "../pages/dashboard/customers/CustomerDetails";

import Speciality from "../pages/dashboard/speciality/Speciality";
import SpecialityList from "../pages/dashboard/speciality/SpecialityList";
import SpecialityControl from "../pages/dashboard/speciality/SpecialityControl";
import MainCategory from "../pages/dashboard/category/MainCategory";
import SubCategory from "../pages/dashboard/category/SubCategory";

import Products from "../pages/dashboard/products/Products";
import ProductList from "../pages/dashboard/products/ProductList"
import ProductDetails from "../pages/dashboard/products/ProductDetails";
import AddProduct from "../pages/dashboard/products/AddProduct";
import EditProduct from "../pages/dashboard/products/EditProduct";

import Orders from "../pages/dashboard/orders/Orders";
import OrderList from "../pages/dashboard/orders/OrderList";
import OrderDetails from "../pages/dashboard/orders/OrderDetails";
import OrdersHistory from "../pages/dashboard/orders/OrdersHistory";
import OrderHistoryList from "../pages/dashboard/orders/OrderHistoryList";
import OrderHistoryDetails from "../pages/dashboard/orders/OrderHistoryDetails";

import Delivery from "../pages/dashboard/delivery/Delivery";
import DeliveryList from '../pages/dashboard/delivery/DeliveryList'
import DeliveryDetails from '../pages/dashboard/delivery/DeliveryDetails'

import DeliveryApplication from "../pages/dashboard/deliveryApplications/DeliveryApplication";
import DeliveryApplicationList from "../pages/dashboard/deliveryApplications/DeliveryApplicationList";
import DeliveryApplicationDetails from "../pages/dashboard/deliveryApplications/DeliveryApplicationDetails";

import Reviews from "../pages/dashboard/reviews/Reviews";
import Vouchers from "../pages/dashboard/vouchers/Vouchers";
import Payments from "../pages/dashboard/payments/Payments";
import LogActivity from "../pages/dashboard/logActivity/LogActivity";
import ComplainsAndSuggestions from "../pages/dashboard/comp&suggestions/ComplainsAndSuggestions";
import Profile from "../pages/dashboard/profile/Profile";
import NotFound from "../components/global/NotFound";

import AutoGuard from "./guards/AuthGuard";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Auth />,
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "forget-password",
            element: <ForgetPassword />,
          },
          {
            path: "verify-code",
            element: <VerifyCode />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,

          },
        ],
      },
      {
        path: "/",
        element: <AutoGuard component={Dashboard} />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "admins",
            element: <Admins />,
          },
          {
            path: "stores",
            element: <Stores />,
            children: [
              {
                path: "",
                element: <StoreList />,
              },
              {
                path: ":id",
                element: <StoreDetails />,
              },
              {
                path: "storeApplications",
                element: <StoreApplications />,
                children: [
                  {
                    path: "",
                    element: <StoreApplicationList />,
                  },
                  {
                    path: ":id",
                    element: <StoreApplicationDetails />,
                  }
                ],
              }
            ],
          },
          {
            path: "customers",
            element: <Customers />,
            children: [
              {
                path: "",
                element: <CustomerList />,
              },
              {
                path: ":id",
                element: <CustomerDetails />,
              }
            ],
          },
          {
            path: "specialty",
            element: <Speciality />,
            children: [
              {
                path: "",
                element: <SpecialityList />,
              },
              {
                path: ":id",
                element: <MainCategory />,
              },
              {
                path: "mainCategory/:id",
                element: <SubCategory />,
              },
              {
                path: "specialtyControl/:id",
                element: <SpecialityControl />,
              }
            ],
          },
          {
            path: "products",
            element: <Products />,
            children: [
              {
                path: "",
                element: <ProductList />,
              },
              {
                path: ":id",
                element: <ProductDetails />,
              },
              {
                path: "editProduct/:id",
                element: <EditProduct />,
              },
              {
                path:"AddProduct",
                element:<AddProduct/>
              }
            ],
          },

          {
            path: "orders",
            element: <Orders />,
            children: [
              {
                path: "",
                element: <OrderList />,
              },
              {
                path: ":id",
                element: <OrderDetails />,
              }
            ],
          },
          {
            path: "ordersHistory",
            element: <OrdersHistory />,
            children: [
              {
                path: "",
                element: <OrderHistoryList />,
              },
              {
                path: ":id",
                element: <OrderHistoryDetails />,
              }
            ],
          },
          {
            path: "drivers",
            element: <Delivery />,
            children: [
              {
                path: "",
                element: <DeliveryList />,
              },
              {
                path: ":id",
                element: <DeliveryDetails />,
              },
              {
                path: "driverApplications",
                element: <DeliveryApplication />,
                children: [
                  {
                    path: "",
                    element: <DeliveryApplicationList />,
                  },
                  {
                    path: ":id",
                    element: <DeliveryApplicationDetails />,
                  }
                ],
              }
            ],
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
          {
            path: "vouchers",
            element: <Vouchers />,
          },
          {
            path: "payments",
            element: <Payments />,
          },
          {
            path: "logActivities",
            element: <LogActivity />,
          },
          {
            path: "comp&suggestions",
            element: <ComplainsAndSuggestions />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

