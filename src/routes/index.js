import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { LandingPage, DashboardPage, OutletPage } from '../pages' 
import FullPage from '../Layout/FullPage'

export default function index() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/main"/>}/>
        <Route path="/main" element={<FullPage />} >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="outlet" element={<OutletPage />} />
        </Route>
        <Route path="/landing-page" element={<LandingPage />} />
      </Routes>
    </Router>
    </div>
  )
}
