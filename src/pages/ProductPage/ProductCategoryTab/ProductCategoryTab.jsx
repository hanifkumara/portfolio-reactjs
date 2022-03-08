import React, { useEffect, useState } from 'react'
import { 
  Paper,
  Switch, } from '@mui/material'
import { Search, MoreHoriz } from '@mui/icons-material' 
import { Link } from 'react-router-dom'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import AddCategoryModal from './AddCategoryModal' 
import EditCategoryModal from './EditCategoryModal' 
import { Dropdown } from 'react-bootstrap'
import CustomMenu from '../../../components/CustomMenuDropdown/CustomMenuDropdown'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductCategory } from '../../../config/redux/actions/product_category'

import { toast } from 'react-toastify'
toast.configure()

export default function ProductCategoryTab() {
  const API_URL =  process.env.REACT_APP_API_URL

  const [dataTable, setDataTable] = useState([])
  const [showModalAddCategory, setShowModalAddCategory] = useState(false)
  const [showModalEditCategory, setShowModalEditCategory] = useState(false)
  const [dataProductCategory, setDataProductCategory] = useState({})

  const Toast = (status, message) => {
    if(status === 'success') {
      return toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      return toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const dispatch = useDispatch()
  const { allProductCategory } = useSelector(state => state.productCategory)

  const deleteOutlet = async (row) => {
    try {
      await axios.delete(`${API_URL}/api/v1/product-category/${row.id}`)
      Toast('success', `success delete product category ${row.name}`)
      dispatch(getAllProductCategory())      
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChangeStatus = async (row) => {
    console.log('handleChangeStatus', row)
    try {
      await axios.patch(`${API_URL}/api/v1/product-category/status/${row.id}`, {
        status: row.status ? 0 : 1
      })
      dispatch(getAllProductCategory())
    } catch (error) {
      console.log('error', error)
    }
  }

  const openModalEdit = (row) => {
    handleOpenModalEditCateogry()
    setDataProductCategory(row)
  }

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
      name: 'Status',
      cell: (rows) => {
        return (
          <Switch
            color="primary"
            checked={rows.status ? true : false}
            onChange={() => handleChangeStatus(rows)}
            name=""
          />
        );
      },
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row) => {
        return (
          <Dropdown>
            <Dropdown.Toggle style={{backgroundColor: 'grey', border: 'none'}}>
              <MoreHoriz color="action" />
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              <Dropdown.Item as="button" onClick={() => openModalEdit(row)}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => deleteOutlet(row)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
      }
    }
  ]

  const handleDataTable = async (data) => {
    try {
      const result = []
      data.map((value, index) => {
        result.push({
          ...value,
          no: index + 1
        })
      })
      setDataTable(result)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    console.log('allProductCategory', allProductCategory)
    handleDataTable(allProductCategory)
  }, [allProductCategory])

  const handleCloseModalAddCategory = () => setShowModalAddCategory(false)
  const handleOpenModalAddCateogry = () => setShowModalAddCategory(true)

  const handleCloseModalEditCategory = () => setShowModalEditCategory(false)
  const handleOpenModalEditCateogry = () => setShowModalEditCategory(true)

  return (
    <div>
      <AddCategoryModal 
        show={showModalAddCategory}
        handleClose={handleCloseModalAddCategory}
      />
      <EditCategoryModal 
        show={showModalEditCategory}
        handleClose={handleCloseModalEditCategory}
        data={dataProductCategory}
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
