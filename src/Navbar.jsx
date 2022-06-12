import React, { useState } from 'react'
import { useEffect } from 'react'
import './navbar.css'
const Navbar = () => {
    const [show, handleShow] = useState(false)
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100){
                handleShow(true);
            }else{
                 handleShow(false)
            }
        });
        // return () =>{
        //     window.removeEventListener("scroll")
        // }
    },[]);

  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img className='nav__logo' src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="NetFlix Logo" />
        <img className='nav__avatar' src="https://i.pinimg.com/originals/3d/47/15/3d4715a01161fdbdd4c3bc3a262900d6.jpg" alt="Avatar Logo" />

    </div>
  )
}

export default Navbar