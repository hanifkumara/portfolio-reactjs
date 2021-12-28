import React from 'react'
import {
  Form,
  Button
} from 'react-bootstrap'
import styles from './RegisterPage.module.css'
import { Link } from 'react-router-dom'


export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className="d-flex flex-column align-items-center">
        <div className='auth-title'>Login Account</div>
        <div className='auth-desc text-muted'>Register and get free trial, no pre payment and credit card needed</div>
      </div>
      <div className={styles.wrapperForm}>
        <Form>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Phone Number" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          {/* <Form.Group className="mb-2" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          <div className="d-flex justify-content-between mb-2">
            <div className={`${styles.button } text-muted`}>Forgot Password?</div>
            <Link to="/auth/login">
              <div className={`${styles.button} text-primary`}>Already Have Account? Login</div>
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
