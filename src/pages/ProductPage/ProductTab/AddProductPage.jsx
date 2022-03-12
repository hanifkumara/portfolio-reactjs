import React, {useEffect, useState} from 'react'
import { Paper } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Spinner, Button, InputGroup } from 'react-bootstrap'
import Select from 'react-select'
import { useDropzone } from 'react-dropzone'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'

import { useSelector, useDispatch } from 'react-redux'
import { getAllProduct } from '../../../config/redux/actions/product'

export default function AddProductPage() {
  const API_URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { allOutlet } = useSelector(state => state.outlet)
  const { allProductCategory } = useSelector(state => state.productCategory)

  const [loading, setLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('')
  const [photo, setPhoto] = useState('')

  const [startDate, setStartDate] = useState(new Date());
  const [optionOutlets, setOptionOutlets] = useState([])
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
    outletId: [],
    name: '',
    stock: '',
    productCategoryId: '',
    price: '',
    description: '',
    expiredDate: '',
    status: 'active'
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Please input product name')
      .min(3, 'Minimum 3 characters')
      .max(25, 'Maksimum 3 characters'),
    stock: Yup.number()
      .required('Please input product name')
      .min(0, 'Cannot input minus'),
    price: Yup.number()
      .required('Please input product price')
      .min(0, 'Cannot input minus'),
    description: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(190, 'Maksimum 190 characters')
  })

  const formikProduct = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, {resetForm}) => {
      setLoading(true)
      try {
        console.log('data sebelum dikirim', values)
        const formData = new FormData()
        formData.append("outletId", JSON.stringify(values.outletId));
        formData.append("name", values.name);
        formData.append("productCategoryId", values.productCategoryId);
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        formData.append("expiredDate", values.expiredDate);
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
        navigate('/main/product')
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
    setOptionOutlets(handleOptionOutlet)
  }, [allOutlet])

  useEffect(() => {
    const checkStatus = allProductCategory.filter(productCategory => {
      return productCategory.status
    })
    const handleOptionProductCategory = checkStatus.map(productCategory => {
      return { value: productCategory.id, label: productCategory.name }
    })
    console.log('handleOptionProductCategory', handleOptionProductCategory)
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
    console.log('handleSelectCategory', value)
    formikProduct.setFieldValue('productCategoryId', value.value)
  }

  const removeImage = () => {
    setPhoto('')
    setPhotoPreview('')
  }

  const handleDate = (expiredDate) => {
    setStartDate(expiredDate);
    formikProduct.setFieldValue("expiredDate", expiredDate);
  };

  const CustomInputDate = ({ value, onClick }) => {
    return (
      <Form.Control
        type="text"
        defaultValue={value}
        onClick={onClick}
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      />
    );
  };
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
              <button type='submit' className="btn btn-outline-primary ms-2" disabled={loading} >
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
                  isMulti
                  options={optionOutlets}
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
                {formikProduct.touched.name &&
                formikProduct.errors.name ? (
                  <div className="text-danger">
                    {formikProduct.errors.name}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Select
                  options={optionCategories}
                  classNamePrefix="Select Category"
                  name="productCategoryId"
                  onChange={(value) => handleSelectCategory(value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Stock</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Product Stock" 
                  name="stock"
                  className={validationProduct('stock')}
                  value={formikProduct.values.stock}
                  onChange={formikProduct.handleChange}
                  onBlur={formikProduct.handleBlur} 
                />
                {formikProduct.touched.stock &&
                formikProduct.errors.stock ? (
                  <div className="text-danger">
                    {formikProduct.errors.stock}
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
                {formikProduct.touched.price &&
                formikProduct.errors.price ? (
                  <div className="text-danger">
                    {formikProduct.errors.price}
                  </div>
                ) : null}
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>
                Product Image
              </Form.Label>
              <div {...getRootProps()} className='dropzone'>
                <input {...getInputProps()} />
                {!photoPreview ? (
                  <>
                    { isDragActive ?
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
                      backgroundImage: `url(${photoPreview})`
                    }}
                  />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <Button className='mt-2' variant='danger' onClick={removeImage}>Remove Image</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
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
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Expired Date:</Form.Label>
                <InputGroup>
                  <DatePicker
                    name="expiredDate"
                    selected={startDate}
                    onChange={handleDate}
                    customInput={<CustomInputDate />}
                    required
                  />
                  <InputGroup.Text>
                    <CalendarToday />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
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
