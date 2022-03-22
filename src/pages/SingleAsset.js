import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import NewBid from '../components/NewBid';

const SingleAsset = () => {
  const { asset_token_address, asset_token_id } = useParams();

  const [myAssetObj, setIt] = useState([]);
  const [bidList, setBidList] = useState([]);
  const [userBid, setUserBid] = useState('');

  useEffect(() => {
    let newAs;
    fetch(
      `https://api.opensea.io/api/v1/asset/${asset_token_address}/${asset_token_id}/`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((a) => {
        let tmp_curr_bid;
        let tmp_bid_end;
        console.log(a.orders);
        if (a.orders === null) {
          tmp_curr_bid = '4562';
          tmp_bid_end = 'Open';
        } else {
          tmp_curr_bid =
            parseInt(a.orders[0].current_price.substring(0, 2), 10) *
            0.1 *
            4562;
          a.orders[0].closing_date === null
            ? (tmp_bid_end = 'Open')
            : (tmp_bid_end = a.orders[0].closing_date);
        }
        newAs = {
          asset_logo_single: a.image_url,
          asset_name_single: a.name,
          asset_coll_name: a.collection.name,
          asset_description: a.description,
          asset_contract_address_single: a.asset_contract.address,
          asset_token_id: a.token_id,
          asset_block_chain: 'Ethereum',
          asset_starting_bid: '4562',
          asset_current_bid: tmp_curr_bid,
          asset_bid_ends: tmp_bid_end,
          asset_name_slug: a.collection.slug,
        };
        setIt(newAs);
      });
  }, []);

  const handleUserInput = (e) => {
    setUserBid(e.target.value);
  };
  const handleBidding = (e) => {
    e.preventDefault();
    let d = new Date();
    let str = d.getMonth() + 1 + '-' + d.getUTCDate() + '-' + d.getFullYear();

    bidList[bidList.length] = {
      bid_id: Math.random() + myAssetObj.asset_name_single,
      bid_asset_name: myAssetObj.asset_name_single,
      bid_asset_img: myAssetObj.asset_logo_single,
      bid_amount: userBid,
      bid_start_date: str,
      bid_duration: '5 Months from starting date',
    };
    setBidList([...bidList]);
  };

  return (
    <>
      {myAssetObj.length !== 0 ? (
        <table className="wrap">
          <tbody>
            <tr>
              <td>
                <Banner
                  banner_logo_a={myAssetObj.asset_logo_single}
                  banner_title_a={myAssetObj.asset_name_single}
                  banner_desc_a={'Collection: ' + myAssetObj.asset_coll_name}
                />
                <div className="single-asset-wrapper">
                  <div className="bid-title">
                    {myAssetObj.asset_coll_name + ' Collection'}
                  </div>
                  <div
                    className={
                      myAssetObj.asset_name_single &&
                      myAssetObj.asset_name_single.length > 15
                        ? 'bid-asset-name-long'
                        : 'bid-asset-name-short'
                    }
                  >
                    {myAssetObj.asset_name_single}
                  </div>
                  <div className="bid-logo-frame">
                    <img
                      src={myAssetObj.asset_logo_single}
                      alt=""
                      className="bid-asset-logo"
                    />
                  </div>
                  <div className="asset-bid-info">
                    <div className="bid-ends">Bid Ends in</div>
                    <div className="expire-bid-time">
                      {myAssetObj.asset_bid_ends.substring(0, 10)}
                    </div>
                    <div className="current-bid">
                      Current Bid
                      <br />${myAssetObj.asset_current_bid}
                    </div>
                    <div className="starting-bid">
                      Starting Bid
                      <br />${myAssetObj.asset_starting_bid}
                    </div>
                  </div>
                  <form onSubmit={handleBidding}>
                    <input
                      required
                      type="number"
                      placeholder="enter dollar $"
                      className="bid-text-input"
                      onChange={handleUserInput}
                    />
                    <input
                      className="bidding-clickable"
                      type="submit"
                      value="Place Bid"
                    />
                  </form>
                  <div className="asset-desc">
                    <div className="bid-details-desc">
                      Description:
                      <br />
                      {myAssetObj.asset_description}
                    </div>
                    <div className="bid-details-info">
                      Details:
                      <br />
                      Contract Address
                      <br />
                      TokenID
                      <br />
                      Blockchain
                    </div>
                    <div className="bid-details-data">
                      {myAssetObj.asset_contract_address_single}
                      <br />
                      {myAssetObj.asset_token_id}
                      <br />
                      {myAssetObj.asset_block_chain}
                    </div>
                  </div>
                </div>
                <div className="bids-wrapper">
                  <NewBid bids={bidList} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Please Wait...</p>
      )}
    </>
  );
};
export default SingleAsset;
