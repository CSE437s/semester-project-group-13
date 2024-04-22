import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import { Button, useTheme, Flex } from "@chakra-ui/react";
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = (props) => {
  const [map, setMap] = useState(null);
  const [coords, setCoordinates] = useState([]);
  const theme = useTheme();

  // Fetch Lat, Lon from db
  useEffect(() => {
    axios.get('http://localhost:8080/geocode')
        .then((response) => {
          const coordsFromApi = response.data.data.map((geocode) => ({
            latitude: geocode.latitude,
            longitude: geocode.longitude
          }));
          setCoordinates(coordsFromApi);
          console.log(coordsFromApi);
        })
        .catch((error) => {
          console.error('Error fetching coordinates from backend:', error);
        });
  }, []);

  // // Obtain Long/Lat Coords thru Nominatim from addresses
  // useEffect(() => {
  //   const fetchCoordinates = async () => {
  //       try {
  //           const promises = addresses.map(async (address) => {
  //               const response = await axios.get('https://nominatim.openstreetmap.org/search', {
  //                   params: {
  //                       q: address,
  //                       format: 'json',
  //                       limit: 1
  //                   }
  //               });
  //               const { lat, lon } = response.data[0];
  //               return { lat, lon };
  //           });
  //           const coordinates = await Promise.all(promises);
  //           setCoordinates(coordinates);
  //           console.log('Coordinates:', coordinates);
  //       } catch (error) {
  //           console.error('Error fetching coordinates from Nominatim:', error);
  //       }
  //   };

  //   if (addresses.length > 0) {
  //       fetchCoordinates();
  //   }
  // }, [addresses]);

  const initializeMap = () => {
    const mapInstance = new maplibregl.Map({
      container: "map",
      style: 'https://api.maptiler.com/maps/streets/style.json?key=cTPmLVGEtC2TtjsUeqHc', // style URL
      center: [-90.1994, 38.627],
      zoom: 9
    });  
    
    setMap(mapInstance);
  };

  const handleGeocode = async () => {
    try {

      const response = await axios.post('http://localhost:8080/geocode-families');

      console.log('Geocoding response:', response.data);
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
  };



  // Creates Markers for each family address
  useEffect(() => {
    if (!map || !coords.length) return;
  
    coords.forEach((coord) => {
      new maplibregl.Marker({color: "#FF0000"})
        .setLngLat([coord.longitude, coord.latitude])
        .addTo(map);
    });
  
  }, [map, coords]);

  return (
    props.variant === "mainDisplay" ? (
      <Flex alignItems="center" id="main-display" maxWidth="85vw" width="85vw" flexDir="column" justifyContent="flex-start" p={2} marginLeft={'15vw'}>
        <div id="map" style={{ width: "calc(100% - 30%)", height: "500px" }} />
        <Button
          mt={4}
          colorScheme="purple"
          onClick={initializeMap}
        >
          Open Map
        </Button>
        <Button
          mt={4}
          colorScheme="purple"
          onClick={handleGeocode}
        >
          Geocode Addresses
        </Button>
      </Flex>
    ) : (
      <Flex flexDirection="column" alignItems="center">
        <div id="map" style={{ width: "calc(100% - 30%)", height: "500px" }} />
        <Button
          mt={4}
          colorScheme="purple"
          onClick={initializeMap}
        >
          Open Map
        </Button>
        <Button
          mt={4}
          colorScheme="purple"
          onClick={handleGeocode}
        >
          Geocode Address
        </Button>
      </Flex>
    )
  );
};

export default MapComponent;
