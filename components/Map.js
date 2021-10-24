import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  // Create the latitude longitude object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // Get the center of the coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/paulochieng/ckv4r1td50bpv14odseeq92mo'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}>
      {searchResults.map((result) => (
        <div className='' key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}>
            <p
              className='cursor-pointer animate-bounce'
              onClick={() => setSelectedLocation(result)}
              aria-label='push-pin'>
              📌
            </p>
          </Marker>
          {/* Pop-up should show when marker is clicked */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}>
              <div className=' rounded-md'>{result.title}</div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
