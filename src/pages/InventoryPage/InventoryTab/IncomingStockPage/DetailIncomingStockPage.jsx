import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import {
  Form,
  Row,
  Col
} from "react-bootstrap";
import { Paper } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs'
import { getAllIncomingStock } from '../../../../config/redux/actions/incomingStock'

import { useSelector, useDispatch } from 'react-redux'

export default function DetailIncomingStockPage() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [valueIncomingStock, setValueIncomingStock] = useState({})
  const { allIncomingStock } = useSelector(state => state.incomingStock)

  useState(() => {
    console.log('id incoming stock', id)
    const findIncomingStock = allIncomingStock.find(
      (val) => val.id === id
    )
    console.log('allIncomingStock', allIncomingStock)
    console.log('findIncomingStock', findIncomingStock)
    setValueIncomingStock(findIncomingStock)
  }, [id, allIncomingStock])

  useEffect(() => {
    dispatch(getAllIncomingStock())
  }, [])

  return (
    <div>
      <Row>
        <Col>
          <Paper elevation={0} style={{ padding: "1rem", height: "100%" }}>
            <div className="d-flex justify-content-between">
              <div className="headerStart">
                <h3>Detail Incoming Stock</h3>
              </div>
              <div className="d-flex">
                <Link to="/main/inventory/incoming-stock">
                  <div className="btn btn-outline-secondary">
                    Cancel
                  </div>
                </Link>
              </div>
            </div>
            <hr />

            <Row style={{ padding: "1rem" }} className="lineBottom">
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Outlet:</Form.Label>
                  <Form.Control
                    type="text"
                    value={valueIncomingStock?.Outlet?.name}
                    disabled
                    name="expiredDate"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="text"
                    value={valueIncomingStock?.date ? dayjs(valueIncomingStock.date).format('DD/MM/YYYY') : '-'}
                    disabled
                    name="expiredDate"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Notes:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="notes"
                    value={valueIncomingStock?.notes || '-'}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row style={{ padding: "1rem" }}>
              <Col>
                <Row>
                  <Col style={{ padding: "1rem", textAlign: "center" }}>
                    <h6>Product Name</h6>
                  </Col>
                  <Col style={{ padding: "1rem", textAlign: "center" }}>
                    <h6>Quantity</h6>
                  </Col>

                  <Col style={{ padding: "1rem", textAlign: "center" }}>
                    <h6>Expired Date</h6>
                  </Col>
                </Row>
                <div>
                  {valueIncomingStock && valueIncomingStock.IncomingStockProducts ? (
                    valueIncomingStock?.IncomingStockProducts.map((item, index) => {
                      return (
                        <Row className="mb-2" key={index}>
                          <Col>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                value={item.Product?.name}
                                disabled
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  value={item.quantity}
                                  disabled
                                />
                              </Form.Group>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                value={item.expiredDate ? dayjs(item.expiredDate).format('DD/MM/YYYY') : '-'}
                                disabled
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      );
                    })
                  ) : null }
                </div>
              </Col>
            </Row>
          </Paper>
        </Col>
      </Row>
    </div>
  )
}