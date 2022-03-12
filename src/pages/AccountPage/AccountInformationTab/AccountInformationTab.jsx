import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material' 
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Form,
  InputGroup,
  Spinner
} from 'react-bootstrap'
import {
  Search
} from '@mui/icons-material'
import styles from '../AccountPage.module.css'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'

import { useFormik } from 'formik'
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { getBusiness } from '../../../config/redux/actions/business'

export default function AccountInformationTab() {
  const API_URL = process.env.REACT_APP_API_URL

  const dispatch = useDispatch()

  const [eventEdit, setEventEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEventEdit = (event) => setEventEdit(event)

  const { business } = useSelector(state => state.business)
  
  const initialValues = {
    email: business ? business.BusinessAccount.email : '',
    password: ''
  }

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

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid Format Email')
      .required('Please Input Business Name'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!#%*?&]{8,20}$/,
        'Password at Least Must Have One Uppercase, One Numeric and 8 Characters Long'
      ),
    confirmPassword: Yup.string()
      .when('password', {
        is: value => value && value.length > 0,
        then: Yup.string()
        .required("Please Input Confirmation Password")
        .test('passwords-match', 'Passwords must match', function(value){
          return this.parent.password === value
        }),
        otherwise: Yup.string()
      })
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        setLoading(true)
        console.log("values", values)
        await axios.patch(`${API_URL}/api/v1/business/update-business-account`, {
          ...values
        })
        Toast('success', 'Successfully update Outlets', 3500)
        dispatch(getBusiness())
        setEventEdit(false)
        resetForm()
        setLoading(false)
      } catch (error) {
        Toast('error', error.response.data.err.message, 3000)
        setLoading(false)
        console.log(error.response.data.err.message)
      }
    }
  })

  const validationAccount = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }
    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }
    return '';
  };

  return (
    <div>
      <Paper elevation={0} className='px-3 py-2'>
        <Form onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-between my-3">
            <h4>Account Information</h4>
            <div>
              <div className="btn btn-outline-primary" onClick={() => handleEventEdit(!eventEdit)}>
                {eventEdit ? 'Cancel' : 'Update'}
              </div>
              {eventEdit ? (
                <button type='submit' className="btn btn-outline-primary ms-2" disabled={loading}>
                  Save
                  {loading ? (
                    <Spinner className="ms-2"  animation="border" role="status" size="sm"/>
                  ): null }
                </button>
              ) : null}
            </div>
          </div>
          <hr />
          {eventEdit ? (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type='text' 
                      placeholder='Please input Email'
                      className={validationAccount('email')}
                      name='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email &&
                    formik.errors.email ? (
                      <div className="text-danger">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                      type='password' 
                      autocomplete='new-password'
                      placeholder='Please input Password'
                      className={validationAccount('password')}
                      name='password'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password &&
                    formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                      type='password' 
                      autocomplete='new-password'
                      placeholder='Please input Confirm Password'
                      className={validationAccount('confirmPassword')}
                      name='confirmPassword'
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div className="text-danger">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>
              </div>
            </div>
          ) : (
          <div>
            <div className="row mb-3">
              <div className="col-md-4">
                Business Name
              </div>
              <div className="col-md-8">
                : {business.name}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                Email
              </div>
              <div className="col-md-8">
                : {business.BusinessAccount.email}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                Phone Number
              </div>
              <div className="col-md-8">
                : {business.phoneNumber ? business.phoneNumber : '-'}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                Registration Date
              </div>
              <div className="col-md-8">
                :  {business.createdAt}
              </div>
            </div>
          </div>
          )}
        </Form>
      </Paper>
    </div>
  )
}
