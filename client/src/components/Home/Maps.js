import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

import deal from "../../assets/deal.png";
import service from "../../assets/service.png";
import { useSelector, useDispatch } from 'react-redux';
import { updatePosition } from '../../actions/userActions';

import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "font-awesome/css/font-awesome.min.css";
import { UidContext } from '../AppContext';
import Article from '../Post/Article';



// SetView Component
// this function handles the view and helps setting it to the user position on the map
function SetView({ coords, showArticle }) {
    const map = useMap();
    const uid = useContext(UidContext);



    if (uid) {
        map.setView(coords, 15);
    } else {
        if (showArticle === "") {
            map.setView(coords);
        } else {
            map.setView(coords);
        }
    }

    return null;
}

// Map Component
const Maps = ({ postActive, searchValue }) => {

    const dispatch = useDispatch();
    // Get the default position of the user from the db [36.6,3]
    const userData = useSelector((state) => state.userReducer);
    // this is availible if user is connected else it's undifiend
    const uid = useContext(UidContext);

    const posts = useSelector((state) => state.postReducer);

    const [currentPos, setCurrentPos] = useState();
    const [defPos, setDefPos] = useState();

    useEffect(() => {
        if (uid) {
            setCurrentPos(userData.position);
        } else {
            setDefPos([36.737232, 3.086472])
        }

    }, [userData.position, currentPos, postActive, uid])



    // "map" is a variable the contains info about our current map
    const [map, setMap] = useState(null);
    const [showArticle, setShowArticle] = useState("");
    const handleArticleClose = () => { setShowArticle("") };

    const dealIcon = L.icon({
        iconSize: [35, 35],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: deal,
        shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    });

    const serviceIcon = L.icon({
        iconSize: [35, 35],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: service,
        shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    });




    // runs when find me button is clicked
    const handleLocation = () => {
        // checking if the geolocalisation is activated in the browser
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === "denied") {
                alert("Please Turn On The Geolocation !");
            } else {
                map.locate().on("locationfound", function (e) {
                    // moving to the user location
                    // zooming is 16
                    map.flyTo(e.latlng, 16);
                    if (uid) {
                        // dispatch method calls the method updatePosition when the button "find me" is clicked
                        dispatch(updatePosition(uid, [e.latlng.lat, e.latlng.lng]));
                    }

                })
            }
        })

    }

    //searchValue !== "" && console.log(searchValue)

    return (
        <>
            <div className="map-container">
                <MapContainer center={[36.737232, 3.086472]} zoom={10} className="map" whenCreated={setMap}>
                    <TileLayer className="tilelayer"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=32OKW7r6i0B8vaP8XCEh"
                    />
                    {
                        posts.length > 0 && searchValue === "" && posts.map((post) => {
                            var LatLng = post.cord[0].split(",")
                            var Lat = parseFloat(LatLng[0]);
                            var Lng = parseFloat(LatLng[1]);
                            if (post.postType === "deal") {
                                return <Marker className="marker"
                                    key={post._id}
                                    position={[Lat, Lng]}
                                    icon={dealIcon}
                                    eventHandlers={{
                                        click: (e) => {
                                            if (uid) {
                                                currentPos[0] = e.latlng.lat;
                                                currentPos[1] = e.latlng.lng;
                                            } else {
                                                defPos[0] = e.latlng.lat;
                                                defPos[1] = e.latlng.lng;
                                            }
                                            setShowArticle(post._id);
                                        },
                                        mouseover: (e) => {
                                            e.target.openPopup();
                                        },
                                        mouseout: (e) => {
                                            e.target.closePopup();
                                        }
                                    }}>
                                    <Popup>
                                        <h4>{post.title}</h4>

                                        {post.picture && (
                                            <>
                                                <br />
                                                <img height="80px"
                                                    width="130px"
                                                    src={post.picture} alt="postpic" />
                                            </>
                                        )}
                                        <br />
                                        <h4>Price: {post.price}</h4>
                                    </Popup>
                                </Marker>;
                            } else {
                                return <Marker className="marker"
                                    key={post._id}
                                    position={[Lat, Lng]}
                                    icon={serviceIcon}
                                    eventHandlers={{
                                        click: (e) => {
                                            if (uid) {
                                                currentPos[0] = e.latlng.lat;
                                                currentPos[1] = e.latlng.lng;
                                            } else {
                                                defPos[0] = e.latlng.lat;
                                                defPos[1] = e.latlng.lng;
                                            }
                                            setShowArticle(post._id);
                                        },
                                        mouseover: (e) => {
                                            e.target.openPopup();
                                        },
                                        mouseout: (e) => {
                                            e.target.closePopup();
                                        }
                                    }}>
                                    <Popup>
                                        <h4>{post.title}</h4>

                                        {post.picture && (
                                            <>
                                                <br />
                                                <img height="80px"
                                                    width="130px"
                                                    src={post.picture}
                                                    alt="postpic" />
                                            </>
                                        )}
                                        <br />
                                        <h4>Price: {post.price}</h4>
                                    </Popup>
                                </Marker>;
                            }

                        }
                        )
                    }

                    {
                        posts.length > 0 && searchValue !== "" && posts.map((post) => {

                            if (post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                                post.tags.toLowerCase().split().some(e => e.includes(searchValue.toLowerCase()))) {

                                var LatLng = post.cord[0].split(",")
                                var Lat = parseFloat(LatLng[0]);
                                var Lng = parseFloat(LatLng[1]);
                                if (post.postType === "deal") {
                                    return <Marker className="marker"
                                        key={post._id}
                                        position={[Lat, Lng]}
                                        icon={dealIcon}
                                        eventHandlers={{
                                            click: (e) => {
                                                if (uid) {
                                                    currentPos[0] = e.latlng.lat;
                                                    currentPos[1] = e.latlng.lng;
                                                } else {
                                                    defPos[0] = e.latlng.lat;
                                                    defPos[1] = e.latlng.lng;
                                                }
                                                setShowArticle(post._id);
                                            },
                                            mouseover: (e) => {
                                                e.target.openPopup();
                                            },
                                            mouseout: (e) => {
                                                e.target.closePopup();
                                            }
                                        }}>
                                        <Popup>
                                            <h4>{post.title}</h4>

                                            {post.picture && (
                                                <>
                                                    <br />
                                                    <img height="80px"
                                                        width="130px"
                                                        src={post.picture} alt="postpic" />
                                                </>
                                            )}
                                            <br />
                                            <h4>Price: {post.price}</h4>
                                        </Popup>
                                    </Marker>;
                                } else {
                                    return <Marker className="marker"
                                        key={post._id}
                                        position={[Lat, Lng]}
                                        icon={serviceIcon}
                                        eventHandlers={{
                                            click: (e) => {
                                                if (uid) {
                                                    currentPos[0] = e.latlng.lat;
                                                    currentPos[1] = e.latlng.lng;
                                                } else {
                                                    defPos[0] = e.latlng.lat;
                                                    defPos[1] = e.latlng.lng;
                                                }
                                                setShowArticle(post._id);
                                            },
                                            mouseover: (e) => {
                                                e.target.openPopup();
                                            },
                                            mouseout: (e) => {
                                                e.target.closePopup();
                                            }
                                        }}>
                                        <Popup>
                                            <h4>{post.title}</h4>

                                            {post.picture && (
                                                <>
                                                    <br />
                                                    <img height="80px"
                                                        width="130px"
                                                        src={post.picture}
                                                        alt="postpic" />
                                                </>
                                            )}
                                            <br />
                                            <h4>Price: {post.price}</h4>
                                        </Popup>
                                    </Marker>;
                                }

                            } else {
                                return <div key={post._id}></div>
                            }

                        }
                        )
                    }
                    <SetView coords={currentPos || defPos} showArticle={showArticle} />
                </MapContainer>
                <button className="location-button" onClick={handleLocation}>Find me</button>
            </div>
            {showArticle !== "" && (<Article handleArticleClose={handleArticleClose} postId={showArticle} />)}
        </>
    )
}

export default Maps;