import React from 'react';
import { Link } from 'react-router-dom';
function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
         <ul className='navbar-nav'>
         <li className='nav-item'>
             <Link className='nav-link' to="/">
                 Home
             </Link>
         </li>
         <li className='nav-item'>
             <Link className='nav-link' to="/customer">
                 Customer
             </Link>
         </li>
         <li className='nav-item'>
             <Link className='nav-link' to="/property">
                 Property
             </Link>
         </li>
         <li className='nav-item'>
             <Link className='nav-link' to="/sales">
                 Sales
             </Link>
         </li>
         <li className='nav-item'>
             <Link className='nav-link' to="/sample">
                 Sample
             </Link>
         </li>
         </ul>
        </nav>
  );
}

export default Navbar;