import React from "react";
import { Link } from "react-router-dom"
import '../styles/App.css';

const About = () => {
    return (
        <>
            <div className="wrong-or-about">
                <p>This is about us page. This app was created by Ali Alrubaye.</p>
                <Link to="/"><p>GO TO HOME PAGE</p></Link>
            </div>
        </>
    );
}

export default About;