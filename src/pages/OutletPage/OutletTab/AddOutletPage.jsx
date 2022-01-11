import React, { useState } from 'react'
import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Form
} from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import styles from '../OutletPage.module.css'

export default function AddOutletPage() {
  const [photoPreview, setPhotoPreview] = useState('')

  const selectStatus = [
    {
      key: 'active',
      label: 'Active'
    },
    {
      key: 'inactive',
      label: 'Inactive'
    }
  ]

  const handlePreviewPhoto = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2){
        setPhotoPreview(reader.result);
      }
    }
    reader.readAsDataURL(file[0])
    console.log("file[0]", file[0])
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/jpeg, image/png',
    maxSize: 3 * 1000 * 1000,
    onDrop: (file) => {
      handlePreviewPhoto(file)
    }
  })

  return (
    <div>
      <Paper elevation={2} className='px-3 py-2'>
        <div className="d-flex justify-content-between">
          <h4>Add Outlet</h4>
          <div className='d-flex'>
            <Link to="/main/outlet">
              <div className="btn btn-outline-secondary">
                Cancel
              </div>
            </Link>
            <div className="btn btn-outline-primary ms-2">
              Save
            </div>
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
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Phone Number'
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Address'
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              {selectStatus.map((value, index) => 
                <Form.Check 
                  key={index}
                  type='radio'
                  name='status'
                  label={value.label}
                  checked={true}
                />
              )}
            </Form.Group>
          </Col>
          <Col>
            <div className={styles.wrapperOutletImage}>
              <Form.Label>Outlet Image</Form.Label>
              <div {...getRootProps()} className='dropzone'>
                {!photoPreview ? (
                  <>
                    <input {...getInputProps()} />
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
            </div>
          </Col>
        </Row>
      </Paper>
    </div>
  )
}
