import React, {useState, useEffect} from 'react'
import { Paper } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'

export default function ProductTab() {

  const [dataTable, setDataTable] = useState([])
  
  const columns = [
    {
      name: 'No',
      selector: row => row.no,
      width: '70px',
      sortable: true
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Outlet',
      selector: row => row.outlet,
      sortable: true
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true
    }
  ]

  const handleDataTable = () => {
    const data = [
      {
        id: 1,
        outlet: 'Hanif Store',
        name: 'Rawon Daging Sapi Spesial',
        price: 'Rp. 15.000'
      },
      {
        id: 2,
        outlet: 'Hanif Store',
        name: 'Mie Bakso Urat ',
        price: 'Rp. 25.000'
      },
      {
        id: 3,
        outlet: 'Kumara Store',
        name: 'Martabak Telor Jumbo',
        price: 'Rp. 45.000'
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
      <Paper elevation={0} className='px-3 py-2'>
        <div className="d-flex justify-content-between my-3">
          <h4>List Product</h4>
          <Link to="add">
            <div className="btn btn-outline-primary">
              Add Product
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
          columns={columns}
          data={dataTable}
        />
      </Paper>
    </div>
  )
}
