import React from 'react'
import aest from '../../static/aest.jpg'
import { VscDebugBreakpointData } from 'react-icons/vsc';
const Pointstoremember = () => {
    return (
        <>
            <div className='my-5' style={{ marginTop: '50px', borderBottom: '2px solid grey' }}>


                <div className='container-fluid mb-5'>
                    <div className='row'>
                        <div className='col-10 mx-auto'>
                            <div className='row'>
                                <div className='col-md-4 col-10 mx-auto'>
                                    <img src={aest} alt='' />


                                </div>
                                <div className='col-md-4 col-10 mx-auto'>
                                    <h1 style={{ marginTop: '100px' }}> Points to Remember</h1>
                                    <div className='content' style={{ marginTop: '55px' }}>
                                        <p style={{ fontSize: '1rem' }}><VscDebugBreakpointData /> A Will can be printed on a plain paper without the need of stamp paper or notary.</p>
                                        <p style={{ fontSize: '1.1rem' }}><VscDebugBreakpointData /> Registration of a Will is not compulsory.</p>
                                        <p style={{ fontSize: '1.1rem' }}><VscDebugBreakpointData /> The Will has to be signed in front of two witnesses and vice-versa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Pointstoremember
