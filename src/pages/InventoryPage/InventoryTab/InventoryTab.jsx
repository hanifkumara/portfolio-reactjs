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
import dayjs from 'dayjs'
import { ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllInventory } from '../../../config/redux/actions/inventory'

export default function InventoryTab() {
  const dispatch = useDispatch()

  const [dataTable, setDataTable] = useState([])

  const { allInventory } = useSelector(state => state.inventory)
  const [search, setSearch] = useState('')

  const handleSearch = (e) => setSearch(e.target.value)

  useEffect(() => {
    dispatch(getAllInventory(search))
  }, [search])

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
      selector: (row) => row.Outlet?.name,
      sortable: true
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true
    },
    {
      name: 'Starting Stock',
      selector: (row) => row.stockStarting,
      sortable: true
    },
    {
      name: 'Incoming Stock',
      selector: (row) => row.incomingStock,
      sortable: true
    },
    {
      name: 'Outcoming Stock',
      selector: (row) => row.outcomingStock,
      sortable: true
    }
  ]

  const handleDataTable = (data) => {
    const result = []
    data.map((value, index) => {
      let incomingStock = 0;
      let outcomingStock = 0;

      if (value.Stocks?.length) {
        for (const val of value.Stocks) {
          if (val.IncomingStock?.IncomingStockProducts.length) {
            for (const stock of val.IncomingStock.IncomingStockProducts) {
              incomingStock += stock.quantity;
            }
          }
          if (val.OutcomingStockProducts) {
            for (const stock of val.OutcomingStockProducts) {
              outcomingStock += stock.quantity;
            }
          }
        }
      }

      result.push({
        ...value,
        no: index + 1,
        incomingStock,
        outcomingStock
      })
      return true
    })
    setDataTable(result)
  }

  useEffect(() => {
    handleDataTable(allInventory)
  }, [allInventory])

  const ExpandableComponent = ({ data }) => {
    const stockData = data.Stocks.map((item) => {
      return {
        id: item.id,
        batch: item.IncomingStock
          ? item.IncomingStock.code
          : "-",
        stock: item.stock || 0,
        expiredDate: item.expiredDate
          ? dayjs(item.expiredDate).format("DD-MMM-YYYY")
          : "-",
        createdAt: item.createdAt
      };
    });

    return (
      <>
        <ListGroup style={{ padding: "1rem", marginLeft: "1rem" }}>
          <ListGroup.Item>
            <Row>
              <Col style={{ fontWeight: "700", fontSize: '0.8rem' }}>Batch</Col>
              <Col style={{ fontWeight: "700", fontSize: '0.8rem' }}>Stock</Col>
              <Col style={{ fontWeight: "700", fontSize: '0.8rem' }}>Expired Date</Col>
            </Row>
          </ListGroup.Item>
          {stockData.length ? (
            stockData.map((val, index) => {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col style={{ fontSize: '0.8rem' }}>{val.batch}</Col>
                    <Col style={{ fontSize: '0.8rem' }}>{val.stock}</Col>
                    <Col style={{ fontSize: '0.8rem' }}>{val.expiredDate}</Col>
                  </Row>
                </ListGroup.Item>
              );
            })
          ) : (
            <ListGroup.Item>
              <Row>
                <Col>-</Col>
                <Col>-</Col>
                <Col>-</Col>
              </Row>
            </ListGroup.Item>
          )}
        </ListGroup>
      </>
    );
  };

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
          <h4>List Inventory</h4>
          <div className='d-flex'>
            <Link to='incoming-stock'>
              <div className="btn btn-outline-primary">
                Incoming Stock
              </div>
            </Link>
            <Link to='outcoming-stock'>
              <div className="btn btn-outline-primary ms-2">
                Outcoming Stock
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
        <hr />
        <DataTable
          columns={columns}
          data={dataTable}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          expandableRows
          expandableRowsComponent={ExpandableComponent}
        />
      </Paper>
    </div>
  )
}
