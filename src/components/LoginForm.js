import React from "react";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { useState } from "react";
import { loginUser } from "../heper/axiosHelper";

import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const [resp, setResp] = useState({
    status: "",
    message: "",
  });

  const [pending, setPending] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setPending(true);
    setResp({}); // this disapppear the message
    // const { email, password } = form;
    //check if the email is in database
    //check email matches with email in database

    const result = await loginUser(form);
    //always I get respose either "sucess"" or "error"
    console.log(result);

    setPending(false);

    if (result?.status === "success") {
      //store user in session storage
      sessionStorage.setItem("user", JSON.stringify(result.user));

      // setForm({});//anyway I will navigate tp dashboard
      //"success" or "error"
      navigate("/dashboard");
    } else {
      setResp(result);
    }
  };

  const inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      placeholder: "John@emial.com",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
      placeholder: "xxxxxx",
    },
  ];
  return (
    <Form onSubmit={handleOnSubmit}>
      {resp.message && (
        <Alert variant={resp.status === "success" ? "success" : "danger"}>
          {resp.message}
        </Alert>
      )}
      {inputs.map((item, i) => (
        <CustomInput key={i} {...item} onChange={handleOnChange} />
      ))}

      <div className="d-grid">
        <Button variant="primary" type="submit" disabled={pending}>
          {pending ? <Spinner animation="border" /> : "Submit"}
        </Button>
      </div>

      <div className="text-end mt-4">
        Are you new here? <a href="/signup">Signup</a> now
      </div>
    </Form>
  );
};
