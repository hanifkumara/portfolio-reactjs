import React from 'react'
import styles from './ErrorPage.module.css'

export default function ErrorPage() {
  return (
    <div>
      <div className={styles.wrapper}>
        <h2 className='text-danger'>Woahhh!!! 404 Page not Found!!</h2>
      </div>
    </div>
  )
}
