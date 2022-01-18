import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { 
  LandingPage, 
  DashboardPage, 
  OutletPage, 
  LoginPage, 
  RegisterPage, 
  ErrorPage, 
  ProductPage, 
  AddProductPage,
  AddOutletPage,
  InventoryPage,
  IncomingStockPage,
  OutcomingStockPage,
  AssemblyPage,
  AccountPage
} from '../../pages' 
import FullPage from '../../Layout/FullPage'
import Auth from '../../Layout/Auth/index'
import DevPage from '../../pages/Dev/DevPage';

import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'

export default function index() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login"/> } />
        <Route element={<AuthRoute />}>
          <Route path="/auth" element={<Auth /> }>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<FullPage />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="outlet" element={<OutletPage />} />
            <Route path="outlet/add" element={<AddOutletPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="product/add" element={<AddProductPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/incoming-stock" element={<IncomingStockPage />} />
            <Route path="inventory/outcoming-stock" element={<OutcomingStockPage />} />
            <Route path="assembly" element={<AssemblyPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Route>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/dev-page" element={<DevPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </div>
  )
}
