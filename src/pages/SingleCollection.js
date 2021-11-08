import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import Collectible from "../components/Collectible";
import { Link } from "react-router-dom";

const SingleCollection = () => {

    const { collection_slug } = useParams();
    const [objAsset, setObjAsset] = useState([]);
    const [col_banner, setC_banner] = useState('');


    useEffect(() => {
        /***collection start fetch */
        fetch(`https://api.opensea.io/api/v1/collection/${collection_slug}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((e) => {
                setC_banner(e.collection.banner_image_url)

            })
            .catch((err) => {
                console.error(err)
            });
        /***collection end fetch */
        let newAsset;
        fetch(`https://api.opensea.io/api/v1/assets?collection=${collection_slug}&limit=50`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((nft) => {

                nft.assets.forEach(e => {
                    newAsset = {
                        asset_contract_address: e.asset_contract.address,
                        asset_token_id: e.token_id,
                        asset_photo: e.image_url,
                        asset_name: e.name,
                        asset_artist: e.creator.user.username,
                        asset_price: '4.5K'
                    };
                    objAsset[objAsset.length] = newAsset;
                    setObjAsset([...objAsset]);
                })
            })
            .catch((err) => {
                console.error(err)
            })

    }, [])

    return (
        <>
            {(col_banner.length !== 0 && objAsset.length !== 0) ? <table className='wrap'>
                <tbody>
                    <tr>
                        <td>
                            <Banner
                                banner_logo_a={col_banner}
                                banner_title_a={collection_slug}
                                banner_desc_a={'Verified NFT marketplace for music artists'}
                            />
                            <div className='cont-home-2'>
                                <div className='collectibles'>Collectibles</div >
                                <select name="cars" className='dropdown-h'>
                                    <option value="p">Popularity</option>
                                    <option value="c">Category</option>
                                    <option value="r">Recently added</option>
                                    <option value="a">Alphabetical</option>
                                    <option value="m">Most Active</option>
                                </select>
                                <div className='button-home'>View All</div>
                                <pre>
                                    <input type="radio" id="1" name="jeff" />
                                    <label htmlFor="1">Upcoming</label>
                                    <input type="radio" id="2" name="jeff" />
                                    <label htmlFor="2">Marketplace</label>
                                    <input type="radio" id="3" name="jeff" />
                                    <label htmlFor="3">Sounds</label>
                                    <input type="radio" id="4" name="jeff" />
                                    <label htmlFor="4">Generative</label>
                                </pre>
                                <hr className='line-home' />
                                <div className='mini-nav-2-c'>
                                    <div className='grid-2'>
                                        {objAsset.length === 0 ? <p>This collection has no assets found</p> :

                                            objAsset?.map(e => (
                                                <Link className='link-home'
                                                    key={Math.random() + e.asset_name}
                                                    to={`/singleasset/${e.asset_contract_address}/${e.asset_token_id}`}>
                                                    < Collectible
                                                        key={Math.random() + e.asset_name}
                                                        asset_artist_a={e.asset_artist}
                                                        asset_price_a={e.asset_price}
                                                        asset_photo_a={e.asset_photo}
                                                        asset_name_a={e.asset_name}
                                                    />
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table> : <p>Please Wait...</p>}
        </>
    )
}
export default SingleCollection;