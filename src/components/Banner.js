import React from 'react'
import '../styles/App.css';

const Banner = (props) => {
    return (
        <>
            <div className='cc'>
                <img src={props.banner_logo_a} alt='' />
                <div className='banner-title'>{props.banner_title_a}</div>
                <div className='banner-desc'>
                    {props.banner_desc_a}
                </div>
            </div>
        </>
    )
}

export default Banner;