import React from "react";
import { Navigate} from "react-router-dom";

const SignAdRouter: React.FC <{children: any}> = ({ children}) => {

   const admin = localStorage.getItem("admin");
  return admin ? <Navigate to="/admin/food" /> : children ;
};

export default SignAdRouter;