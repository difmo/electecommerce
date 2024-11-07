import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import SearchItem from "./components/SearchItem";
import Cart from "./components/Cart";
import { items } from "./components/Data";
import UserLayout from "./Layoutes/UserLayout";
import AdminDashboard from "./Admin/dashboard/AdminSideMenu";
import LoginModal from "./pages/LoginPopUp";
import SignUpPopUp from "./pages/SignUpPopUp";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";

const App = () => {
  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLayout cart={cart} setData={setData} />}>
            <Route
              path="/"
              element={<Product cart={cart} setCart={setCart} items={data} />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetail cart={cart} setCart={setCart} />}
            />
            <Route
              path="/search/:term"
              element={<SearchItem cart={cart} setCart={setCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />

            <Route
              path="/loginmodel"
              element={<LoginModal/>}
            />
            <Route
              path="/signupmodel"
              element={<SignUpPopUp/>}
            />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/myorderspage" element={<MyOrdersPage />} />

          </Route>

          <Route>
            <Route path="/admin" element={<AdminDashboard />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
