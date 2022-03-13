import { borderRadius, flexbox, height } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './ContentPages.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBusiness } from '../../config/redux/actions/business'

export default function ContentPages() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { business } = useSelector(state => state.business)

  const [fullName, setFullname] = useState('')
  const [prefix, setPrefix] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  const handlePrefixName = (fullName) => {
    if(fullName) {
      setPrefix(fullName.charAt(0))
      setFullname(fullName)
    } else {
      setPrefix('N')
      setFullname('No Set')
    }
  }

  const handleSetDropdown = () => setShowDropdown(!showDropdown)

  const handleLogout = () => {
    localStorage.clear()
    navigate('/auth/login')
  }

  useEffect(() => {
    handlePrefixName(business.name)
  }, [business] )

  useEffect(() => {
    handlePrefixName()
    dispatch(getBusiness())
  }, [])

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapperHeaderContent} d-flex justify-content-end`}>
        <div className={`d-flex align-items-center ${styles.wrapperFullname}`} onClick={handleSetDropdown}>
          <div className="font-14 font-weight-600 me-2"><span className='text-muted'>Hi, </span>{fullName}</div>
          <div className={styles.wrapperPrefix}>
            {prefix}
          </div>
          {showDropdown ? (
            <div className={styles.wrapperDropdown}>
              <div style={{ 
                backgroundImage: `url(${process.env.PUBLIC_URL + '/pngtree-technology-data-line-dotted-line-image_19159.jpg'})`,
                backgroundRepeat: 'no-repeat',
                width:'100%', 
                height:'65%',
                borderRadius: '10px',
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px'
              }}>
                <span className={styles.prefix}>{prefix}</span> <span className={styles.fullname}>{fullName}</span>
              </div>
              <div className={styles.dropdownBottom}>
                <div className="btn btn-outline-primary" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            </div>
          ): null }
        </div>
      </div>
      <div className={styles.wrapperOutlet}>
        <Outlet />
      </div>
    </div>
  )
}
