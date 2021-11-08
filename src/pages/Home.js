import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/App.css';
import Collection from "../components/Collection";
import Collectible from "../components/Collectible";
import Banner from "../components/Banner";
import logo from '../media/bannerHome.png'
const Home = () => {
    const [objAsset, setObjAsset] = useState([]);
    const [obj, setObj] = useState([]);
    useEffect(() => {
        const collections = ["shiny-rappers", "music-heroes", "kyoto-city", "cryptohiphopcrew"];
        collections.forEach((collection) => {

            /***assets start fetch */
            let newAsset;
            fetch(`https://api.opensea.io/api/v1/assets?collection=${collection}&limit=50`, {
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
                .catch((err) => console.error(err));
            /***assets end fetch */

            /***collection start fetch */
            let newCol;
            fetch(`https://api.opensea.io/api/v1/collection/${collection}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((nft) => {
                    newCol = {
                        collection_slug: nft.collection.slug,
                        collection_name: nft.collection.name,
                        collection_price: nft.collection.stats.floor_price,
                        collection_photo: nft.collection.featured_image_url,
                        collection_volume: nft.collection.stats.total_volume
                    };
                    obj[obj.length] = newCol;
                    setObj([...obj]);
                })
                .catch((err) => console.error(err));
            /*** collection end fetch*/
        });
    }, []);

    return (
        <>
            {(obj.length !== 0 && objAsset.length !== 0) ? <table className='wrap'>
                <tbody>
                    <tr>
                        <td>
                            <Banner
                                banner_logo_a={logo}
                                banner_title_a={'Collectibles'}
                                banner_desc_a={'Verified NFT marketplace for music artists'}
                            />
                            <div className='cont-home-1'>
                                <div className='top-collections'>Top Collection</div >
                                <div className='button-home'>View All</div>
                                <div className='mini-nav-1-c'>
                                    <div className='grid'>
                                        {obj?.map(e => (
                                            <Link className='link-home'
                                                key={Math.random() + e.collection_name}
                                                to={`/SingleCollection/${e.collection_slug}`}>
                                                < Collection
                                                    key={Math.random() + e.collection_name}
                                                    collection_name_a={e.collection_name}
                                                    collection_price_a={(Math.round(e.collection_price * 100) / 100).toFixed(4)}
                                                    collection_volume_a={(Math.round(e.collection_volume * 100) / 100).toFixed(2)}
                                                    collection_photo_a={e.collection_photo}
                                                />
                                            </Link>

                                        ))}
                                    </div>
                                </div>
                            </div>


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
                                        {objAsset?.map(e => (
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
    );
}

export default Home;