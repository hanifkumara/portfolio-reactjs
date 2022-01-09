import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material' 
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Form,
  InputGroup
} from 'react-bootstrap'
import {
  Search
} from '@mui/icons-material'
import styles from '../AccountPage.module.css'

export default function AccountInformationTab() {

  const [eventEdit, setEventEdit] = useState(false)

  const handleEventEdit = (event) => setEventEdit(event)

  return (
    <div>
      <Paper elevation={2} className='px-3 py-2'>
        <div className="d-flex justify-content-between my-3">
          <h4>Account Information</h4>
          <div>
            <div className="btn btn-primary" onClick={() => handleEventEdit(!eventEdit)}>
              {eventEdit ? 'Cancel' : 'Update'}
            </div>
            {eventEdit ? (
              <div className="btn btn-success ms-2">
                Save
              </div>
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
                  <Form.Control type='text' placeholder='Please input Business Name'/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='text' placeholder='Please input Email'/>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type='text' placeholder='Please input Phone Number'/>
                </Form.Group>
              </div>
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>Registration Date</Form.Label>
                    <Form.Control type='text' placeholder='Please input Registration Date'/>
                  </Form.Group>
                </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>Business ID</Form.Label>
                  <Form.Control type='text' placeholder='Please input Business ID'/>
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
              : Kumara Store
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              Email
            </div>
            <div className="col-md-8">
              : hanifkumara00@gmail.com
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              Phone Number
            </div>
            <div className="col-md-8">
              : 089653478467
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              Registration Date
            </div>
            <div className="col-md-8">
              :  Minggu, 09 Januari 2021 20:45
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              Business ID
            </div>
            <div className="col-md-8">
              : KS0901212045
            </div>
          </div>
        </div>
        )}
      </Paper>
    </div>
  )
}
