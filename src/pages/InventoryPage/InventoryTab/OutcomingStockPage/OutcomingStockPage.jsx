import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  InputGroup,
  Form
} from 'react-bootstrap'
import { Search } from '@mui/icons-material'

export default function OutcomingStockPage() {

  const [dataTable, setDataTable] = useState([])
  const columns = [
    {
      name: 'No',
      width: '70px',
      sortable: true,
      selector: (row) => row.no
    },
    {
      name: 'Code Number',
      sortable: true,
      selector: (row) => row.code_number
    },
    {
      name: 'Outlet',
      sortable: true,
      selector: (row) => row.outlet
    },
    {
      name: 'Date',
      sortable: true,
      selector: (row) => row.date
    },
    {
      name: 'Status',
      sortable: true,
      selector: (row) => row.status
    }
  ]

  const handleDataTable = () => {
    const data = [
      {
        id: 1,
        code_number: 'OUT000001',
        outlet: 'Kumara Outlet',
        date: '12 Juni 2022',
        status: 'Done'
      },
      {
        id: 2,
        code_number: 'OUT000002',
        outlet: 'Hanif Outlet',
        date: '8 September 2022',
        status: 'Done'
      },
      {
        id: 3,
        code_number: 'OUT000003',
        outlet: 'Kumara Outlet',
        date: '19 Oktober 2022',
        status: 'Pending'
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
          <h4>Outcoming Stock</h4>
          <div className='d-flex'>
            <Link to='/main/inventory'>
              <div className="btn btn-primary">
                Back to Main
              </div>
            </Link>
          </div>
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
        <DataTable 
          data={dataTable}
          columns={columns}
        />
      </Paper>
    </div>
  )
}
