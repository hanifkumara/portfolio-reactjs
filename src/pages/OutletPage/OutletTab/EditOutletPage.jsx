import React, { useState } from 'react'
import { fabClasses, Paper } from '@mui/material'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import {
  Row,
  Col,
  Form,
  Spinner
} from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import styles from '../OutletPage.module.css'
import axios from 'axios'
import { getAllOutlet } from '../../../config/redux/actions/outlet'

import { useFormik } from 'formik'
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

export default function EditOutletPage() {
  const environment = process.env.REACT_APP_ENVIRONMENT

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const location = useLocation()

  const {
    businessId,
    name,
    phoneNumber,
    address,
    status,
    image
  } = location.state

  console.log("location", location);

  const API_URL = process.env.REACT_APP_API_URL;

  const [photoPreview, setPhotoPreview] = useState(image ? `${API_URL}/upload/${image}` : '')
  const [photo, setPhoto] = useState(image ? `${API_URL}/upload/${image}` : '')
  const [loading, setLoading] = useState(false)

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

  const initialValuesOutlet = {
    businessId,
    name,
    phoneNumber,
    address,
    status: status ? 'active' : 'inactive',
    image
  }

  const validationSchemaOutlet = Yup.object().shape({
    name: Yup.string()
      .required('Please Input Outlet Name'),
    phoneNumber: Yup.string()
      .min(3, "Minimal characters 3")
      .max(30, "Can't be more than 30 characters")
      .required('Please Input Phone Number'),
    address: Yup.string()
      .min(3, "Minimal characters 3")
      .max(150, "Can't be more than 150 characters")
      .required('Please Input Address'),
  })

  const formikAddOutlet = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesOutlet,
    validationSchema: validationSchemaOutlet,
    onSubmit: async (values, {resetForm}) => {
      try {
        setLoading(true)
        console.log("values", values)
        const formData = new FormData()
        formData.append("name", values.name);
        formData.append("address", values.address);
        formData.append("phoneNumber", values.phoneNumber);
        if(photo.name) {
          formData.append("image", photo);
        }
        if(values.status === 'active') {
          formData.append("status", 1);
        } else {
          formData.append("status", 0);
        }
        await axios.put(`${API_URL}/api/v1/outlet/${id}`, formData)
        Toast('success', 'Successfully update Outlets', 3500)
        dispatch(getAllOutlet())
        setTimeout(() => {
          resetForm()
          setLoading(false)
          navigate('/main/outlet')
        }, 700);
      } catch (error) {
        Toast('error', error.response.data.err.message, 3000)
        setLoading(false)
        console.log(error.response.data.err.message)
      }
    }
  })

  const validationLogin = (fieldname) => {
    if (formikAddOutlet.touched[fieldname] && formikAddOutlet.errors[fieldname]) {
      return "is-invalid";
    }
    if (formikAddOutlet.touched[fieldname] && !formikAddOutlet.errors[fieldname]) {
      return "is-valid";
    }
    return '';
  };

  const handlePreviewPhoto = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2){
        setPhotoPreview(reader.result);
      }
    }
    reader.readAsDataURL(file[0])
    console.log("file[0]", file[0])
    setPhoto(file[0])
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/jpeg, image/png',
    maxSize: 3 * 1000 * 1000,
    onDrop: (file) => {
      handlePreviewPhoto(file)
    }
  })

  const handleStatus = (e) => {
    const {value} = e.target
    console.log("value", value)
    formikAddOutlet.setFieldValue('status', value)
  }

  return (
    <div>
      <Paper elevation={0} className='px-3 py-2'>
        <Form onSubmit={formikAddOutlet.handleSubmit}>
          <div className="d-flex justify-content-between">
            <h4>Add Outlet</h4>
            <div className='d-flex'>
              <Link to="/main/outlet">
                <div className="btn btn-outline-secondary">
                  Cancel
                </div>
              </Link>
              <button type='submit' className="btn btn-outline-primary ms-2" disabled={loading}>
                Save
                {loading ? (
                  <Spinner className="ms-2"  animation="border" role="status" size="sm"/>
                ): null }
              </button>
            </div>
          </div>
          <hr />
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Outlet Name</Form.Label>
                <Form.Control 
                  type='text' 
                  placeholder='Outlet Name'
                  className={validationLogin('name')}
                  name='name'
                  value={formikAddOutlet.values.name}
                  onChange={formikAddOutlet.handleChange}
                  onBlur={formikAddOutlet.handleBlur}
                />
                {formikAddOutlet.touched.name &&
                formikAddOutlet.errors.name ? (
                  <div className="text-danger">
                    {formikAddOutlet.errors.name}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type='text' 
                  placeholder='Phone Number'
                  name='phoneNumber'
                  className={validationLogin('phoneNumber')}
                  value={formikAddOutlet.values.phoneNumber}
                  onChange={formikAddOutlet.handleChange}
                  onBlur={formikAddOutlet.handleBlur}
                />
                {formikAddOutlet.touched.phoneNumber &&
                formikAddOutlet.errors.phoneNumber ? (
                  <div className="text-danger">
                    {formikAddOutlet.errors.phoneNumber}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                  as='textarea'
                  rows={3}
                  type='text' 
                  placeholder='Address'
                  name='address'
                  className={validationLogin('address')}
                  value={formikAddOutlet.values.address}
                  onChange={formikAddOutlet.handleChange}
                  onBlur={formikAddOutlet.handleBlur}
                />
                {formikAddOutlet.touched.address &&
                formikAddOutlet.errors.address ? (
                  <div className="text-danger">
                    {formikAddOutlet.errors.address}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <div onChange={(e) => handleStatus(e)}>
                  <input type="radio" value="active" name="status" checked={formikAddOutlet.values.status === 'active' ? true : false}/> Active
                  <input className='ms-2' type="radio" value="inactive" checked={formikAddOutlet.values.status === 'inactive' ? true : false} name="status"/> Inactive
                </div>
              </Form.Group>
            </Col>
            {environment && environment === 'production' ? null : (
              <Col>
                <div className={styles.wrapperOutletImage}>
                  <Form.Label>Outlet Image</Form.Label>
                  <div {...getRootProps()} className='dropzone'>
                    <input {...getInputProps()} />
                    {!photoPreview ? (
                      <>
                        {
                          isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                      </>
                    ) : (
                      <div
                        style={{
                          margin: "auto",
                          width: "220px",
                          height: "220px",
                          overflow: "hidden",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundImage: `url(${photoPreview || photo})`
                        }}
                      />
                    )}
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Form>
      </Paper>
    </div>
  )
}
