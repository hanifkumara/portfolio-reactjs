import React from 'react'
import styles from './AsideList.module.css'
import HeaderAside from '../Components/HeaderAside'
import { NavLink } from 'react-router-dom'

export default function AsideList({handleToggleAside}) {

  const listMenu = [
    {
      key: "dashboard",
      path: "/main/dashboard",
      name: "Dashboard"
    },
    {
      key: "outlet",
      path: "/main/outlet",
      name: "Outlet"
    }
  ]

  return (
    <div className={styles.container}>
      <HeaderAside handleToggleAside={handleToggleAside}/>
      <ul>
        {listMenu.map(value =>
          <li key={value.key}>
            <NavLink to={value.path}>
              {value.name}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}
