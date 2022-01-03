import React from 'react'
import { Paper } from '@mui/material'
import { Search } from '@mui/icons-material' 
import { Link } from 'react-router-dom'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'

export default function ProductCategoryTab() {
  return (
    <div>
      <Paper elevation={2} className='px-3 py-2'>
        <div className="d-flex justify-content-between my-3">
          <h4>List Category</h4>
          <Link to="add">
            <div className="btn btn-primary">
              Add Category
            </div>
          </Link>
        </div>
        <hr />
        <Row>
          <Col>
            <InputGroup>
              <InputGroup.Text style={{ background: "transparent" }}>
                <Search />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search . . ."
              />
            </InputGroup>
          </Col>
        </Row>
        <hr />
      </Paper>
    </div>
  )
}
