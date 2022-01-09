import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import {
  Modal,
  Button,
  Form
} from 'react-bootstrap'

export default function AddOrderManagement({
  show,
  handleClose
}) {

  const initialValues = {
    category_name: ''
  }

  const validationSchema = Yup.object().shape({
    category_name: Yup.string()
      .required('Please input category name')
      .max(10, 'too large')
  })

  const formikCategory = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values)
    }
  })

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Order Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control type='text' placeholder='Category Name' />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
