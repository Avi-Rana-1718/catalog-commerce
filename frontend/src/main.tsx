import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Index from './pages';
import Product from './pages/product';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Account from './pages/account';
import Auth from './pages/auth';
import Orders from './pages/orders';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index/>} />
      <Route path="/product/:id" element={<Product/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/account" element={<Account/>} />
      <Route path="/auth" element={<Auth/>} />
      <Route path="/orders" element={<Orders/>} />
    </Routes>
  </BrowserRouter>,
)
