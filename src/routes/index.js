import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { LandingPage, DashboardPage, OutletPage, LoginPage, RegisterPage, ErrorPage, ProductPage } from '../pages' 
import FullPage from '../Layout/FullPage'
import Auth from '../Layout/Auth/index'

export default function index() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login"/> } />
        <Route path="/auth" element={<Auth /> }>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/main" element={<FullPage />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="outlet" element={<OutletPage />} />
          <Route path="product" element={<ProductPage />} />
        </Route>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </div>
  )
}
