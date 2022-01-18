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

export default function BusinessInformationTab() {

  const [eventEdit, setEventEdit] = useState(false)

  const handleEventEdit = (event) => setEventEdit(event)

  return (
    <div>
      <Paper elevation={0} className='px-3 py-2'>
        <div className="d-flex justify-content-between my-3">
          <h4>Business Information</h4>
          <div>
            <div className="btn btn-outline-primary" onClick={() => handleEventEdit(!eventEdit)}>
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
                  <Form.Label>Province</Form.Label>
                  <Form.Control type='text' placeholder='Please input Province'/>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='text' placeholder='Please input City'/>
                </Form.Group>
              </div>
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type='text' placeholder='Please input Location'/>
                  </Form.Group>
                </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type='text' placeholder='Please input Address'/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>Business Phone Number</Form.Label>
                  <Form.Control type='text' placeholder='Please input Business Phone Number'/>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>Name On KTP</Form.Label>
                  <Form.Control type='text' placeholder='Please input Name On KTP'/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>No Ktp</Form.Label>
                  <Form.Control type='text' placeholder='Please input No Ktp'/>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>No Npwp</Form.Label>
                  <Form.Control type='text' placeholder='Please input No Npwp'/>
                </Form.Group>
              </div>
                <div className="col-md-6">
                  <Form.Group className='mb-3'>
                    <Form.Label>Business Type</Form.Label>
                    <Form.Control type='text' placeholder='Please input Business Type'/>
                  </Form.Group>
                </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className='mb-3'>
                  <Form.Label>Currency</Form.Label>
                  <Form.Control type='text' placeholder='Please input Currency'/>
                </Form.Group>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="row mb-3">
              <div className="col-md-4">Business Name</div>
              <div className="col-md-8">: Kumara Store</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">Province</div>
              <div className="col-md-8">: Jawa Tengah</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">City</div>
              <div className="col-md-8">: Solo</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">Location</div>
              <div className="col-md-8">: Sukoharjo</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">Address</div>
              <div className="col-md-8">: Jalan Bengawan Solo No. 22 Carikan Sukoharjo Solo Solo</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">Business Phone Number</div>
              <div className="col-md-8">: 089653478467</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">Name On KTP</div>
              <div className="col-md-8">: Hanif Kumara</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">No Ktp</div>
              <div className="col-md-8">: 1234567890123456</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">No Npwp</div>
              <div className="col-md-8">: 1234567890123456</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">Business Type</div>
              <div className="col-md-8">: Restaurant</div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">Currency</div>
              <div className="col-md-8">: Rupiah Indonesia</div>
            </div>
          </div>
        )}
      </Paper>
    </div>
  )
}
