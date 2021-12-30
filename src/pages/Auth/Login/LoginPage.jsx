import React from 'react'
import {
  Form,
  Button
} from 'react-bootstrap'
import styles from './LoginPage.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup";


export default function LoginPage() {

  const initialValuesLogin = {
    email: "",
    password: ""
  }

  const validationSchemaLogin = Yup.object({
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

  const formikLogin = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesLogin,
    validationSchema: validationSchemaLogin,
    onSubmit: (values, {resetForm}) => {
      console.log("values", values)
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
