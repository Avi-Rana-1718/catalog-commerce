import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';

import './index.css'
import SearchPage from './pages/SearchPage';
import AdminCoupons from './pages/admin/AdminCoupons';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/product/:id" element={<ProductPage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/checkout" element={<CheckoutPage/>} />
      <Route path="/account" element={<AccountPage/>} />
      <Route path="/auth" element={<AuthPage/>} />
      <Route path="/orders" element={<OrdersPage/>} />
      <Route path="/search" element={<SearchPage/>} />

      <Route path="/admin" element={<AdminDashboard/>} />
      <Route path="/admin/orders" element={<AdminOrders/>} />
      <Route path="/admin/coupons" element={<AdminCoupons/>} />
    </Routes>
  </BrowserRouter>,
)
