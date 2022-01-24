import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
          <div className={response.message === 'success' ? 'text-success' : 'text-danger'}>{response.message}</div>
        </div>
      ) : null}
    </div>
  )
}
