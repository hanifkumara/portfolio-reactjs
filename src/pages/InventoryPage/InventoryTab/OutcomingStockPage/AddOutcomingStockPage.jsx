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
import { useSelector, useDispatch } from 'react-redux'
import { getAllOutcomingStock } from '../../../../config/redux/actions/outcomingStock'

export default function AddOutcomingStockPage() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const [hasExpired, setHasExpired] = useState([]);
  const [outcomingStockProduct, setOutcomingStockProducts] = useState([]);

  const enableLoading = () => setLoading(true);
  const disableLoading = () => setLoading(false);

  const { allInventory } = useSelector(state => state.inventory)
  const { allOutlet } = useSelector(state => state.outlet)

  const initialValueStock = {
    outletId: "",
    notes: "",
    date: startDate,
    stocks: [
      {
        id: "",
        quantity: 0
      }
    ]
  };

  const StockSchema = Yup.object().shape({
    outletId: Yup.string()
      .min(1)
      .required("Please Choose An Outlet"),
    notes: Yup.string(),
    date: Yup.string().required("Please Input Date"),
    stocks: Yup.array().of(
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
        stocks: JSON.stringify(values.stocks)
      };

      console.log("data yang akan disave", stockData);

      try {
        enableLoading();
        await axios.post(`${API_URL}/api/v1/outcoming-stock`, stockData);
        disableLoading();
        dispatch(getAllOutcomingStock())
        navigate('/main/inventory/outcoming-stock');
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
      if (item.outletId === formikStock.values.outletId) {
        return item;
      } else {
        return "";
      }
    })
    .filter((item) => item)
    .map((item) => {
      return {
        label: item.name,
        options: item.Stocks.map((val) => {
          return {
            value: val.id,
            label: `${item.name} | Stock: ${val.stock} | Expired: ${
              val.expiredDate
                ? dayjs(val.expiredDate).format("DD-MMM-YYYY")
                : "-"
            }`
          };
        })
      };
    });

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

    formikStock.setFieldValue(`stocks[${idx}].quantity`, value);
  };

  const handleExpiredDate = (date, idx) => {
    outcomingStockProduct[idx] = date;
    const formatDate = dayjs(date).format('YYYY/MM/DD HH:mm:ss')
    formikStock.setFieldValue(`stocks[${idx}].expiredDate`, formatDate);
  };

  const CustomInputExpiredDate = ({ value, onClick }) => {
    return <Form.Control type="text" defaultValue={value} onClick={onClick} />;
  };

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center"
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <div>
      <Row>
        <Col>
          <Paper elevation={0} style={{ padding: "1rem", height: "100%" }}>
            <Form noValidate onSubmit={formikStock.handleSubmit}>
              <div className="d-flex justify-content-between">
                <div className="headerStart">
                  <h3>Add Outcoming Stock</h3>
                </div>
                <div className="d-flex">
                  <Link to="/main/inventory/outcoming-stock">
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
                        formikStock.setFieldValue("stocks", [
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

                    <Col sm={1}></Col>
                  </Row>

                  <FormikProvider value={formikStock}>
                    <FieldArray
                      name="stocks"
                      render={(arrayHelpers) => {
                        return (
                          <div>
                            {formikStock.values.stocks.map((item, index) => {
                              return (
                                <Row className="mb-2" key={index}>
                                  <Col>
                                    <Form.Group>
                                      <Select
                                        options={optionsProduct}
                                        formatGroupLabel={formatGroupLabel}
                                        placeholder="Select"
                                        name={`stocks[${index}].id`}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        onChange={(value) => {
                                          formikStock.setFieldValue(
                                            `stocks[${index}].id`,
                                            value.value
                                          );
                                          formikStock.setFieldValue(
                                            `stocks[${index}].quantity`,
                                            1
                                          )
                                        }}
                                      />
                                      {formikStock.touched.stocks &&
                                      formikStock.errors.stocks ? (
                                        <div className="fv-plugins-message-container">
                                          <div className="fv-help-block">
                                            {
                                              formikStock.errors.stocks[index]
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
                                        name={`stocks[${index}].quantity`}
                                        {...formikStock.getFieldProps(
                                          `stocks[${index}].quantity`
                                        )}
                                        onChange={(e) => {
                                          handleChangeQuantity(e, index);
                                        }}
                                        onBlur={(e) =>
                                          handleChangeQuantity(e, index)
                                        }
                                        required
                                      />
                                      {formikStock.touched.stocks &&
                                      formikStock.errors.stocks ? (
                                        <div className="fv-plugins-message-container">
                                          <div className="fv-help-block">
                                            {
                                              formikStock.errors.stocks[index]
                                                ?.quantity
                                            }
                                          </div>
                                        </div>
                                      ) : null}
                                    </Form.Group>
                                  </Col>

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
                                  arrayHelpers.push(initialValueStock.stocks[0])
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