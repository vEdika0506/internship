import React from "react";
import "./Footer.css";
import { MdEmail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';

function Footer() {
  return (
    <footer style={{ textAlign: "center", backgroundColor: "#0072bc", marginBottom: "0px", color:"white", borderRadius:'10px'}}>
      <p style={{ marginBottom: 0, padding: "2px", fontSize: "15px" , marginTop:'150px'}}>For assistance: <span style={{marginLeft:'10px'}}><FiPhoneCall size={25} /> </span>+91-9619792288 <span style={{marginLeft:'10px', marginRight:'5px'}}><MdEmail size={25} /> </span>experts@lawtarazoo.com</p>
    </footer>
  );
}

export default Footer;