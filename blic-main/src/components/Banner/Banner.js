import React from 'react'
import './Banner.css'
import Logo from './logo.jpg';
function Banner() {
    return (
        <>
        <div className='banner' >
        
   <div className= 'col-12' style={{marginTop:'0px !important', paddingTop:'0px'}}>
    
   <img src={Logo} alt="Logo" style={{transform:'scale(0.35)',float:'right',padddingTop:'20px'}} />
    
  </div>
        
        </div>

        </>
    )
}

export default Banner
