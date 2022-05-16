import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
const Disclaimer = () => {
  return (
    <>
      <MDBFooter color="blue" className="font-small pt-4 mt-4" style={{borderTop:'2px solid grey', marginTop:'10px'}}>
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow style={{ justifyContent: 'center' }}>
            <MDBCol md="10"  style={{color:'grey'}}>
              <h3 className="title">Disclaimer</h3>
              <p>
                Bajaj Allianz Life Insurance Company Ltd. has taken an initiative to provide Will
                writing services for general users. Bajaj Allianz Life Insurance Company Ltd. provides services
                for making a WILL through a tie up with a third-party expert. Users may avail Will writing
                services from multiple service providers. Bajaj Allianz Life Insurance Company Ltd. will not share
                any data with the third party expert and the third party expert does not store any data. It is
                user&#39;s sole discretion to avail Will writing service and all interactions shall be directly with the
                third party expert without Bajaj Allianz Life Insurance Company Ltd’s intervention. Bajaj Allianz
                Life Insurance Company Ltd. may modify/suspend/withdraw this arrangement offered at its
                sole discretion. Bajaj Allianz Life Insurance Company Ltd. shall not be responsible for user’s
                decision to buy/opt for the third party expert&#39;s services or for any deficiency in this
                arrangement.
              </p>
            </MDBCol>

          </MDBRow>
        </MDBContainer>

      </MDBFooter>
    </>
  )
}

export default Disclaimer



