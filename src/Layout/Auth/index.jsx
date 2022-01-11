import React, { useEffect } from 'react'
import ImageAuth from '../../assets/images/scott-graham-5fNmWej4tAA-unsplash.jpg'
import styles from './index.module.css'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/auth/login')
  }, [navigate])

  return (
    <div>
      <div className={styles.wrapperSide}>
        <div className={styles.leftSide}>
          <div className={styles.wrapperImage}>
              <img src={ImageAuth} alt="Auth" />
          </div>
        </div>
        <div className={styles.rightSide}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
