import React from 'react'
import Home from './Home';
import Service from './Service';
import Info from './Info';
import Faq from './Faq';
import Contact from './Contact';
import Disclaimer from './Disclaimer';
import './fullscreen.css';
const Fullscreen = () => {
    return (
        <>
            <Home/>
            <Service />
            <Info/>
            <Faq/>
            <Contact/>
            <Disclaimer/>
        </>
    )
}

export default Fullscreen
