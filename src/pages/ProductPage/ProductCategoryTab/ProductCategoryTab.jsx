import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { Search } from '@mui/icons-material' 
import { Link } from 'react-router-dom'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import AddCategoryModal from './AddCategoryModal' 

export default function ProductCategoryTab() {

  const [dataTable, setDataTable] = useState([])
  const [showModalAddCategory, setShowModalAddCategory] = useState(false)

  const columns = [
    {
      name: 'No',
      selector: row => row.no,
      width: '70px',
      sortable: true
    },
    {
      name: 'Category Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Product Total',
      selector: row => row.product_total,
      sortable: true
    }
  ]

  const handleDataTable = () => {
    const data = [
      {
        id: 1,
        name: 'Makanan',
        product_total: 20
      },
      {
        id: 2,
        name: 'Minuman',
        product_total: 10
      },
      {
        id: 3,
        name: 'Alat',
        product_total: 15
      },
      {
        id: 4,
        name: 'Material',
        product_total: 5
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

  const handleCloseModalAddCategory = () => setShowModalAddCategory(false)
  const handleOpenModalAddCateogry = () => setShowModalAddCategory(true)

  return (
    <div>
      <AddCategoryModal 
        show={showModalAddCategory}
        handleClose={handleCloseModalAddCategory}
      />
      <Paper elevation={0} className='px-3 py-2'>
        <div className="d-flex justify-content-between my-3">
          <h4>List Category</h4>
          <div className="btn btn-outline-primary" onClick={() => handleOpenModalAddCateogry()}>
            Add Category
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
          data={dataTable}
          columns={columns}
        />
      </Paper>
    </div>
  )
}
