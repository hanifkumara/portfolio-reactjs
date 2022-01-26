import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TickImage from '../../assets/images/output-onlinepngtools.png'
import styles from './VerifyEmailPage.module.css'

export default function VerifyEmail() {
  const [response, setResponse] = useState({
    status: false,
    message: ''
  })
  const { token } = useParams()
  console.log("token", token)
  const handleVerifyEmail = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/verify-email`, {token})
      setResponse({
        status: true,
        message: 'success'
      })
    } catch (error) {
      setResponse({
        status: true,
        message: 'failed'
      })
      console.log(error)
    }
  }
  useEffect(() => {
    handleVerifyEmail()
  }, [])
  return (
    <div>
      {response.status ? (
        <div>
          <div>
            <div className={styles.container}>
              <div className={styles.wrapperContent}>
                <h2>Verify Account Successfuly</h2>
                <div className={styles.wrapperImage}>
                  <img src={TickImage} alt="Tick" />                
                </div>
                <Link to="/auth/login">
                  <div className='btn btn-outline-primary'>Login Now</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
