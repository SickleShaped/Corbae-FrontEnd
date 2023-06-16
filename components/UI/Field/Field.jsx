import { Field } from "formik";
import React from "react";
import "./Field.css";

const CorbaeField = React.forwardRef((props, ref) => {
  return <Field ref={ref} {...props} className="CBField" />;
});

export default CorbaeField;
