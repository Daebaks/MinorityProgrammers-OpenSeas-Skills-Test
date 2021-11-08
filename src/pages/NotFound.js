import React from "react";
import { Link } from "react-router-dom"
import '../styles/App.css';

const NotFound = () => {
    return (
        <>
            <div className="wrong-or-about">
                <p>WHOOOPPPS...</p>
                <p>Page can not be found</p>
                <Link to="/"><p>GO TO HOME PAGE</p></Link>
            </div>
        </>
    );
}

export default NotFound;