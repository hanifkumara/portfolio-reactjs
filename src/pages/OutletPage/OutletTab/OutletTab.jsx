import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material' 
import { Link, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Form,
  InputGroup,
  Dropdown
} from 'react-bootstrap'
import {
  Search,
  MoreHoriz
} from '@mui/icons-material'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from 'react-redux'
import { getAllOutlet } from '../../../config/redux/actions/outlet'
import { toast } from 'react-toastify'

import axios from 'axios'

export default function OutletTab() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { allOutlet } = useSelector((state) => state.outlet)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [dataTable, setDataTable] = useState([])

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
      await axios.delete(`${API_URL}/api/v1/outlet/${row.id}`)
      dispatch(getAllOutlet())
      Toast('success', 'Successfully added Outlets', 3500)
      setTimeout(() => {
        navigate('/main/outlet')
      }, 700);
      dispatch(getAllOutlet())
    } catch (error) {
      Toast('error', error.response.data.err.message, 3000)
      console.log(error)
    }
  }

  const editOutlet = async (row) => {
    
  }

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
      selector: (row) => row.phoneNumber,
      sortable: true
    },
    {
      name: 'Status',
      selector: (row) => row.status,
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

            <Dropdown.Menu>
              <Link to={`edit/${row.id}`} state={row}>
                <Dropdown.Item as="button">
                  Edit
                </Dropdown.Item>
              </Link>
              <Dropdown.Item as="button" onClick={() => deleteOutlet(row)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      }
    }
  ]

  const handleDataTable = () => {
    const result = []
    allOutlet.map((value, index) => {
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
      <Paper elevation={0} className='px-3 py-2'>
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
          noHeader
          data={dataTable}
          columns={columns}
          style={{ minHeight: "100%" }}
          pagination
        />
      </Paper>
    </div>
  )
}
