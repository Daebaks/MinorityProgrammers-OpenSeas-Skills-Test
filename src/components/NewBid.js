import React from "react";
import '../styles/App.css';


const NewBid = ({ bids }) => {

    return (
        <>
            <div className='list-bids'>
                {bids.map(e => (
                    <div key={e.bid_id} className='bid-preview'>
                        <img src={e.bid_asset_img} width="15%" height="24%" alt='' className='bid-img' />
                        <div className='bid-details-user'>
                            Asset: {e.bid_asset_name}<br />
                            Bid Amount: {e.bid_amount}<br />
                            Starting Date: {e.bid_start_date}<br />
                            Bid Duration: {e.bid_duration}
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default NewBid;