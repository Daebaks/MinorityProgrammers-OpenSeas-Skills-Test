import React from 'react'
import '../styles/App.css';


const Collection = (props) => {
    return (
        <div className='cont'>
            <div className='title'>{props.collection_name_a}</div>
            <hr className='line-collection' />
            <div className='price'>Floor Price </div>
            <div className='_price'>${props.collection_price_a} </div>
            <div className='volume'>Volume</div>
            <div className='_volume'>${props.collection_volume_a}</div>
            <img src={props.collection_photo_a} alt='' />
        </div>
    )
}

export default Collection;