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
import { useSelector } from 'react-redux'

export default function IncomingStockPage() {

  const [dataTable, setDataTable] = useState([])

  const { allIncomingStock } = useSelector(state => state.incomingStock)

  console.log('allIncomingStock', allIncomingStock)

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
      selector: (row) => row.code
    },
    {
      name: 'Outlet',
      sortable: true,
      selector: (row) => row.Outet?.name
    },
    {
      name: 'Date',
      sortable: true,
      selector: (row) => row.date
    }
  ]

  const handleDataTable = (data) => {
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
    handleDataTable(allIncomingStock)
  }, [allIncomingStock])

  const paginationComponentOptions = {
    rowsPerPageText: 'Row per Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Show All',
  };

  return (
    <div>
      <Paper elevation={0} className='px-3 py-2'>
        <div className="d-flex justify-content-between my-3">
          <h4>Incoming Stock</h4>
          <div className='d-flex'>
            <Link to='/main/inventory'>
              <div className="btn btn-outline-primary">
                Back to Main
              </div>
            </Link>
            <Link to='add'>
              <div className="btn btn-outline-primary ms-2">
                Add Incoming Stock
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
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </Paper>
    </div>
  )
}
