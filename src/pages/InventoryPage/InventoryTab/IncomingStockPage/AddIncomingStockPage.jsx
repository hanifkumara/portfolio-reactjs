import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik, FormikProvider, FieldArray } from "formik";
import Select from "react-select";
import {
  Button,
  Form,
  Row,
  Col,
  Alert,
  Spinner,
  InputGroup
} from "react-bootstrap";
import { Paper } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs'
import axios from 'axios'

import { CalendarToday, Delete } from "@mui/icons-material";
import { useSelector } from 'react-redux'

export default function AddIncomingStockPage() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const [hasExpired, setHasExpired] = useState([]);
  const [incomingStockProduct, setIncomingStockProducts] = useState([]);

  const enableLoading = () => setLoading(true);
  const disableLoading = () => setLoading(false);

  const { allInventory } = useSelector(state => state.inventory)
  const { allOutlet } = useSelector(state => state.outlet)

  const initialValueStock = {
    outletId: "",
    notes: "",
    date: startDate,
    products: [
      {
        id: "",
        quantity: 0,
        expiredDate: ""
      }
    ]
  };

  const StockSchema = Yup.object().shape({
    outletId: Yup.string()
      .min(1)
      .required("Please Choose An Outlet"),
    notes: Yup.string(),
    date: Yup.string().required("Please Input Date"),
    products: Yup.array().of(
      Yup.object().shape({
        id: Yup.string()
          .min(1)
          .required("Please Input A Product"),
        quantity: Yup.number()
          .min(1, "Minimum 1 Character")
          .required("Please Input A Quantity")
      })
    )
  });

  const formikStock = useFormik({
    initialValues: initialValueStock,
    validationSchema: StockSchema,
    onSubmit: async (values) => {

      const stockData = {
        outletId: values.outletId,
        notes: values.notes,
        date: values.date ? dayjs(values.date).format('YYYY/MM/DD HH:mm:ss') : null,
        products: JSON.stringify(values.products)
      };

      console.log("data yang akan disave", stockData);

      try {
        enableLoading();
        await axios.post(`${API_URL}/api/v1/incoming-stock`, stockData);
        disableLoading();
        navigate('/main/inventory/incoming-stock');
      } catch (err) {
        setAlert(err.response?.data.message || err.message);
        disableLoading();
      }
    }
  });

  const validationStock = (fieldname) => {
    if (formikStock.touched[fieldname] && formikStock.errors[fieldname]) {
      return "is-invalid";
    }

    if (formikStock.touched[fieldname] && !formikStock.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const optionsProduct = allInventory
    .map((item) => {
      console.log("semua item", item);
      if (item.outletId === formikStock.values.outletId) {
        return {
          value: item.id,
          label: item.name,
          Stocks: item.Stocks,
          Unit: item.unit_id,
          price: item.price
        };
      } else {
        return "";
      }
    })
    .filter((item) => item);

  const optionsOutlet = allOutlet.map((item) => {
    return { value: item.id, label: item.name };
  });

  const handleDate = (date) => {
    setStartDate(date);
    formikStock.setFieldValue("date", date);
  };

  const CustomInputDate = ({ value, onClick }) => {
    return (
      <Form.Control
        type="text"
        defaultValue={value}
        onClick={onClick}
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      />
    );
  };

  const handleChangeQuantity = (e, idx) => {
    const { value } = e.target;

    formikStock.setFieldValue(`products[${idx}].quantity`, value);
  };

  const handleExpiredDate = (date, idx) => {
    incomingStockProduct[idx] = date;
    const formatDate = dayjs(date).format('YYYY/MM/DD HH:mm:ss')
    formikStock.setFieldValue(`products[${idx}].expiredDate`, formatDate);
  };

  const CustomInputExpiredDate = ({ value, onClick }) => {
    return <Form.Control type="text" defaultValue={value} onClick={onClick} />;
  };

  return (
    <div>
      <Row>
        <Col>
          <Paper elevation={0} style={{ padding: "1rem", height: "100%" }}>
            <Form noValidate onSubmit={formikStock.handleSubmit}>
              <div className="d-flex justify-content-between">
                <div className="headerStart">
                  <h3>Add Incoming Stock</h3>
                </div>
                <div className="d-flex">
                  <Link to="/main/inventory/incoming-stock">
                    <div className="btn btn-outline-secondary">
                      Cancel
                    </div>
                  </Link>
                  
                  <button type='submit' className="btn btn-outline-primary ms-2" disabled={loading} >
                    Save
                    {loading ? (
                      <Spinner className="ms-2"  animation="border" role="status" size="sm"/>
                    ): null }
                  </button>
                </div>
              </div>
              <hr />
              {alert ? <Alert variant="danger">{alert}</Alert> : ""}

              <Row style={{ padding: "1rem" }} className="lineBottom">
                <Col sm={3}>
                  <Form.Group>
                    <Form.Label>Outlet:</Form.Label>
                    <Select
                      options={optionsOutlet}
                      name="outletId"
                      placeholder="Select"
                      className="basic-single"
                      classNamePrefix="select"
                      onChange={(value) => {
                        formikStock.setFieldValue("outletId", value.value);
                        formikStock.setFieldValue("products", [
                          {
                            id: "",
                            quantity: 0
                          }
                        ]);
                      }}
                    />
                    {formikStock.touched.outletId &&
                    formikStock.errors.outletId ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formikStock.errors.outletId}
                        </div>
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Date:</Form.Label>
                    <InputGroup>
                      <DatePicker
                        name="date"
                        selected={startDate}
                        onChange={handleDate}
                        customInput={<CustomInputDate />}
                        required
                      />
                      <InputGroup.Text>
                        <CalendarToday />
                      </InputGroup.Text>
                    </InputGroup>
                    {formikStock.touched.date && formikStock.errors.date ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formikStock.errors.date}
                        </div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>Notes:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="notes"
                      {...formikStock.getFieldProps("notes")}
                      className={validationStock("notes")}
                    />
                    {formikStock.touched.notes && formikStock.errors.notes ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formikStock.errors.notes}
                        </div>
                      </div>
                    ) : null}
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

                    <Col sm={1}></Col>
                  </Row>

                  <FormikProvider value={formikStock}>
                    <FieldArray
                      name="products"
                      render={(arrayHelpers) => {
                        return (
                          <div>
                            {formikStock.values.products.map((item, index) => {
                              return (
                                <Row className="mb-2" key={index}>
                                  <Col>
                                    <Form.Group>
                                      <Select
                                        options={optionsProduct}
                                        placeholder="Select"
                                        name={`products[${index}].id`}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        onChange={(value) => {
                                          console.log('value when chose product', value)
                                          formikStock.setFieldValue(
                                            `products[${index}].id`,
                                            value.value
                                          );

                                          formikStock.setFieldValue(
                                            `products[${index}].quantity`,
                                            1
                                          );

                                          const currStock = value.Stocks.find(
                                            (val) => val.isInitial
                                          );
                                          
                                          console.log("currStock", currStock);
                                          if (currStock?.expiredDate) {
                                            const resDate = new Date(
                                              currStock.expiredDate
                                            );
                                            const tempExpired = hasExpired;
                                            hasExpired[index] = true;
                                            setHasExpired(tempExpired);
                                            formikStock.setFieldValue(
                                              `products[${index}].expiredDate`,
                                              resDate
                                            );
                                            const tempExpiredDate = incomingStockProduct;
                                            tempExpiredDate[index] = resDate;
                                            setIncomingStockProducts(
                                              tempExpiredDate
                                            );
                                          } else {
                                            console.log(
                                              "TIDAK masuk expired nya"
                                            );
                                            const tempExpired = hasExpired;
                                            hasExpired[index] = null;
                                            setHasExpired(tempExpired);
                                            formikStock.setFieldValue(
                                              `products[${index}].expiredDate`,
                                              null
                                            );
                                          }
                                        }}
                                      />
                                      {formikStock.touched.products &&
                                      formikStock.errors.products ? (
                                        <div className="fv-plugins-message-container">
                                          <div className="fv-help-block">
                                            {
                                              formikStock.errors.products[index]
                                                ?.id
                                            }
                                          </div>
                                        </div>
                                      ) : null}
                                    </Form.Group>
                                  </Col>
                                  <Col>
                                    <Form.Group>
                                      <Form.Control
                                        type="number"
                                        name={`products[${index}].quantity`}
                                        {...formikStock.getFieldProps(
                                          `products[${index}].quantity`
                                        )}
                                        onChange={(e) => {
                                          handleChangeQuantity(e, index);
                                        }}
                                        onBlur={(e) =>
                                          handleChangeQuantity(e, index)
                                        }
                                        required
                                      />
                                      {formikStock.touched.products &&
                                      formikStock.errors.products ? (
                                        <div className="fv-plugins-message-container">
                                          <div className="fv-help-block">
                                            {
                                              formikStock.errors.products[index]
                                                ?.quantity
                                            }
                                          </div>
                                        </div>
                                      ) : null}
                                    </Form.Group>
                                  </Col>

                                  {hasExpired[index] ? (
                                    <Col>
                                      <Form.Group>
                                        <DatePicker
                                          name={`products[${index}].expiredDate`}
                                          selected={incomingStockProduct[index]}
                                          onChange={(date) =>
                                            handleExpiredDate(date, index)
                                          }
                                          customInput={
                                            <CustomInputExpiredDate />
                                          }
                                          required
                                        />
                                        {formikStock.touched.products &&
                                        formikStock.errors.products ? (
                                          <div className="fv-plugins-message-container">
                                            <div className="fv-help-block">
                                              {
                                                formikStock.errors.products[index]
                                                  ?.expiredDate
                                              }
                                            </div>
                                          </div>
                                        ) : null}
                                      </Form.Group>
                                    </Col>
                                  ) : (
                                    <Col>
                                      <Form.Group>
                                        <Form.Control
                                          type="text"
                                          value="-"
                                          disabled
                                          name="expiredDate"
                                        />
                                      </Form.Group>
                                    </Col>
                                  )}

                                  <Col sm={1}>
                                    <Button
                                      onClick={() => arrayHelpers.remove(index)}
                                      variant="danger"
                                    >
                                      <Delete />
                                    </Button>
                                  </Col>
                                </Row>
                              );
                            })}

                            <Row style={{ padding: "1rem", display: "inline-block" }}>
                              <Button
                                onClick={() =>
                                  arrayHelpers.push(initialValueStock.products[0])
                                }
                                variant="primary"
                              >
                                + Add Another Product
                              </Button>
                            </Row>
                          </div>
                        );
                      }}
                    />
                  </FormikProvider>
                </Col>
              </Row>
            </Form>
          </Paper>
        </Col>
      </Row>
    </div>
  )
}