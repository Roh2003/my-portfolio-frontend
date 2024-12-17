import React from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter   } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
        <>
        <div>
        <div className='grid grid-cols-1  gap-10 bg-slate-900 py-10 sm:grid-cols-3 sm:gap-2'>

            <div className='bg-purple flex justify-start items-center flex-col mx-10'>
                <h1 className='text-3xl pb-0 text-white font-sans font-semibold hover:pb-'>Rohit's Portfolio</h1>
                <br />
                <p className='text-[17px] text-white text-center px-5 '>Thanks For Visiting My Perosnal Portfoilo Website. connect with me form over deatails.</p>
            </div>

            <div className='bg-purple- flex justify-start items-center flex-col mx-10'>
                <h1 className='text-3xl text-white font-sans font-semibold'>Quick Links</h1>
                <br />
                <ul className='text-[17px] text-white text-center '>
                    <li className='hover:text-orange-400'>Home</li>
                    <li className='hover:text-orange-400'>About me</li>
                    <li className='hover:text-orange-400'>Education</li>
                    <li className='hover:text-orange-400'>Skils</li>
                    <li className='hover:text-orange-400'>Projects</li>
                </ul>
            </div>
            <div className='bg-purple- flex justify-start items-center flex-col mx-10'>
                <h1 className='text-3xl text-white font-sans font-semibold items-start'>Contact Info</h1>
                <br />
                <ul className='text-[17px] text-white text-center grid gap-2'>
                <li className='hover:text-orange-400'>+91 772-2014-336</li>
                <li className='hover:text-orange-400'>Soundrohit632@gmail.com</li>
                <li className='hover:text-orange-400'>Mumbai, India-401305</li>
                </ul>
            </div>
        </div>

            

        <div className='text-center relative bg-slate-900 pb-5'>
            <h1 className='text-center text-white text-[17px] '>Disigned with lot's of love by <span className='text-orange-300 font-semibold'>Rohit Saundalkar</span></h1>
        </div>

        </div>
        
        
        
        
        
        </>
    )
}

export default Footer
