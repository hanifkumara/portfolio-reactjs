import React from 'react'
import { Paper } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'

export default function ProductTab() {
  return (
    <div>
      <Paper elevation={2} className='px-3 py-2'>
        <div className="d-flex justify-content-between">
          <h4>Product</h4>
          <div className="btn btn-primary">
            Add Product
          </div>
        </div>
        
        <Row>
          <Col>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text style={{ background: "transparent" }}>
                  <Search />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Search . . ."
              />
            </InputGroup>
          </Col>
        </Row>
      </Paper>
    </div>
  )
}
