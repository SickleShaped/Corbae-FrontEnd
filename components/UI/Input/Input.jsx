import React from "react";
import "./Input.css";

const CorbaeInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} className="CBInput" />;
});

export default CorbaeInput;
