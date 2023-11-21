import React from "react";
import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  //1. get user infor from session storage
  const userJson = sessionStorage.getItem("user");

  console.log(userJson); // string

  //2. parse into object

  const userObj = JSON.parse(userJson);

  console.log(userObj);

  //3. if user exist then update auth

  //checking auth

  const auth = userObj?._id;

  //im sending auth  to children-dashboard
  return auth ? children : <Navigate to="/" />;
};
