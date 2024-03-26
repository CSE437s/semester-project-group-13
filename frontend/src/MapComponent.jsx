import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import { Button, useTheme, Flex } from "@chakra-ui/react";

const MapComponent = (props) => {
  const [map, setMap] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [coords, setCoordinates] = useState([]);
  const theme = useTheme();

  // Fetch addresses from db
  useEffect(() => {
    axios.get('http://localhost:8080/family')
        .then((response) => {
          const addressesFromApi = response.data.data.map((family) => family.address);
          setAddresses(addressesFromApi);
          console.log(addressesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching addresses from backend:', error);
        });
  }, []);

  // Obtain Long/Lat Coords thru Nominatim from addresses
  useEffect(() => {
    const fetchCoordinates = async () => {
        try {
            const promises = addresses.map(async (address) => {
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: address,
                        format: 'json',
                        limit: 1
                    }
                });
                const { lat, lon } = response.data[0];
                return { lat, lon };
            });
            const coordinates = await Promise.all(promises);
            setCoordinates(coordinates);
            console.log('Coordinates:', coordinates);
        } catch (error) {
            console.error('Error fetching coordinates from Nominatim:', error);
        }
    };

    if (addresses.length > 0) {
        fetchCoordinates();
    }
  }, [addresses]);

  const initializeMap = () => {
    const mapInstance = new maplibregl.Map({
      container: "map",
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      center: [-90.1994, 38.627],
      zoom: 8
    });  
    
    setMap(mapInstance);
  };

  // Test Markers
  useEffect(() => {
    if (map) {
      let marker = new maplibregl.Marker({
        color: "#FF0000",
        draggable: true
      }).setLngLat([0, 50])
      .addTo(map);
  
      const marker1 = new maplibregl.Marker()
        .setLngLat([12.550343, 55.665957])
        .addTo(map);
      console.log("KO");
      console.log(map);
    }
  }, [map]);

  // Creates Markers for each family address
  useEffect(() => {
    if (!map || !coords.length) return;
  
    coords.forEach((coord) => {
      new maplibregl.Marker({color: "#FF0000"})
        .setLngLat([-90, 38])
        .addTo(map);
    });
  
  }, [map, coords]);

  return (
    props.variant === "mainDisplay" ? (
      <Flex alignItems="center" id="main-display" maxWidth="85vw" width="85vw" flexDir="column" justifyContent="flex-start">
        <div id="map" style={{ width: "100%", height: "500px" }} />
        <Button
          mt={4}
          colorScheme="purple"
          onClick={initializeMap}
        >
          Open Map
        </Button>
      </Flex>
    ) : (
      <Flex flexDirection="column" alignItems="center">
        <div id="map" style={{ width: "100%", height: "500px" }} />
        <Button
          mt={4}
          colorScheme="purple"
          onClick={initializeMap}
        >
          Open Map
        </Button>
      </Flex>
    )
  );
};

export default MapComponent;
