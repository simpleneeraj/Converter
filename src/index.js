import React from "react";
import { render } from "react-dom";
import App from "./Components";
import "./Style/globals.scss";
//======================================//
// Entry OR Root
//======================================//
const root = document.getElementById("root");

render(<App />, root);
