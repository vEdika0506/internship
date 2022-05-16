import React, { useState } from "react";
import TermsConditions from "./TermsConditions";
import Modal from "react-bootstrap/Modal";
import { Redirect } from "react-router-dom";
import Index from "../../static/index.jpg";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./home.css";
// import  {Link} from 'react-router-dom'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="myVerticallyCenteredModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Terms & Conditions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TermsConditions />
      </Modal.Body>
      {/* <Modal.Footer>
        <small>By clicking 'Accept' you are agreeing to our terms and conditions.</small>
        <Button onClick={props.onHide}>Accept</Button>
      </Modal.Footer> */}
    </Modal>
  );
}






const Home = () => {
  const [hemail, setEmail] = useState("");
  const [hname, setName] = useState("");
  const [hphone, setPhone] = useState("");
  const [ticked, setTicked] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  

  const toggleTick = (event) => {
    let t = !ticked;
    let errors = err;
    setTicked(t);
    if (t) {
      errors.ticked = "";
      setErr(errors);
    } else {
      errors.ticked = "Please Accept Terms and Condition";
      setErr(errors);
    }
  };
  const [err, setErr] = useState({
    fullname: "0",
    email: "0",
    phoneno: "0",
    ticked: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = err;
    switch (name) {
      case "fullname":
        setName(value);
        errors.fullname = value.match(/^[a-zA-Z]+ [a-zA-Z]+$/)
          ? ""
          : "Enter Valid Full Name E.g. Ankit Verma";
        break;
      case "email":
        setEmail(value);
        errors.email = value.match(/\S+@\S+\.\S+/)
          ? ""
          : "Enter Valid Email id ";
        break;
      case "phoneno":
        if (value.length === 11) {
          break;
        }
        setPhone(value);

        errors.phoneno = value.match(/^\d{10}$/) ? "" : "Enter Valid Phone no.";
        setErr(errors);
        break;
      case 'tick':
        let t = !ticked
        setTicked(t)
        errors.ticked = t?'':'Please Accept Terms and Condition';
        break;
      default:
        break;
    }
    setErr(errors);
  };



  // const options = {
  //   title: 'Title',
  //   message: 'Message',
  //   buttons: [
      
  //     {
  //       label: 'Go Back',
  //       onClick: () => setSubmitted(false)
  //     },
  //     {
  //       label: 'Continue',
  //       onClick: () => setSubmitted(true)
  //     }
  //   ],
  //   // childrenElement: () => <div />,
    
  //   closeOnEscape: true,
  //   closeOnClickOutside: true,
  //   willUnmount: () => {},
  //   afterClose: () => {},
  //   onClickOutside: () => {},
  //   onKeypressEscape: () => {},
  //   overlayClassName: "overlay-custom-class-name"
  // };
  
  // confirmAlert(options);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };
  const [fill ,setFill ] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(err)) {
      console.info("Valid Form");
      confirmAlert({
        title: 'Do you want to proceed',
        message: 'Please Ensure that Valid Details are filled as the Will document will be sent on email ID',
        buttons: [
          {
            label: 'Go Back',
            onClick: () => setSubmitted(false)
          },
          {
            label: 'Continue',
            onClick: () => setSubmitted(true)
          }
        ]
      });
      //alert('Please Ensure information provided is correct ')
      //setSubmitted(true);
    } else {
      setSubmitted(false);
      
      let temp = []
      // alert("Please Fill valid details");
      Object.values(err).forEach(
        // if we have an error string set valid to false
        (val) => {temp.push(val)}

      );
      for( let i =0; i <= temp.length; i++){
        if (temp[i] === '0'){
          setFill('Please Enter all the details')
          break
        }
        else{
          setFill('')
        }
      }
    }
  };


  return (
    <>
   
   <section
        id="header"
        className="d-flex align-items-center"
        style={{
          paddingBottom: "70px",
          marginTop: "80px",
        }}
      >
        <div className ="header1">
         <main className="header" style={{ marginTop: "80px" }}>
        <header
          className="header"
          style={{ marginTop:'80px' ,paddingTop: "300px", backgroundColor: "#0072bc" }}
        >
          <h1
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            {" "}
            Bajaj Allianz Life Will Creator{" "}
          </h1>
         
            {" "}
            <h6 style={{ color: "white", textAlign: "center" , fontWeight:'300 !important'}}>
                    <p style={{fontWeight:'300'}}>“Secure your dear ones. Express your wishes so that your
                    loved ones stay protected.</p>
                    Create Your WILL in 3 simple steps”
                  </h6>
       
          <img
            src={Index}
            alt="alt"
            style={{
              transform: "scale(0.7)",
              borderRadius: "50%",
              justifyContent: "center",
              marginTop: "-30px",
              marginRight: "10px",
              boxShadow:'10px 18px 16px rgb(0 0 0 / 20%)'

            }}
          ></img>
        </header>
        
       
      </main>
      <div
        className="col-lg-4 order-2 order-lg-2 d-flex flex-column justify-content-center content"
        style={{
          backgroundColor: "white",
          marginTop: "-25px",
          borderRadius: "13px",
          padding: "10px 16px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ paddingTop: "40px" }}>
          <div className="mb-3">
            <label className="form-label">
              Full Name{" "}
              <span className="required" style={{ color: "#db2f23" }}>
                *
              </span>
            </label>
            <input
              autoComplete="off"
              className="form-control"
              type="name"
              name="fullname"
              onChange={handleChange}
              value={hname}
              required
            />
            {err.fullname.length > 1 && (
              <span className="text-danger">{err.fullname}</span>
            )}
            {/* {submitted && !values.fullname ? <span className="text-danger">please enter the fullname</span> : null} */}
            {/* {submitted && !namevalid ?  <span className="text-danger">please enter only characters</span> : null} */}
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNo" className="form-label">
              Contact No.{" "}
              <span className="required" style={{ color: "#db2f23" }}>
                *
              </span>
            </label>
            <input
              autoComplete="off"
              className="form-control"
              type="tel"
              name="phoneno"
              onChange={handleChange}
              value={hphone}
              required
            />
            {err.phoneno.length > 1 && (
              <span className="text-danger">{err.phoneno}</span>
            )}
            {/* {submitted && !values.phone ? <span className="text-danger">please enter the phone number</span> : null}
                      {submitted && phonevalid ? <span className="text-danger">please enter the valid phone number</span> : null} */}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label ">
              Email address{" "}
              <span className="required" style={{ color: "#db2f23" }}>
                *
              </span>
            </label>
            <input
              autoComplete="off"
              className="form-control"
              type="email"
              name="email"
              onChange={handleChange}
              value={hemail}
              required
            />
            {err.email.length > 1 && (
              <span className="text-danger">{err.email}</span>
            )}
            {/* <input type='email' id='email' name='email' className={`input ${errors.email && 'is-danger'}`}  className="form-control" name = 'email'
                        onChange={handleChange}
                      /> */}

            {/* {(submitted && !emailvalid) ? <span className="text-danger">please enter the valid email</span> : null} */}
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="tick"
              defaultChecked={ticked}
        onChange={toggleTick}
            />
            <p className="form-check-label" htmlFor="exampleCheck1">
              {" "}
              I accept all{" "}
              <button
                className="secondary-button"
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => setModalShow(true)}
              >
                Terms and Conditions
              </button>
            </p>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            {err.ticked.length > 1 && (
              <span className="text-danger" style={{ display: "inline-block" }}>
                {err.ticked}
              </span>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              id="next-btn"
              style={{ justifyContent: "center", alignSelf: "center" }}
              onClick={handleSubmit}
            >
              Create Will
              {submitted ? <Redirect to="/will-creator-tool"></Redirect> : null}
            </button>
          </div>
        </form>
      </div>
      </div>
      <div className = 'fullsc'>
        <div className="container-fluid nav_bg">
          <div className="row" style ={{justifyContent:'center'}}>
            <div className="col-12 mx-auto">
              <div className="row">
                <div className="col-md-3 pt-5 pt-lg-0 order-1 order-lg-1 d-flex  flex-column">
                  <img
                    alt="index"
                    src={Index}
                    style={{ transform: "scale(1)", borderRadius: "50%", marginTop:'40px'}}
                  ></img>
                </div>
                <div
                  className="col-md-5 pt-5 pt-lg-0 order-1 order-lg-1 d-flex  flex-column"
                  style={{ justifyContent: "center", marginRight: "40px" }}
                >
                  <h1 className="brand-name">
                    {" "}
                    <strong
                      style={{
                        color: "white",
                        fontSize: "35px",
                        marginTop: "50px",
                        textAlign: "center",
                      }}
                    >
                      Bajaj Allianz Life Will Creator
                    </strong>{" "}
                  </h1>
                  <h3 style={{ color: "white", textAlign: "center" , fontWeight:'300 !important'}}>
                    <p style={{fontWeight:'300'}}>“Secure your dear ones. Express your wishes so that your
                    loved ones stay protected.</p>
                    Create Your WILL in 3 simple steps”
                  </h3>
                  <h3 style={{ color: "white", textAlign: "center"}}>
                     
                  </h3>
                </div>
                {/* <div className="col-md-1 pt-5 pt-lg-0 order-1 order-lg-1 d-flex justify-content-center flex-column"></div> */}
                <div
                  className="col-lg-3 order-2 order-lg-2 d-flex flex-column justify-content-center"
                  style={{
                    backgroundColor: "white",
                    padding: "10px 50px 50px 50px",
                    borderRadius: "13px",
                    marginLeft:'50px',
                  }}
                >
                  <form onSubmit={handleSubmit} style={{ paddingTop: "40px" }}>
                    <div className="mb-3">
                      <label className="form-label">
                        Full Name{" "}
                        <span className="required" style={{ color: "#db2f23" }}>
                          *
                        </span>
                      </label>
                      <input
                        autoComplete="off"
                        className="form-control"
                        type="name"
                        name="fullname"
                        onChange={handleChange}
                        value={hname}
                        required
                      />
                      {err.fullname.length > 1 && (
                        <span className="text-danger">{err.fullname}</span>
                      )}
                      {/* {submitted && !values.fullname ? <span className="text-danger">please enter the fullname</span> : null} */}
                      {/* {submitted && !namevalid ?  <span className="text-danger">please enter only characters</span> : null} */}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNo" className="form-label">
                        Contact No.{" "}
                        <span className="required" style={{ color: "#db2f23" }}>
                          *
                        </span>
                      </label>
                      <input
                        autoComplete="off"
                        className="form-control"
                        type="phoneno"
                        name="phoneno"
                        onChange={handleChange}
                        value={hphone}
                        required
                      />
                      {err.phoneno.length > 1 && (
                        <span className="text-danger">{err.phoneno}</span>
                      )}
                      {/* {submitted && !values.phone ? <span className="text-danger">please enter the phone number</span> : null}
                      {submitted && phonevalid ? <span className="text-danger">please enter the valid phone number</span> : null} */}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label ">
                        Email address{" "}
                        <span className="required" style={{ color: "#db2f23" }}>
                          *
                        </span>
                      </label>
                      <input
                        autoComplete="off"
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={hemail}
                        required
                      />
                      {err.email.length > 1 && (
                        <span className="text-danger">{err.email}</span>
                      )}
                      {/* <input type='email' id='email' name='email' className={`input ${errors.email && 'is-danger'}`}  className="form-control" name = 'email'
                        onChange={handleChange}
                      /> */}

                      {/* {(submitted && !emailvalid) ? <span className="text-danger">please enter the valid email</span> : null} */}
                      
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                       
                        value={ticked}
                        defaultChecked={ticked}
                  onChange={handleChange}
                        required
                        name="tick"
                      />
                      <p className="form-check-label" htmlFor="exampleCheck1">
                        {" "}
                        I agree and consent to the{" "}
                        <u
                          
                          style={{ color:'#f27317', cursor: "pointer" }}
                          onClick={() => setModalShow(true)}
                        >
                          Terms and Conditions and Privacy Policy
                        </u>
                      </p>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                      {err.ticked.length > 1 && (
                        <span
                          className="text-danger"
                          style={{ display: "inline-block" }}
                        >
                          {err.ticked}
                        </span>
                      )}
                    </div>
                        {/* style={{ display: "flex", justifyContent: "center" }} */}
                    <div  style={{ display: "flex", justifyContent: "center" , flexDirection:'row'}} >
                      <button
                        
                        id="next-btn"
                        style={{ justifyContent: "center" }}
                        onClick={handleSubmit}
                      >
                        Create Will
                        {submitted ? (
                           
                           <Redirect to="/will-creator-tool"></Redirect>
                        ) : null}
                      </button>
                      
                    </div>
                    <div  style={{ display: "flex", justifyContent: "center" }} >
                    {fill.length > 1 && (
                        <span
                          className="text-danger"
                          style={{ display: "inline-block" , marginTop:'10px' }}
                        >
                          {fill}
                        </span>
                      )}
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Home;
