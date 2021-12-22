import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ContentPages() {
  return (
    <div>
      <h2>Salto Depan Belakang</h2>
      <Outlet />
    </div>
  )
}
