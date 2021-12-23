import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ContentPages.module.css'

export default function ContentPages() {
  const [prefix, setPrefix] = useState("")
  const fullName = 'Hanif Kumara'
  const handlePrefixName = () => {
    setPrefix(fullName.charAt(0))
  }

  useEffect(() => {
    handlePrefixName()
  }, [])

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapperHeaderContent} d-flex justify-content-end`}>
        <div className={`d-flex align-items-center ${styles.wrapperFullname}`}>
          <div className="font-14 font-weight-600 me-2"><span className='text-muted'>Hi, </span>{fullName}</div>
          <div className={styles.wrapperPrefix}>
            {prefix}
          </div>
        </div>
      </div>
      <div className={styles.wrapperOutlet}>
        <Outlet />
      </div>
    </div>
  )
}
