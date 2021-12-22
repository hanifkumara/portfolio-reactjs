import React from 'react'
import styles from './HeaderAside.module.css'

export default function HeaderAside({handleToggleAside}) {

  const toggleAside = () => handleToggleAside()

  return (
    <div>
      <div className={`${styles.containerHeaderAside} d-flex justify-content-between`}>
        <div onClick={toggleAside} className="btn bg-secondary">Panah kiri</div>
        <div>HNZ POS</div>
      </div>
    </div>
  )
}
