import React from "react";
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import Group from "../../static/group.png";
const Contact = () => {
  return (
    <>
    <div className='fullsc'>
      <div
        className="container"
        style={{ overflow: "hidden", boxShadow: "none" }}
      >
        <div className="row margin-top">
          <div
            className="col-sm-4 block1"
            style={{ justifySelf: "center", borderRight: "1px solid grey" }}
          >
          
            <img
              src={Group}
              alt=""
              style={{
                marginLeft:'20%'
                
                
              }}
            ></img>
            <h1 className='customer' style={{ color: "#0072bc", marginTop:'10px',fontSize:'35px', fontWeight:'700' }}>
              Customer Support{" "}
            </h1>
           
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-12 block2">
                <h4 style={{ marginTop: "20px", marginLeft: "20px" }}>
                  {" "}
                  For any assistance, you can connect with the Customer Support
                  at :
                </h4>
                <div
                  className="col-md-10"
                  style={{ marginTop: "10px", textAlign: "left" }}
                >
                  <p
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                      color: "#f27317",
                      marginRight: "20px",
                    }}
                  >
                    <MdEmail size={50} /> experts@lawtarazoo.com
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                      marginTop: "30px",
                      color: "#f27317",
                      marginRight: "75px",
                    }}
                  >
                    <FiPhoneCall size={40} /> +91-9619792288
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 hidden-xs empty-block"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className='header1'>
      <div className="col-sm-12 block2">
      
            <h1 className='customer' style={{ color: "#0072bc", marginTop:'10px', fontWeight:'700' , textAlign:'center'}}>
              Customer Support{" "}
            </h1>
            <img
              src={Group}
              alt=""
              style={{
              marginLeft:'30%',
              marginTop:'20px'
                
              }}
            ></img>
                <h4 style={{ marginTop: "20px", marginLeft: "20px" }}>
                  {" "}
                  For any assistance, you can connect with the Customer Support
                  at :
                </h4>
                <div
                  className="col-md-10"
                  style={{ marginTop: "10px", textAlign: "left" }}
                >
                  <p
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                      color: "#f27317",
                      marginRight: "20px",
                    }}
                  >
                    <MdEmail size={50} /> experts@lawtarazoo.com
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                      marginTop: "30px",
                      color: "#f27317",
                      marginRight: "75px",
                    }}
                  >
                    <FiPhoneCall size={40} /> +91-9619792288
                  </p>
                </div>
              </div>
      </div>
    </>
  );
};

export default Contact;
