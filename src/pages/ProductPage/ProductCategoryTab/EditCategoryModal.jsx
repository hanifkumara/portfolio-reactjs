import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { getAllProductCategory } from '../../../config/redux/actions/product_category'

import {
  Modal,
  Button,
  Form,
  Spinner
} from 'react-bootstrap'
import axios from 'axios'

export default function EditCategoryPage({
  show,
  handleClose,
  data
}) {
  const API_URL = process.env.REACT_APP_API_URL
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const initialValues = {
    category_name: data.name
  }

  const validationSchema = Yup.object().shape({
    category_name: Yup.string()
      .required('Please input category name')
      .max(10, 'too large')
  })

  const formikCategory = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await axios.put(`${API_URL}/api/v1/product-category/${data.id}`, {
          name: values.category_name
        })
        dispatch(getAllProductCategory())
        setLoading(false)
        handleClose()
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  })

  const validationCategory = (fieldname) => {
    if (formikCategory.touched[fieldname] && formikCategory.errors[fieldname]) {
      return "is-invalid";
    }
    if (formikCategory.touched[fieldname] && !formikCategory.errors[fieldname]) {
      return "is-valid";
    }
    return '';
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formikCategory.handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Category Name' 
                name='category_name'
                className={validationCategory('category_name')}
                value={formikCategory.values.category_name}
                onChange={formikCategory.handleChange}
                onBlur={formikCategory.handleBlur}
              />
              {formikCategory.touched.category_name &&
              formikCategory.errors.category_name ? (
                <div className="text-danger">
                  {formikCategory.errors.category_name}
                </div>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              {loading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : null }
              Add Category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}
