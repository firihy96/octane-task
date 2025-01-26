/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";

const IndeterminateCheckbox = ({ indeterminate, ...props }) => {
  let ref = useRef(null);

  // Setting the indeterminate state of the checkbox
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !props.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" className="cursor-pointer" ref={ref} {...props} />;
};

export default IndeterminateCheckbox;