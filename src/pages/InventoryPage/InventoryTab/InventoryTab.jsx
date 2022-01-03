import React, { useState, useEffect } from 'react'

import { Paper } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  InputGroup,
  Form
} from 'react-bootstrap'
import DataTable from 'react-data-table-component'

export default function InventoryTab() {

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
      name: 'Outlet',
      selector: (row) => row.outlet,
      sortable: true
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true
    },
    {
      name: 'Starting Stock',
      selector: (row) => row.starting_stock,
      sortable: true
    },
    {
      name: 'Incoming Stock',
      selector: (row) => row.incoming_stock,
      sortable: true
    },
    {
      name: 'Outcoming Stock',
      selector: (row) => row.outcoming_stock,
      sortable: true
    }
  ]

  const handleDataTable = () => {
    const data = [
      {
        id: 1,
        outlet: 'Hanif Store',
        name: 'Rawon Daging Sapi Spesial',
        stock: 20,
        starting_stock: 50,
        incoming_stock: 0,
        outcoming_stock: 30
      },
      {
        id: 2,
        outlet: 'Hanif Store',
        name: 'Mie Bakso Urat ',
        stock: 100,
        starting_stock: 30,
        incoming_stock: 70,
        outcoming_stock: 0
      },
      {
        id: 3,
        outlet: 'Kumara Store',
        name: 'Martabak Telor Jumbo',
        stock: 5,
        starting_stock: 200,
        incoming_stock: 0,
        outcoming_stock: 195
      }
    ]
    const result = []
    data.map((value, index) => {
      result.push({
        ...value,
        no: index + 1
      })
      return true
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
          <h4>List Inventory</h4>
          <div className='d-flex'>
            <div className="btn btn-primary">
              Incoming Stock
            </div>
            <div className="btn btn-primary ms-2">
              Outcoming Stock
            </div>
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
        <hr />
        <DataTable
          columns={columns}
          data={dataTable}
        />
      </Paper>
    </div>
  )
}
