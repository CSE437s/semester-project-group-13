import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import { Button, useTheme, Flex,  Select, extendTheme, ChakraProvider } from "@chakra-ui/react";
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = (props) => {
  const [map, setMap] = useState(null);
  const [geocodes, setGeocodes] = useState([]);
  const [filter, setFilter] = useState("all");
  const theme = useTheme();

  // Fetch Lat, Lon from db
  useEffect(() => {
    axios.get('http://localhost:8080/geocode/geocodeAndFamily')
        .then((response) => {
          const geocodesFromApi = response.data.data.map((geocode) => ({
            latitude: geocode.latitude,
            longitude: geocode.longitude,
            isRefugeeFamily: geocode.isRefugeeFamily,
            family_id: geocode.family_id,
          }));
          setGeocodes(geocodesFromApi);
          console.log(geocodesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching geocodes from backend:', error);
        });
  }, []);

  const initializeMap = () => {
    const mapInstance = new maplibregl.Map({
      container: "map",
      style: 'https://api.maptiler.com/maps/streets/style.json?key=cTPmLVGEtC2TtjsUeqHc', // style URL
      center: [-90.1994, 38.627],
      zoom: 9
    });  
    
    setMap(mapInstance);

    addMarkers(mapInstance);
  };

  const addMarkers = (mapInstance) => {
    // Remove any existing markers
    mapInstance.redraw();

    let filteredGeocodes;

    const filteredRefugees = geocodes.filter((geo) => geo.isRefugeeFamily).slice(0, 50); // First 50 refugees
    const filteredNonRefugees = geocodes.filter((geo) => !geo.isRefugeeFamily).slice(0, 50); // First 50 non-refugees
    const combinedGeocodes = [...filteredRefugees, ...filteredNonRefugees];
    if (filter === "all") {
      filteredGeocodes = combinedGeocodes;
    } else if (filter === "refugees") {
      filteredGeocodes = filteredRefugees;
    } else if (filter === "non-refugees") {
      filteredGeocodes = filteredNonRefugees;
    }

    filteredGeocodes.forEach((geocode) => {
      const color = geocode.isRefugeeFamily ? "#FF0000" : "#0000FF"; // Red for refugees, Blue for non-refugees
      new maplibregl.Marker({ color })
        .setLngLat([geocode.longitude, geocode.latitude])
        .addTo(mapInstance);
    });
  };
  // Only add the first 50 markers
    // Suppose 'geocodes' is your initial array containing all geocode records
    // const nonRefugees = geocodes.filter((geocode) => !geocode.isRefugeeFamily); // Non-refugees
    // const refugees = geocodes.filter((geocode) => geocode.isRefugeeFamily); // Refugees
    // const limitedNonRefugees = nonRefugees.slice(0, 50); // Get the first 50 non-refugees
    // const limitedRefugees = refugees.slice(0, 50); // Get the first 50 refugees

    // // Create markers for non-refugees
    // limitedNonRefugees.forEach((geocode) => {
    // new maplibregl.Marker({ color: "#0000FF" }) // Blue for non-refugees
    //   .setLngLat([geocode.longitude, geocode.latitude])
    //   .addTo(mapInstance); // Add to map instance
    // });

    // // Create markers for refugees
    // limitedRefugees.forEach((geocode) => {
    // new maplibregl.Marker({ color: "#FF0000" }) // Red for refugees
    //   .setLngLat([geocode.longitude, geocode.latitude])
    //   .addTo(mapInstance);
    // });
 

  const handleGeocode = async () => {
    try {

      const response = await axios.post('http://localhost:8080/geocode/geocode-families');

      console.log('Geocoding response:', response.data);
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
  };

  // Creates Markers for each family address
  // useEffect(() => {
  //   if (!map || !coords.length) return;
  
  //   coords.forEach((coord) => {
  //     new maplibregl.Marker({color: "#FF0000"})
  //       .setLngLat([coord.longitude, coord.latitude])
  //       .addTo(map);
  //   });
  
  // }, [map, coords]);

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
        <Select color='black'
        bg = 'primary.600'
        font = 'Menlo'
        borderColor = 'transparent'
        placeholder="Select filter"
        listbox={{backgroundColor: 'primary.600'}}
        onChange={(e) => {
          setFilter(e.target.value);
          addMarkers(map); // Re-add markers with the new filter
        }}
        >
        <option style={{color: 'black'}} value="all">All</option>
        <option style={{color: 'black'}} value="refugees">Refugees</option>
        <option style={{color: 'black'}} value="non-refugees">Non-refugees</option>
        </Select>
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
