import React from "react";
import { Navigate} from "react-router-dom";

const SignRouter: React.FC <{children: any}> = ({ children}) => {

   const user = localStorage.getItem("user");
  return user ? <Navigate to="/" /> : children ;
};

export default SignRouter;