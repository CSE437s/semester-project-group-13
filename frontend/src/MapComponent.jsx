import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import { Button, useTheme, Flex,  Select, extendTheme, ChakraProvider } from "@chakra-ui/react";
import theme from './style/theme';
import 'maplibre-gl/dist/maplibre-gl.css';
import countriesData from './countries_coordinates.json';

const MapComponent = (props) => {
  const [map, setMap] = useState(null);
  const [geocodes, setGeocodes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("all");
  const theme = useTheme();
  const countryList = countriesData.ref_country_codes;

  useEffect(() => {
    axios.get('http://localhost:8080/geocode/geocodeAndFamily')
        .then((response) => {
          const geocodesFromApi = response.data.data.map((geocode) => ({
            latitude: geocode.latitude,
            longitude: geocode.longitude,
            isRefugeeFamily: geocode.isRefugeeFamily,
            family_id: geocode.family_id,
            address: geocode.address,
            familyName: geocode.FamilyName,
          }));
          setGeocodes(geocodesFromApi);
          console.log(geocodesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching geocodes from backend:', error);
        });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/family/familiesPerCountry')
        .then((response) => {
          const countriesFromApi = response.data.data.map((country) => ({
            country: country.CountryOfOrigin,
            count: country.NumberOfFamilies,
          }));
          setCountries(countriesFromApi);
          console.log('Fetched countries:', countriesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching countries from backend:', error);
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

  const initializeWorldMap = () => {
    const mapInstance = new maplibregl.Map({
      container: "map",
      style: 'https://api.maptiler.com/maps/streets/style.json?key=cTPmLVGEtC2TtjsUeqHc', // style URL
      center: [0,0],
      zoom: 0
    });  
    
    setMap(mapInstance);

    countries.forEach((country) => {
      console.log(country);
      const specificCountry = countryList.find(
        (cl) => cl.country === country.country
      );
  
      if (!specificCountry) {
        console.error(`Country '${country.country}' not found in JSON data.`);
        return;
      }
      const popupContent = `
      <div style="color: black;">
        <h3>Refugee Family Count</h3>
        <p>Country of Origin: ${country.country}</p>
        <p>Count: ${country.count}</p>
      </div>
    `;
      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(popupContent);
      const color = "#FF0000"; // Red for refugees, Blue for non-refugees
      new maplibregl.Marker({ color })
        .setLngLat([specificCountry.longitude, specificCountry.latitude])
        .setPopup(popup)
        .addTo(mapInstance);
    });
      
    
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
      const popupContent = `
      <div style="color: black;">
        <h3>Family Information</h3>
        <p>Family Name: ${geocode.familyName}</p>
        <p>Address: ${geocode.address}</p>
      </div>
    `;
      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(popupContent);
      const color = geocode.isRefugeeFamily ? "#FF0000" : "#0000FF"; // Red for refugees, Blue for non-refugees
      new maplibregl.Marker({ color })
        .setLngLat([geocode.longitude, geocode.latitude])
        .setPopup(popup)
        .addTo(mapInstance);
    });
  };
 

  const handleGeocode = async () => {
    try {

      const response = await axios.post('http://localhost:8080/geocode/geocode-families');

      console.log('Geocoding response:', response.data);
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
  };

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
        <Select  
        variant={'normal'}
        color = 'black'
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
          onClick={initializeWorldMap}
        >
          Open World Map
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
