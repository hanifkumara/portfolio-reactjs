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
import DataTable from 'react-data-table-component'

export default function OutletTab() {
  const [dataTable, setDataTable] = useState([])

  const columns = [
    {
      name: 'No',
      selector: (row) => row.no,
      width: '70px',
      sortable: true
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phone_number,
      sortable: true
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true
    }
  ]

  const handleDataTable = () => {
    const data = [
      {
        id: 1,
        name: 'Outlet Hanif',
        phone_number: '089653478467',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Outlet Kumara',
        phone_number: '089273881821',
        status: 'Inactive'
      },
      {
        id: 3,
        name: 'Toko Sampoerna',
        phone_number: '089472828192',
        status: 'Active'
      },
      {
        id: 4,
        name: 'Toko Sejahtera',
        phone_number: '081382928391',
        status: 'Active'
      },
      {
        id: 5,
        name: 'Toko Material',
        phone_number: '089228388564',
        status: 'Inactive'
      }
    ]

    const result = []
    data.map((value, index) => {
      result.push({
        ...value,
        no: index + 1
      })
    })
    setDataTable(result)
  }

  useEffect(() => {
    handleDataTable()
  }, [])

  return (
    <div>
      <Paper elevation={2} className='px-3 py-2'>
        <div className="d-flex justify-content-between my-3">
          <h4>List Outlet</h4>
          <Link to="add">
            <div className="btn btn-outline-primary">
              Add Outlet
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
        <DataTable
          data={dataTable}
          columns={columns}
        />
      </Paper>
    </div>
  )
}
