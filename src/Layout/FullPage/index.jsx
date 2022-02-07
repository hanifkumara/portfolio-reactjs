import React, { useState, useEffect } from 'react'
import { AsideList } from '../Aside'
import { ContentPages } from '../Content'
import styles from './index.module.css'
import { useDispatch } from 'react-redux'
import { getAllOutlet } from '../../config/redux/actions/outlet'

export default function Index() {

  const [hide, setHide] = useState(false)
  const handleToggleAside = () => {
    setHide(!hide)
    console.log("triggered")
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOutlet())
  }, [])

  return (
    <div className={`${styles.wrapperFullPage} d-flex`}>
      <div className={`${hide ? styles.hide : styles.show} ${styles.containerAside}`}>
        <AsideList 
          handleToggleAside={handleToggleAside} 
          hide={hide}
        />
      </div>
      <div className={styles.containerContent}>
        <ContentPages />
      </div>
    </div>
  )
}
