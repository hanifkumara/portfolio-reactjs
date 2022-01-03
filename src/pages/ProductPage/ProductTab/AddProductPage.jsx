import React, {useState} from 'react'
import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { useDropzone } from 'react-dropzone'
import styles from '../ProductPage.module.css'

export default function AddProductPage() {

  const [photoPreview, setPhotoPreview] = useState('')

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
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/jpeg,image/png',
    maxSize: 3 * 1000 * 1000,
    onDrop(file){
      handlePreviewPhoto(file)
    }
  })

  const optionsOutlets = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const optionsCategories = [
    { value: 'makanan', label: 'Makanan' },
    { value: 'minuman', label: 'Minuman' },
    { value: 'alat', label: 'Alat' }
  ]

  return (
    <div>
      <Paper elevation={2} className='px-3 py-2'>
        <div className="d-flex justify-content-between">
          <h4>Add Product</h4>
          <div className='d-flex'>
            <Link to="/main/product">
              <div className="btn btn-secondary">
                Cancel
              </div>
            </Link>
            <div className="btn btn-primary ms-2">
              Save
            </div>
          </div>
        </div>
        <hr />

        <Row className='mb-2'>
          <Col>
            <Form.Group className="mb-2">
            <Form.Label>Outlet</Form.Label>
            <Select 
              isMulti
              options={optionsOutlets}
              name="outlet"
              className="basic-multi-select"
              classNamePrefix="Choose Outlet"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Product Name" />
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
          <Form.Label>Category</Form.Label>
          <Select
            options={optionsCategories}
            classNamePrefix="Select Category"
            name="category"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="Product Price" />
        </Form.Group>
      </Paper>
    </div>
  )
}
