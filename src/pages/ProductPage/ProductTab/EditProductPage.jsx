import React, {useEffect, useState} from 'react'
import { Paper } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Form, Row, Col, Spinner } from 'react-bootstrap'
import Select from 'react-select'
import { useDropzone } from 'react-dropzone'
import styles from '../ProductPage.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

import { useSelector, useDispatch } from 'react-redux'
import { getAllProduct } from '../../../config/redux/actions/product'

export default function EditProductPage() {
  const API_URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  const location = useLocation()

  const {
    outletId,
    name,
    productCategoryId,
    price,
    description,
    status
  } = location.state

  console.log('location.state', location.state)

  const { allOutlet } = useSelector(state => state.outlet)
  const { allProductCategory } = useSelector(state => state.productCategory)

  const [loading, setLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('')
  const [photo, setPhoto] = useState('')

  const [optionOutlets, setOptionOutlets] = useState([])
  const [defaultValues, setDefaultValues] = useState([])
  const [optionCategories, setOptionCategories] = useState([])

  const handlePreviewPhoto = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2){
        console.log("reader.result", reader.result)
        setPhotoPreview(reader.result);
      }
    }
    reader.readAsDataURL(file[0])
    console.log("file[0]", file[0])
    setPhoto(file[0])
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/jpeg,image/png',
    maxSize: 3 * 1000 * 1000,
    onDrop(file){
      handlePreviewPhoto(file)
    }
  })

  const handleStatus = (e) => {
    const {value} = e.target
    formikProduct.setFieldValue('status', value)
  }

  const initialValues = {
    outletId,
    name,
    productCategoryId,
    price,
    description,
    status: status ? 'active' : 'inactive'
  }

  const validationSchema = Yup.object().shape({
    category_name: Yup.string()
      .required('Please input category name')
      .max(10, 'too large')
  })

  const formikProduct = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, {resetForm}) => {
      setLoading(true)
      try {
        console.log('data sebelum dikirim', values)
        const formData = new FormData()
        formData.append("outletId", JSON.stringify(values.outletId));
        formData.append("name", values.name);
        formData.append("productCategoryId", values.productCategoryId);
        formData.append("price", values.price);
        formData.append("image", photo);
        formData.append("description", values.description);
        if(values.status === 'active') {
          formData.append("status", 1);
        } else {
          formData.append("status", 0);
        }
        await axios.post(`${API_URL}/api/v1/product`, formData)
        dispatch(getAllProduct())
        setLoading(false)
        resetForm()
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  })

  const validationProduct = (fieldname) => {
    if (formikProduct.touched[fieldname] && formikProduct.errors[fieldname]) {
      return "is-invalid";
    }
    if (formikProduct.touched[fieldname] && !formikProduct.errors[fieldname]) {
      return "is-valid";
    }
    return '';
  };

  useEffect(() => {
    const handleOptionOutlet = allOutlet.map(outlet => {
      return { value: outlet.id, label: outlet.name }
    })
    const handleDefaultValues = handleOptionOutlet.find(value => {
      return value.value === formikProduct.getFieldProps('outletId').value
    })
    console.log('handleDefaultValues', handleDefaultValues)
    setOptionOutlets(handleOptionOutlet)
    setDefaultValues(handleDefaultValues)
  }, [allOutlet])

  useEffect(() => {
    console.log('allProductCategory', allProductCategory)
    const handleOptionProductCategory = allProductCategory.map(productCategory => {
      return { value: productCategory.id, label: productCategory.name }
    })
    setOptionCategories(handleOptionProductCategory)
  }, [allProductCategory])

  const handleSelectOutlet = (value) => {
    const getId = value.map(item => {
      return item.value
    })
    console.log('getId', getId)
    formikProduct.setFieldValue('outletId', getId)
  }

  const handleSelectCategory = (value) => {
    formikProduct.setFieldValue('productCategoryId', value.value)
  }

  return (
    <div>
      <Paper elevation={0} className='px-3 py-2'>
        <Form onSubmit={formikProduct.handleSubmit}>
          <div className="d-flex justify-content-between">
            <h4>Add Product</h4>
            <div className='d-flex'>
              <Link to="/main/product">
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

          <Row className='mb-2'>
            <Col>
              <Form.Group className="mb-2">
              <Form.Label>Outlet</Form.Label>
              <Select 
                options={optionOutlets}
                defaultValue={defaultValues}
                name="outlet"
                className="basic-multi-select"
                classNamePrefix="Choose Outlet"
                onChange={(value) => handleSelectOutlet(value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Product Name"
                className={validationProduct('name')}
                name='name'
                value={formikProduct.values.name}
                onChange={formikProduct.handleChange}
                onBlur={formikProduct.handleBlur} 
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Select
                options={optionCategories}
                classNamePrefix="Select Category"
                name="category"
                className={validationProduct('category')}
                onChange={(value) => handleSelectCategory(value)}
              />
            </Form.Group>
            </Col>
            <Col>
              <Form.Label>
                Product Image
              </Form.Label>
              <div {...getRootProps()} className='dropzone'>
                {!photoPreview ? (
                  <>
                    <input {...getInputProps()} />
                    { isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                  </>
                ) : (
                  <div
                    style={{
                      margin: "auto",
                      width: "120px",
                      height: "120px",
                      overflow: "hidden",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${photoPreview})`
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as='textarea'
              rows={3}
              type='text' 
              placeholder='Description'
              name='description'
              className={validationProduct('description')}
              value={formikProduct.values.description}
              onChange={formikProduct.handleChange}
              onBlur={formikProduct.handleBlur}
            />
            {formikProduct.touched.description &&
            formikProduct.errors.description ? (
              <div className="text-danger">
                {formikProduct.errors.description}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Price" 
              name="price"
              className={validationProduct('price')}
              value={formikProduct.values.price}
              onChange={formikProduct.handleChange}
              onBlur={formikProduct.handleBlur} 
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <div onChange={(e) => handleStatus(e)}>
              <input type="radio" value="active" name="status" checked={formikProduct.values.status === 'active' ? true : false}/> Active
              <input className='ms-2' type="radio" value="inactive" checked={formikProduct.values.status === 'inactive' ? true : false} name="status"/> Inactive
            </div>
          </Form.Group>
        </Form>
      </Paper>
    </div>
  )
}
