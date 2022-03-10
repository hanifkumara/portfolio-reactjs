import React, {useState, useEffect} from 'react'
import { Paper, Switch } from '@mui/material'
import { Search, MoreHoriz } from '@mui/icons-material'
import { Row, Col, InputGroup, Form, Dropdown } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProduct } from '../../../config/redux/actions/product'
import CustomMenu from '../../../components/CustomMenuDropdown/CustomMenuDropdown'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ProductTab() {
  const API_URL = process.env.REACT_APP_API_URL

  const [dataTable, setDataTable] = useState([])

  const { allProduct } = useSelector(state => state.product)

  const { allOutlet } = useSelector(state => state.outlet)

  const dispatch = useDispatch()

  const Toast = (status, message, autoClose= 5000) => {
    if(status === 'success') {
      return toast.success(message, {
        position: "top-right",
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      return toast.error(message, {
        position: "top-right",
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const deleteOutlet = async (row) => {
    try {
      await axios.delete(`${API_URL}/api/v1/product/${row.id}`)
      Toast('success', `success delete product ${row.name}`)
      dispatch(getAllProduct())      
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChangeStatus = async (row) => {
    try {
      await axios.patch(`${API_URL}/api/v1/product/status/${row.id}`, {
        status: row.status ? 0 : 1
      })
      dispatch(getAllProduct())
    } catch (error) {
      console.log('error', error)
    }
  }

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
      selector: row => row.Outlet.name,
      sortable: true
    },
    {
      name: 'Price',
      selector: row => row.price,
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
              <Link to={`edit/${row.id}`} state={{row, allOutlet}}>
                <Dropdown.Item as="button">
                  Edit
                </Dropdown.Item>
              </Link>
              <Dropdown.Item as="button" onClick={() => deleteOutlet(row)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
      }
    }
  ]

  const handleDataTable = (data) => {
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
    handleDataTable(allProduct)
  }, [allProduct])

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
