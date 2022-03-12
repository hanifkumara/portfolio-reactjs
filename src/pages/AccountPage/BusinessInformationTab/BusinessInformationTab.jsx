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

import { useFormik } from 'formik'
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { getBusiness } from '../../../config/redux/actions/business'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

export default function BusinessInformationTab() {

  const API_URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()

  const [eventEdit, setEventEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEventEdit = (event) => setEventEdit(event)

  const { business } = useSelector(state => state.business)
  
  const initialValues = {
    name: business.name,
    address: business.address ? business.address : '-',
    phoneNumber: business.phoneNumber ? business.phoneNumber : '-',
    nameOnKtp: business.nameOnKtp ? business.nameOnKtp : '-',
    noKtp: business.noKtp ? business.noKtp : '-'
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
    name: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(25, 'Maksimum 25 characters')
      .required('Business name cannot be null'),
    address: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(190, 'Maksimum 190 characters'),
    phoneNumber: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(14, 'Maksimum 14 characters'),
    nameOnKtp: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(25, 'Maksimum 25 characters'),
    noKtp: Yup.string()
      .max(16, 'Maksimum 16 characters'),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        setLoading(true)
        console.log("values", values)
        await axios.put(`${API_URL}/api/v1/business/update-business`, {
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
            <h4>Business Information</h4>
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
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control 
                      type='text' 
                      placeholder='Please input Business Name'
                      className={validationAccount('name')}
                      name='name'
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name &&
                    formik.errors.name ? (
                      <div className="text-danger">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>Business Phone Number</Form.Label>
                    <Form.Control 
                      type='number' 
                      placeholder='Please input Business Phone Number'
                      className={validationAccount('phoneNumber')}
                      name='phoneNumber'
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phoneNumber &&
                    formik.errors.phoneNumber ? (
                      <div className="text-danger">
                        {formik.errors.phoneNumber}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>No Ktp</Form.Label>
                    <Form.Control 
                      type='number' 
                      placeholder='Please input No Ktp'
                      className={validationAccount('noKtp')}
                      name='noKtp'
                      value={formik.values.noKtp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.noKtp &&
                    formik.errors.noKtp ? (
                      <div className="text-danger">
                        {formik.errors.noKtp}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>Name On KTP</Form.Label>
                    <Form.Control 
                      type='text' 
                      placeholder='Please input Name On KTP'
                      className={validationAccount('nameOnKtp')}
                      name='nameOnKtp'
                      value={formik.values.nameOnKtp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.nameOnKtp &&
                    formik.errors.nameOnKtp ? (
                      <div className="text-danger">
                        {formik.errors.nameOnKtp}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      type='text' 
                      placeholder='Please input Address'
                      className={validationAccount('address')}
                      name='address'
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.address &&
                    formik.errors.address ? (
                      <div className="text-danger">
                        {formik.errors.address}
                      </div>
                    ) : null}
                  </Form.Group>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="row mb-3">
                <div className="col-md-3">Business Name</div>
                <div className="col-md-9">: {business.name}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">Address</div>
                <div className="col-md-9">: {business.address || '-'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">Business Phone Number</div>
                <div className="col-md-9">: {business.phoneNumber || '-'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">Name On KTP</div>
                <div className="col-md-9">: {business.nameOnKtp || '-'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">No Ktp</div>
                <div className="col-md-9">: {business.noKtp || '-'}</div>
              </div>
            </div>
          )}
        </Form>
      </Paper>
    </div>
  )
}
