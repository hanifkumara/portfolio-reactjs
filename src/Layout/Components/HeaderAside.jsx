import React, { useState }  from 'react'
import styles from './HeaderAside.module.css'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function HeaderAside({handleToggleAside}) {
  const [hideAside, setHideAside] = useState(false)

  const toggleAside = () => {
    setHideAside(!hideAside)
    handleToggleAside()
  }

  return (
    <div>
      <div className={`${styles.containerHeaderAside} d-flex justify-content-between`}>
        {hideAside ? (
          <KeyboardDoubleArrowRightIcon onClick={toggleAside}/>
        ) : (
          <>
            <div className='font-17 font-weight-700'>INVENTORY Management</div>
            <KeyboardDoubleArrowLeftIcon onClick={toggleAside}/>
          </>
        )}
        {/* <div onClick={toggleAside} className="btn bg-secondary">Panah kiri</div> */}
      </div>
    </div>
  )
}
