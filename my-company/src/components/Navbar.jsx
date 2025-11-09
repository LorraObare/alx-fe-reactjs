import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px" , backgroundColor: "#f0f0f0" , justifyContent: "center"}}>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
