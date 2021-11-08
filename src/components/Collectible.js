import React from 'react'
import '../styles/App.css';


const Collectible = (props) => {
    return (
        <>
            <div className='container_collectible'>
                <img src={props.asset_photo_a} alt='' />
                <div className={
                    (props.asset_name_a && (props.asset_name_a).length > 15) ? 'group-long' :
                        'group-short'
                }
                >{props.asset_name_a && props.asset_name_a}</div>
                <div className='artist'>by{' ' + props.asset_artist_a}</div>
                <div className='price-nf'>${props.asset_price_a}</div>
                <hr className='line-collectible' />
                <div className='drop'> Drops in  <br /> 2d 1h 23m 1s </div>
                <div className='mint'>Mint Amount  <br /> 100,000</div>
            </div>

        </>
    )
}

export default Collectible;