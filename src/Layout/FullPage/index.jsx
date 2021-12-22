import React, { useState } from 'react'
import { AsideList } from '../Aside'
import { ContentPages } from '../Content'
import styles from './index.module.css'

export default function Index() {

  const [hide, setHide] = useState(false)
  const handleToggleAside = () => {
    setHide(!hide)
    console.log("triggered")
  }

  return (
    <div className={`${styles.wrapperFullPage} d-flex`}>
      <div className={`${hide ? styles.hide : styles.show} ${styles.containerAside}`}>
        <AsideList 
          handleToggleAside={handleToggleAside} 
        />
      </div>
      <div className={styles.containerContent}>
        <ContentPages />
      </div>
    </div>
  )
}
