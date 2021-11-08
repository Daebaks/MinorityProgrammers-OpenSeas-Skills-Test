import { Link } from "react-router-dom";
import React from "react";
import '../styles/App.css';
import logo from '../media/MUSISWAP.png'
import { useHistory } from "react-router-dom";


const Navbar = () => {
    const history = useHistory();
    return (
        <nav className="navbar">
            <div className='nav-home' onClick={() => history.push('/')}>Home</div>
            <Link to={'/'}>
                <img src={logo} alt='' />
            </Link>

            <div className='nav-home' onClick={() => history.push('/about')}>About</div>

        </nav >
    );
}

export default Navbar;