import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute: React.FC <{children: any}>= ({ children}) => {

   const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/signin" />
};

export default PrivateRoute;