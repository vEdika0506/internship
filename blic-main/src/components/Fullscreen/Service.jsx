import React from "react";
import Assets from "../../static/forms-icon.png";
import Benificiary from "../../static/beneficiary.png";
import Will from "../../static/email.jpg";
import Assets1 from '../../static/formsmall.png'
import Benificiary1 from '../../static/beneficiarysmall.png';
import Will1 from '../../static/emailsmall.png'

const Service = () => {
  return (
   
     <>
    <div className = 'fullsc'>
      <div className="my-5">
        <h1 className="text-center" style={{ color: "#0072bc", fontWeight:'700'}}>
          {" "}
          Create Your Online Will in <span style = {{color:'#f27317'}}>3 Easy Steps </span> 
        </h1>
      </div>
      <div
        className="container-fluid mb-5"
        style={{ paddingBottom: "-10px", borderBottom: "2px solid grey" }}
      >
        <div className="row" style={{ height: "350px" }}>
          <div className="col-7 mx-auto">
            <div className="row">
              <div className="col-md-3 col-4 mx-auto" >
                {/* <div
                  className="card content"
                  style={{
                    height: "300px",
                    
                    display: "flex",
                    justifyContent: "space-around",
                    border: "none",
                  }}
                >
                  <img
                    src={Assets1}
                    className="card-img-top"
                    alt="..."
                    style={{
                      transform: "scale(0.5)",
                      justifyContent: "center",
                      marginTop: "0px",
                      height: "150px",
                      width: "150px",
                      paddingTop: "-25px",
                      marginLeft: "50px",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1 rem",
                      color: "grey",
                      textAlign: "center",
                    }}
                  >
                    Fill-in your Personal & Asset Details
                  </h3>
                </div> */}
              <div className = 'content' style={{
                    height: "280px",
                    width:'300px',
                    display: "flex",
                    flexDirection:'column',
                    border: "none",
                    justifyContent:'center',
                  }}>
                <div style={{height:'47%', marginTop:"20px", display:'flex',justifyContent:'center'}}>
                  <img src={Assets}  alt = 'Assets.jpg'style={{transform:'scale(0.8)'}}></img>
                </div>
                <div>
                  <h3 style={{textAlign:'center'}}>Fill-in your Personal & Asset Details</h3>
                </div>
              </div>
              </div>
              <div className="col-md-1 col-3 mx-auto"></div>
              <div className="col-md-3 col-5 mx-auto">
              <div className = 'content' style={{
                    height: "280px",
                    width:'300px',
                    display: "flex",
                   
                    flexDirection:'column',
                    border: "none",
                    justifyContent:'center',
                  }}>
                <div style={{height:'40%', marginTop:"20px", display:'flex',justifyContent:'center'}}>
                  <img src={Benificiary} alt = 'Beneficiary.jpg'></img>
                </div>
                <div>
                  <h3 style={{textAlign:'center'}}>Allocate Your Beneficiary</h3>
                </div>
              </div>
              </div>
              <div className="col-md-1 col-4 mx-auto"></div>
              <div className="col-md-3 col-8 mx-auto">
              <div className = 'content' style={{
                    height: "280px",
                    width:'300px',
                    display: "flex",
                    flexDirection:'column',
                    border: "none",
                    justifyContent:'center',
                  }}>
                <div style={{height:'40%', marginTop:"20px", display:'flex',justifyContent:'center'}}>
                  <img src={Will} alt ="Will.jpg"></img>
                </div>
                <div>
                  <h3 style={{textAlign:'center'}}>Get your Will on Email</h3>
                </div>
              </div>
              </div>

              <div className="col-md-1 col-4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className= 'header1' style ={{marginTop:'280px'}}>
      <div style={{borderBottom:'2px solid gray', paddingTop:'25px'}}>
      <div className='my-5' >
        <h1 className='text-center' style = {{fontSize:'27px', color :'#0072bc', marginLeft:'10%', marginRight:'10%', fontWeight:'700',}}> Create Your Online Will in 3 Easy Steps</h1>
      </div>
              <div className='content' style = {{height:'30%'}}>
      
                  <div        style = {{height:'25%'}}>
                    <img src={Assets1} alt=""  style ={{justifyContent:'center', transform:'scale(0.8)', marginLeft:'35%'}}/>
                  </div>
                  <h6  style={{ fontSize: '17 px',color:'grey',textAlign:'center', marginLeft:'10%', marginRight:'10%' }}>Fill-in your Personal & Asset Details</h6>
                  </div>
                  <div style = {{height:'30%'}}>
      
                  <div className='content' style = {{height:'25%', marginTop:'20px'}}>
                    <img src={Benificiary1} alt=""  style ={{justifyContent:'center', transform:'scale(0.8)', marginLeft:'33%', marginTop:'10%'}}/>
                    <h6  style={{ fontSize: '17 px',color:'grey',textAlign:'center',  }}>Allocate Your Beneficiary</h6>
                  </div>
                  </div>
      
                  <div style = {{height:'30%'}}>
      
      <div className='content' style = {{height:'25%' , marginTop:'20px', marginBottom:'30px'}}>
        <img src={Will1} alt=""  style ={{justifyContent:'center', transform:'scale(0.8)', marginLeft:'33%',marginTop:'10%'}}/>
        <h6  style={{ fontSize: '17 px',color:'grey',textAlign:'center', marginLeft:'10%', marginRight:'10%' }}>Get your Will on Email</h6>
      </div>
      
      </div>
            </div>
      </div>
     
    </>
  );
};

export default Service;
