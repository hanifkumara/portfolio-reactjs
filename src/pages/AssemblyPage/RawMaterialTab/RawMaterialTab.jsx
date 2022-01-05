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
import AddRawMaterialModal from './AddRawMaterialModal'

export default function RawMaterialTab() {

  const [dataTable, setDataTable] = useState([])
  const [showModalAddRawMaterial, setShowModalAddRawMaterial] = useState(false)

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
        code_number: 'INC000001',
        outlet: 'Hanif Outlet',
        date: '27 Juni 2022',
        status: 'Done'
      },
      {
        id: 2,
        code_number: 'INC000002',
        outlet: 'Hanif Outlet',
        date: '3 Agustus 2022',
        status: 'Done'
      },
      {
        id: 3,
        code_number: 'INC000003',
        outlet: 'Kumara Outlet',
        date: '10 Agustus 2022',
        status: 'Pending'
      },
      {
        id: 4,
        code_number: 'INC000004',
        outlet: 'Kumara Outlet',
        date: '1 Desember 2022',
        status: 'Done'
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

  const handleCloseModalAddRawMaterial = () => setShowModalAddRawMaterial(false)
  const handleOpenModalAddRawMaterial = () => setShowModalAddRawMaterial(true)

  return (
    <div>
      <AddRawMaterialModal
        show={showModalAddRawMaterial}
        handleClose={handleCloseModalAddRawMaterial}
      />
      <Paper elevation={2} className='px-3 py-2'>
        <div className="d-flex justify-content-between my-3">
          <h4>Raw Material</h4>
          <div className='d-flex'>
            <div className="btn btn-primary" onClick={handleOpenModalAddRawMaterial}>
              Add Raw Material
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
        <DataTable 
          data={dataTable}
          columns={columns}
        />
      </Paper>
    </div>
  )
}
