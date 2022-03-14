import React, { useState } from 'react'
import {
  Form,
  Button,
  Spinner
} from 'react-bootstrap'
import styles from './RegisterPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios'
import { toast } from 'react-toastify'
import ModalResendVerificationLink from '../ModalResendVerificationLink'

toast.configure()

export default function RegisterPage() {
  const navigate = useNavigate()

  const [modalResendVerificationLink, setModalResendVerificationLink] = useState(false)
  const [accountBusiness, setAccountBusines] = useState({
    email: 'hanifkumara00@gmail.com', 
    businessId: 0
  }) 
  const [loading, setLoading] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  
  const openModalResendVerificationLink = () => setModalResendVerificationLink(true)
  const closeModalResendVerificationLink = () => setModalResendVerificationLink(false)

  const API_URL = process.env.REACT_APP_API_URL;

  const initialValuesRegister = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  }

  const validationSchemaRegister = Yup.object().shape({
    email: Yup.string()
      .min(3, "Minimal characters 3")
      .max(15, "Can't be more than 15 characters")
      .required('Please Input Business Name'),
    email: Yup.string()
      .email('Invalid Format Email')
      .required('Please Input Email'),
    phoneNumber: Yup.string()
      .min(3, "Minimal characters 3")
      .max(15, "Can't be more than 15 characters")
      .required('Please Input Phone Number'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!#%*?&]{8,20}$/,
        'Password at Least Must Have One Uppercase, One Numeric and 8 Characters Long'
      )
      .required('Please Input Password'),
    confirmPassword: Yup.string()
      .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
      })
      .required('Please Input Confirmation Password'),
  })

  const Toast = (status, message, autoClose= 5000) => {
    if(status === 'success') {
      return toast.success(message, {
        position: "top-right",
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      return toast.error(message, {
        position: "top-right",
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleSendVerificationLink = async (to, businessId) => {
    try {
      console.log({email: to, businessId})
      setLoadingModal(true)
      const {data} = await axios.post(`${API_URL}/api/v1/send-email`, {to, businessId})
      Toast('success', `Account verification link has been successfully sent to your email ${to}`, 10000)
      setLoadingModal(false)
    } catch (error) {
      setLoading(false)
      setLoadingModal(false)
      Toast('success', `Failed to send the verification link to your email ${to}, please try again`)
      console.log(error)
    }
  }

  const formikRegister = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesRegister,
    validationSchema: validationSchemaRegister,
    onSubmit: async (values, {resetForm}) => {
      try {
        setLoading(true)
        const { data } = await axios.post(`${API_URL}/api/v1/auth/register-business-account`, {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password
        })
        Toast('success', 'Your Business Account has been created successfully', 4500)

        // Fungsi untuk mengirim link verification
        // openModalResendVerificationLink()
        // await handleSendVerificationLink(data.data.email, data.data.businessId)

        setAccountBusines({
          businessId: data.data.businessId,
          email: data.data.email
        })
        setLoading(false)
        navigate('/auth/login')
      } catch (error) {
        Toast('error', `Failed registration Business Account ${error.response.data.err.message}, please try again`)
        setLoading(false)
        console.log("Error Message",error.response.data.err.message)
      }
    }
  })

  const validationRegister = (fieldname) => {
    if (formikRegister.touched[fieldname] && formikRegister.errors[fieldname]) {
      return "is-invalid";
    }
    if (formikRegister.touched[fieldname] && !formikRegister.errors[fieldname]) {
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
          <div className='auth-desc text-muted'>Register and get free trial, no pre payment and credit card needed</div>
        </div>
        <div className={styles.wrapperForm}>
          <Form onSubmit={formikRegister.handleSubmit}>
            
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Business Name</Form.Label>
              <Form.Control 
                name="name"
                type="name" 
                placeholder="Enter Business Name" 
                className={validationRegister("name")}
                // {...formikRegister.getFieldProps("email")}
                value={formikRegister.values.name}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                autoComplete='new-password'
              />
              {formikRegister.touched.name &&
              formikRegister.errors.name ? (
                <div className="text-danger">
                  {formikRegister.errors.name}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                name="email"
                type="email" 
                placeholder="Enter Email" 
                className={validationRegister("email")}
                // {...formikRegister.getFieldProps("email")}
                value={formikRegister.values.email}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                autoComplete='new-password'
              />
              {formikRegister.touched.email &&
              formikRegister.errors.email ? (
                <div className="text-danger">
                  {formikRegister.errors.email}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                name="phoneNumber"
                type="number" 
                placeholder="Phone Number" 
                className={validationRegister("phoneNumber")}
                value={formikRegister.values.phoneNumber}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                autoComplete='new-password'
              />
              {formikRegister.touched.phoneNumber &&
              formikRegister.errors.phoneNumber ? (
                <div className="text-danger">
                  {formikRegister.errors.phoneNumber}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                name="password"
                type="password" 
                placeholder="Password" 
                className={validationRegister("password")}
                value={formikRegister.values.password}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                autoComplete='new-password'
              />
              {formikRegister.touched.password &&
              formikRegister.errors.password ? (
                <div className="text-danger">
                  {formikRegister.errors.password}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                name="confirmPassword"
                type="password" 
                placeholder="Confirm Password" 
                className={validationRegister("confirmPassword")}
                value={formikRegister.values.confirmPassword}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                autoComplete='new-password'
              />
              {formikRegister.touched.confirmPassword &&
              formikRegister.errors.confirmPassword ? (
                <div className="text-danger">
                  {formikRegister.errors.confirmPassword}
                </div>
              ) : null}
            </Form.Group>

            {/* <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

            <div className="d-flex justify-content-between mb-2">
              <Button variant="primary" type="submit" disabled={loading}>
                Submit
                {loading ? (
                  <Spinner className="ms-2" animation="border" role="status" size="sm" />
                ) : null}
              </Button>
              <Link to="/auth/login">
                <div className={`${styles.button} text-primary`}>Already Have Account? Login</div>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}
