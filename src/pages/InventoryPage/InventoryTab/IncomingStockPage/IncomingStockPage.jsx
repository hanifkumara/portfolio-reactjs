import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  InputGroup,
  Form,
  Dropdown
} from 'react-bootstrap'
import { Search } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import CustomMenu from '../../../../components/CustomMenuDropdown/CustomMenuDropdown'
import dayjs from 'dayjs'
import { getAllIncomingStock } from '../../../../config/redux/actions/incomingStock'

export default function IncomingStockPage() {

  const dispatch = useDispatch()
  
  const [dataTable, setDataTable] = useState([])

  const { allIncomingStock } = useSelector(state => state.incomingStock)
  const [search, setSearch] = useState('')

  const handleSearch = (e) => setSearch(e.target.value)

  useEffect(() => {
    dispatch(getAllIncomingStock(search))
  }, [search])

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
      selector: (row) => row.Outlet?.name
    },
    {
      name: 'Date',
      sortable: true,
      selector: (row) => row.date ? dayjs(row.date).format('DD/MM/YYYY') : '-'
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
              <Link to={`detail/${row.id}`} state={row}>
                <Dropdown.Item as="button">
                  Edit
                </Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        );
      }
    }
  ]

  const handleDataTable = (data) => {
    console.log('handleDataTable', data)
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

  useEffect(() => {
    dispatch(getAllIncomingStock())
  }, [])

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
                value={search}
                onChange={handleSearch}
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
