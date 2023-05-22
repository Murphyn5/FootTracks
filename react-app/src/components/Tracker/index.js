// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Tracker.css";
import { useTracker } from "../../context/TrackerContext";

function Tracker() {

    const {
        trackerDistance,
        setTrackerDistance,
        trackerDuration,
        setTrackerDuration,
        trackerCoordinates,
        setTrackerCoordinates,
        trackerElevation,
        setTrackerElevation } = useTracker()
        let segmentDistance = 0




    const history = useHistory()
    // const [altitudes, setAltitudes] = useState([])
    // const [altitudeGain, setAltitudeGain] = useState(0)


    useEffect(() => {

        function distance(lat1, lon1, lat2, lon2, unit) {
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1 / 180;
                var radlat2 = Math.PI * lat2 / 180;
                var theta = lon1 - lon2;
                var radtheta = Math.PI * theta / 180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit == "K") { dist = dist * 1.609344 }
                if (unit == "N") { dist = dist * 0.8684 }
                return dist;
            }
        }

        const L = window.L




        const LONDON_CENTRE_LAT_LNG = [51.505, -0.09];
        const HIGH_ACCURACY = true;
        const LOW_ACCURACY = false;
        const MAX_CACHE_AGE_MILLISECOND = 30000;
        const MAX_NEW_POSITION_MILLISECOND = 5000;



        let map = L.map("tracker").setView(LONDON_CENTRE_LAT_LNG, 13);
        let isStart = null;
        let path = null;
        let accumulatedDistance = 0;
        let currentMarker = null;
        let coordinates = []
        let altitudes = []
        let altitudeGain = 0
        const logConsole = document.querySelector('#log-console');
        const distanceBox = document.querySelector('#distance-box');

        const trackOptions = {
            enableHighAccuracy: HIGH_ACCURACY,
            maximumAge: MAX_CACHE_AGE_MILLISECOND,
            timeout: MAX_NEW_POSITION_MILLISECOND,
        };



        L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken:
                    "pk.eyJ1IjoibTQxaGlnaHdheSIsImEiOiJja295ZjQya2wwaTkxMnFtY203Z21wNjhzIn0.uF1S6TqlDfW7wmQ17Kp4NQ",
            }
        ).addTo(map);

        const startTracking = () => {
            if (!navigator.geolocation) {
                logConsole.textContent = 'Geolocation is not supported by your browser';
            } else {
                logConsole.textContent = 'Locating ...';
                distanceBox.textContent = '0.000';

                return navigator.geolocation.watchPosition(success, error, trackOptions);
            }
        }



        const asyncElevation = async (latitude, longitude) => {
            async function getElevation() {
                // Construct the API request.
                const query = await fetch(
                    `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${longitude},${latitude}.json?layers=contour&limit=50&access_token=pk.eyJ1IjoibTQxaGlnaHdheSIsImEiOiJja295ZjQya2wwaTkxMnFtY203Z21wNjhzIn0.uF1S6TqlDfW7wmQ17Kp4NQ`,
                    { method: 'GET' }
                );
                if (query.status !== 200) return;
                const data = await query.json();
                // Get all the returned features.
                const allFeatures = data.features;

                // For each returned feature, add elevation data to the elevations array.
                const elevations = allFeatures.map((feature) => feature.properties.ele);

                // In the elevations array, find the largest value.
                const highestElevation = Math.max(...elevations);
                return highestElevation
            }
            const altitude = await getElevation()
            altitudes.push(altitude)
            if (altitudes.length > 1) {
                if (altitudes[-1] > altitudes[-2]) {
                    altitudeGain += altitudes[-1] - altitudes[-2]
                }
            }
            return altitude
        }


        const updateMap = (event) => {

            const { latitude, longitude, timestamp, accuracy, altitudeAccuracy, heading, speed } = event.detail;
            asyncElevation(latitude, longitude)

            report(`2. Received lat: ${latitude} | lng: ${longitude} | accuracy: ${accuracy} | altitude: ${altitudeGain} | altitudeAccuracy ${altitudeAccuracy} | heading: ${heading} | speed: ${speed} | timestamp: ${timestamp}`);
            if(segmentDistance >= .1){
                coordinates.push(`${latitude},${longitude}`)
                segmentDistance = 0
            }
            drawNewSegment(event.detail)
                .then((detail) => drawNewMarker(detail))
                .then((detail) => refreshMeter(detail))
        }

        const drawNewSegment = (detail) => {

            const { latitude, longitude } = detail;

            return new Promise((resolve) => {
                if (path == null) {

                    path = L.polyline([
                        [latitude, longitude],
                    ], {
                        color: '#fbc531',
                        bubblingMouseEvents: true
                    }).addTo(map);

                    map.setView([latitude, longitude], 15)
                    map.fitBounds(path.getBounds());

                } else {

                    if (isStart === true) {

                        path._latlngs.push([latitude, longitude]);
                        path.redraw();

                    }
                }

                return resolve(detail);
            })
        }

        const drawNewMarker = (detail) => {
            const { latitude, longitude, timestamp } = detail;

            return new Promise((resolve) => {

                if (!isStart) return (resolve(detail))

                if (currentMarker == null) {
                    const marker = L.marker([latitude, longitude]).addTo(map);
                    marker.bindPopup(`<b>Start at ${timestamp}</b>`);

                    currentMarker = L.marker([latitude, longitude]).addTo(map);
                } else {
                    currentMarker.bindPopup(`Current at ${timestamp}`)
                    currentMarker.setLatLng(new L.LatLng(latitude, longitude));
                }

                return resolve(detail);
            })
        }

        const refreshMeter = (detail) => {
            return new Promise((resolve) => {

                if (path == null) return resolve(detail);

                if (!isStart) return resolve(detail);

                const delta = calculateDelta(path._latlngs)
                accumulatedDistance += delta;
                segmentDistance += delta;


                const formattedDistance = (round(accumulatedDistance, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
                distanceBox.textContent = formattedDistance;
                report(`3. Updated path with ${delta} km | accumulatedDistance = ${formattedDistance}`);

                return resolve(detail);
            })
        }

        const success = (position) => {
            const { latitude, longitude } = position.coords;
            const timestamp = (new Date(Date.now())).toISOString();

            report(`1. Detected at ${timestamp}`);

            createNewEvent(latitude, longitude, timestamp);
        }

        const error = (err) => report(`Unable to retrieve your location! ${err.code} - ${err.message}`);

        const report = (message) => logConsole.innerHTML += `<br /> ${message}`;

        const createNewEvent = (latitude, longitude, timestamp) => {
            const geoEvent = new CustomEvent("GEO_EVENT", {
                detail: {
                    latitude,
                    longitude,
                    timestamp,
                },
                bubbles: true,
                cancelable: true,
                composed: false,
            });

            if (document.querySelector("#tracker")) {
                document.querySelector("#tracker").dispatchEvent(geoEvent);
                if (document.getElementById("toggle")) {
                    document.getElementById("toggle").disabled = false
                }
            }
        }
        let startTime
        let endTime

        const toggle = () => {
            if (isStart === null) {
                isStart = true;
                startTracking();
                startTime = Date.now();
                document.getElementById("toggle").disabled = true
            } else {
                const eventRemove = async () => {
                    await document.querySelector("#tracker")
                        .removeEventListener("GEO_EVENT", updateMap);
                }
                eventRemove()



                isStart = !isStart;
                endTime = Date.now()

                setTrackerDistance(accumulatedDistance * 0.621371)
                setTrackerElevation(altitudeGain)
                setTrackerCoordinates(coordinates.join(";"))
                setTrackerDuration((endTime - startTime)/1000)

                history.push(`/tracker/summary`)

            }
        }

        const calculateDelta = (track) => {
            // Ignore the first object in the path array
            if (track.length >= 3) {
                const newIndex = track.length - 1;
                const newLatLng = track[newIndex];
                const lastLatLng = track[newIndex - 1];
                const latitude = 0;
                const longitude = 1;
                return distance(newLatLng[latitude], newLatLng[longitude], lastLatLng[latitude], lastLatLng[longitude], 'K');
            } else {
                return 0;
            }
        }

        const round = (num, places) => {
            return +(parseFloat(num).toFixed(places));
        }


        document.querySelector("#tracker")
            .addEventListener("GEO_EVENT", updateMap);

        document.getElementById("toggle").onclick = toggle




    }, [history]);

    const openNav = () => document.getElementById("myNav").style.width = "100%";
    const closeNav = () => document.getElementById("myNav").style.width = "0%";

    return (
        <>
            <div id="tracker"></div>
            <div className="track-control">
                <label className="switch">
                    <input type="checkbox" id="toggle" />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="log-control">
                {/* <div className="" onClick={openNav}><i className="fa fa-wrench log"></i></div> */}
            </div>
            <div className="meter-control">
                <div className="meter-look glow">
                    <span><i className="fa fa-road"></i></span>
                    <span id="distance-box">0.000</span>
                    <span>km</span>
                </div>
            </div>

            <div id="myNav" className="overlay">
                <div className="sticky" onClick={closeNav}>
                    <div className="closebtn"
                    >&times;</div>
                </div>
                <div className="overlay-content">
                    <div id="log-console"></div>
                </div>
            </div>
        </>
    );
}


export default Tracker;
