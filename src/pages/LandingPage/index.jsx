import React from 'react'
import styles from './index.module.css'
import { Header } from '../../components'
import SearchGoogleImage from '../../assets/images/screencapture-google-search-2022-01-03-22_26_10.png'

export default function index() {
  return (
    <div>
      <Header />
      <div className={styles.wrapperContent}>
        <div className={styles.card}>
          <div className={styles.browser}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
          </div>
          <img src={SearchGoogleImage} alt="" className={styles.image} />
        </div>
      </div>
    </div>
  )
}
