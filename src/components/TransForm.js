import React from "react";
import { Button, Form, Col, Row, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { CustomInput } from "./CustomInput";
import { postTrans } from "../heper/axiosHelper.js";

export const TransForm = ({ getAllTrans }) => {
  const [form, setForm] = useState({});

  const [resp, setResp] = useState({});

  const inputs = [
    {
      label: "Date",
      type: "date",
      name: "date",
      required: true,
    },
    {
      label: "Title",
      type: "text",
      name: "title",
      required: true,
      placeHolder: "description",
    },
    {
      label: "Amount",
      type: "number",
      name: "amount",
      required: true,
      placeHolder: "0",
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const result = await postTrans(form);
    //I need userId-it is stored in session storage.
    console.log(result);

    setResp(result);

    if (result.status === "success") {
      getAllTrans();
    }
  };
  return (
    <div className="mt-5">
      {resp.message && (
        <Alert variant={resp.status === "success" ? "success" : "danger"}>
          {" "}
          {resp.message}
        </Alert>
      )}
      <Form
        onSubmit={handleOnSubmit}
        className="shadow-lg border rounded p-3 bg-warning"
      >
        <Row>
          {/* dropdown */}
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select required onChange={handleOnChange} name="type">
                <option>-Select-</option>
                <option value="income">Income</option>
                <option value="expenses">Expense</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {inputs.map((item, i) => (
            <Col md={3} key={i}>
              <CustomInput {...item} onChange={handleOnChange} />
            </Col>
          ))}

          <Col md={1}>
            <Form.Group className="">
              <div className="d-grid mt-4"></div>
              <Button type="submit">Add</Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
