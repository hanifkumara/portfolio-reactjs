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
    },
    {
      key: "product",
      path: "/main/product",
      name: "Product"
    },
    {
      key: "inventory",
      path: "/main/inventory",
      name: "Inventory"
    },
    {
      key: "assembly",
      path: "/main/assembly",
      name: "Assembly"
    },
    {
      key: "account",
      path: "/main/account",
      name: "Account"
    }
  ]

  return (
    <div className={styles.container}>
      <HeaderAside handleToggleAside={handleToggleAside}/>
      <div className={styles.wrapperMenuList}>
        <div className="d-flex flex-column">
          {listMenu.map((value, index) =>
            <NavLink className={(nav) => nav.isActive ? styles.active : ''} to={value.path} key={index}>
              <div className={styles.list} key={value.key}>
                  {value.name}
              </div>
            </NavLink>
          )}
        </div>
        {/* <ul className={styles.uList}>
          {listMenu.map((value, index) =>
            <NavLink className={styles.navLink} to={value.path} key={index}>
              <li className={styles.list} key={value.key}>
                  {value.name}
              </li>
            </NavLink>
          )}
        </ul> */}
      </div>
    </div>
  )
}
