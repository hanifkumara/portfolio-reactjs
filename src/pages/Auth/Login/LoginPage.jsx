import React, { useState } from 'react'
import {
  Form,
  Button,
  Spinner
} from 'react-bootstrap'
import styles from './LoginPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik  } from 'formik'
import * as Yup from "yup";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import ModalResendVerificationLink from '../ModalResendVerificationLink'

toast.configure()
export default function LoginPage() {
  const [modalResendVerificationLink, setModalResendVerificationLink] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [accountBusiness, setAccountBusiness] = useState({
    email: '',
    businessId: 0
  })

  const openModalResendVerificationLink = () => setModalResendVerificationLink(true)
  const closeModalResendVerificationLink = () => setModalResendVerificationLink(false)

  const navigate = useNavigate()
  const API_URL = process.env.REACT_APP_API_URL;

  const initialValuesLogin = {
    email: "",
    password: ""
  }

  const handleSendVerificationLink = async (to, businessId) => {
    try {
      setLoadingModal(true)
      const {data} = await axios.post(`${API_URL}/api/v1/send-email`, {to, businessId})
      // Toast('success', `Account verification link has been successfully sent to your email ${to}`, 10000)
      console.log("response send email", data.data)
      setLoadingModal(false)
    } catch (error) {
      setLoading(false)
      setLoadingModal(false)
      Toast('success', `Failed to send the verification link to your email ${to}, please try again`)
      console.log(error)
    }
  }

  const validationSchemaLogin = Yup.object().shape({
    email: Yup.string()
      .email('Invalid Format Email')
      .required('Please Input Email'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!#%*?&]{8,20}$/,
        'Password at Least Must Have One Uppercase, One Numeric and 8 Characters Long'
      )
      .required('Please Input Password')
  })

  const Toast = (status, message) => {
    if(status === 'success') {
      return toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      return toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const formikLogin = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesLogin,
    validationSchema: validationSchemaLogin,
    onSubmit: async (values, {resetForm}) => {
      try {
        setLoading(true)
        const { data } = await axios.post(`${API_URL}/api/v1/auth/login-business-account`, {
          email: values.email,
          password: values.password
        })
        console.log("response login", data.data)
        if(!data.data.isVerified){
          const businessId = data.data.businessId
          const email = data.data.email
          await handleSendVerificationLink(email, businessId)
          Toast('error', `Your account is not verified. Please check email ${email} for verify your account`)
          setAccountBusiness({
            businessId: businessId,
            email: email
          })
          openModalResendVerificationLink()
        } else {
          localStorage.setItem('token', data.data.token)
          navigate('/main/dashboard')
        }
        setLoading(false)
      } catch (error) {
        if(error.response.data.err.message === 'Password Wrong!!') {
          Toast('error', error.response.data.err.message)
        } else if (error.response.data.err.message.includes('Email not Found')) {
          Toast('error', error.response.data.err.message)
        }
        setLoading(false)
        console.log(error.response.data.err.message)
      }
    }
  })

  const validationLogin = (fieldname) => {
    if (formikLogin.touched[fieldname] && formikLogin.errors[fieldname]) {
      return "is-invalid";
    }
    if (formikLogin.touched[fieldname] && !formikLogin.errors[fieldname]) {
      return "is-valid";
    }
    return "";
  };

  return (
    <>
      <ModalResendVerificationLink 
        showModal={modalResendVerificationLink}
        handleCloseModal={closeModalResendVerificationLink}
        accountBusiness={accountBusiness}
        handleSendVerificationLink={handleSendVerificationLink}
        loadingModal={loadingModal}
      />
      <div className={styles.container}>
        <div className="d-flex flex-column align-items-center">
          <div className='auth-title'>Login Account</div>
          <div className='auth-desc text-muted'>Enter Your Email and Password</div>
        </div>
        <div className={styles.wrapperForm}>
          <Form onSubmit={formikLogin.handleSubmit}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                className={validationLogin("email")}
                placeholder="Enter email" 
                name="email"
                value={formikLogin.values.email}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                autoComplete='new-password'
              />
              {formikLogin.touched.email &&
              formikLogin.errors.email ? (
                <div className="text-danger">
                  {formikLogin.errors.email}
                </div>
              ) : null}
            </Form.Group>
  
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                className={validationLogin("password")}
                name="password"
                placeholder="Password" 
                value={formikLogin.values.password}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
              />
              {formikLogin.touched.password &&
              formikLogin.errors.password ? (
                <div className="text-danger">
                  {formikLogin.errors.password}
                </div>
              ) : null}
            </Form.Group>
  
            {/* <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
  
            <div className="d-flex justify-content-between mb-2">
              <div className={`${styles.button} ${styles.forgotPassword} text-muted`}>Forgot Password?</div>
              <Link to="/auth/register">
                <div className={`${styles.button} text-primary`}>Don't Have Account? Signup</div>
              </Link>
            </div>
  
            <Button variant="primary" type="submit" disabled={loading}>
              Submit
              {loading ? (
                <Spinner className="ms-2"  animation="border" role="status" size="sm"/>
              ): null }
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}
