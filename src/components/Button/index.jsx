import React from "react";
import "./index.css";

export const Button = props => (
  <button onClick={ () => props.handleClick( props.children ) }>{ props.children }</button>
);

export default Button;