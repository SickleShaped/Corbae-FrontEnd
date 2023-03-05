import React from "react";
import "./Link.css";
import { Link } from "react-router-dom";

const CorbaeLink = ({ children, ...props }) => {
  return <Link {...props}>{children}</Link>;
};

export default CorbaeLink;
