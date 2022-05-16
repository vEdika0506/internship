import React from "react";
const Info = () => {
  return (
    <>
      <div className="my-5" style={{ borderBottom: "2px solid grey" }}>
        <div className="card mb-3" style={{ border: "none" }}>
          <div
            className="embed-responsive embed-responsive-16by9"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <iframe
              width="550px"
              height="300px"
              title="Embeds Page"
              className="embed-responsive-item"
              src="https://youtu.be/uoTAVsSeMnY"
              allowFullScreen
              style={{ marginTop: "15px", borderRadius: "13px" }}
            ></iframe>
          </div>
          <div className="card-body">
            <h1
              className="card-title"
              style={{
                marginTop: "5px",
                textAlign: "center",
                color: "#0072bc",
                fontWeight:'700'
              }}
            >
              {" "}
              Why Make a Will?
            </h1>
            <p
              className="card-text"
              style={{
                marginTop: "5px",
                textAlign: "center",
                justifyContent: "center",
                color: "grey",
              }}
            >
              A person should make a WILL, as it not only helps to distribute
              his property according to his wishes but also ensures the interest
              of the people you care about is taken care of after your death.
            </p>
            <p
              className="card-text"
              style={{
                marginTop: "5px",
                textAlign: "center",
                justifyContent: "center",
                color: "grey",
              }}
            >
              {" "}
              PANDEMIC has shown that life is uncertain, therefore it is
              necessary to define who should inherit your hardened belongings
              and assets after you pass away.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
