import React, { Component } from "react";
import "./faq.css";
import Check from '../../static/check.png'

export default class App extends Component {
  render() {
    return (
      <>
        <div className="my-5">
          <h1 className="text-center">
            {" "}
            <strong style={{ color: "#0072bc" }}>
              {" "}
              Frequently Asked Questions
            </strong>
          </h1>
        </div>
        <div
          className="container-fluid mb-5"
          style={{ borderBottom: "2px solid grey", paddingBottom: "50px" }}
        >
          <div className="row">
          <div class="col-md-8 mx-auto">
    
      <div class="d-sm-flex align-items-start mb-4" style={{margin:'0px', padding:'0px'}}>
        <div class="d-none d-sm-flex flex-column align-items-center mr-4">
          <div class="p-1 " >
           <img src={Check} alt="tick" />
          </div>
        
        </div>
        <div class="p-2  text-dark">
          <p class="mb-0">Who can be named as Executor in the Will?</p>
          <p class = 'mb-0' style={{color:'#666362'}}>"An executor can be the beneficiary or any person whom the person making a Will trusts viz. Friends, relatives, etc. An executor is responsible to carry out the wishes of the person making a WILL after he passes away. ",
    </p>
        </div>
        
      </div>
      <div class="d-sm-flex align-items-start mb-4" style={{margin:'0px', padding:'0px'}}>
        <div class="d-none d-sm-flex flex-column align-items-center mr-4">
          <div class="p-1 " >
           <img src={Check} alt="tick"/>
          </div>
        
        </div>
        <div class="p-2  text-dark">
          <p class="mb-0">What is the difference between beneficiary and nominee?</p>
          <p class = 'mb-0' style={{color:'#666362'}}>Nominee is a Trustee of the property and does not get title over the property, whereas a beneficiary is a person who becomes the owner and is entitled to the property bequeathed to him under WILL</p>
        </div>
        
      </div>
      <div class="d-sm-flex align-items-start mb-4" style={{margin:'0px', padding:'0px'}}>
        <div class="d-none d-sm-flex flex-column align-items-center mr-4">
          <div class="p-1 " >
           <img src={Check} alt="tick" />
          </div>
        
        </div>
        <div class="p-2  text-dark">
          <p class="mb-0">Who are the parties to a Will?</p>
          <p class = 'mb-0' style={{color:'#666362'}}> i) Testator - A person who makes Will
      <span style={{display:'block'}}>ii)Executor/s - A person/s appointed by the testator, to ensure that the assets are distributed as desired by him/ her in the WILL.</span>
      <span style={{display:'block'}}>iii)Witnesses - There has to be two witnesses who shall sign the Will of the testator in front of him and the testator shall sign in front of these witnesses. These witnesses can be friends, relatives except family members or beneficiaries.</span>
      <span style={{display:'block'}}>iv) Benificiary/s - The person who will get property of the Testator.</span></p>
        </div>
        
      </div>
      <div class="d-sm-flex align-items-start mb-4" style={{margin:'0px', padding:'0px'}}>
        <div class="d-none d-sm-flex flex-column align-items-center mr-4">
          <div class="p-1 " >
           <img src={Check} alt="tick" />
          </div>
        
        </div>
        <div class="p-2  text-dark">
          <p class="mb-0">Who can be witnesses to a Will?</p>
          <p class = 'mb-0' style={{color:'#666362'}}>Any relative, friend or any person whom you know and trust can be a Witness to your Will. The beneficiary of a Will cannot be a Witness to the same Will.</p>
        </div>
        
      </div>
      <div class="d-sm-flex align-items-start mb-4" style={{margin:'0px', padding:'0px'}}>
        <div class="d-none d-sm-flex flex-column align-items-center mr-4">
          <div class="p-1 " >
           <img src={Check} alt="tick" />
          </div>
        
        </div>
        <div class="p-2  text-dark">
          <p class="mb-0">Can joint properties be included under the Will?</p>
          <p class = 'mb-0' style={{color:'#666362'}}>Yes, a person owning a joint property can bequeath his share in the joint property in his WILL.</p>
        </div>
        
      </div>
      <div class="d-sm-flex align-items-start mb-4" style={{margin:'0px', padding:'0px'}}>
        <div class="d-none d-sm-flex flex-column align-items-center mr-4">
          <div class="p-1 " >
           <img src={Check} alt="tick" />
          </div>
        
        </div>
        <div class="p-2  text-dark">
          <p class="mb-0">Can beneficiaries in a Will sign as witnesses?</p>
          <p class = 'mb-0' style={{color:'#666362'}}>No. The witnesses to a Will cannot get any benefits out of the Will.</p>
        </div>
        
      </div>
      <div class="d-sm-flex align-items-start mb-4" style={{margin:'0px', padding:'0px'}}>
        <div class="d-none d-sm-flex flex-column align-items-center mr-4">
          <div class="p-1 " >
           <img src={Check} alt="tick"/>
          </div>
        
        </div>
        <div class="p-2  text-dark">
          <p class="mb-0">Can a person cancel or change his Will?</p>
          <p class = 'mb-0' style={{color:'#666362'}}>Yes. At anytime a person can amend his Will during his lifetime either by executing a codicil or by making a new one. By making a new Will shall revoke the earlier one. The person&#39;s last WILL shall be considered.</p>
        </div>
        
      </div>
      <div class="d-sm-flex align-items-start mb-4" style={{margin:'0px', padding:'0px'}}>
        <div class="d-none d-sm-flex flex-column align-items-center mr-4">
          <div class="p-1 " >
           <img src={Check} alt="tick" />
          </div>
        
        </div>
        <div class="p-2  text-dark">
          <p class="mb-0">Can rented property be included in a Will?</p>
          <p class = 'mb-0' style={{color:'#666362'}}>No. Rented property cannot be disposed of by a Will.</p>
        </div>
        
      </div>
     
            {/* <div className="col-8 mx-auto">
              <div className="row justify-content-center">
                <Faq data={data} styles={styles} config={config} />
                <div className="col-md-7 col-10 mx-auto">
                  <div className="row ">
                    <div className="col-xl-10"></div>
                  </div>
                </div>
              </div>
            </div> */}
         
        </div>
        </div>
        </div>
      </>
    );
  }
}
