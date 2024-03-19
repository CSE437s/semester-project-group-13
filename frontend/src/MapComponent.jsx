import * as d3 from 'd3';
import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import BasicPage from './utility/BasicPage';
import axios from "axios";
import { Button, useTheme } from "@chakra-ui/react";

const MapComponent = (props) => {
  const [map, setMap] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [mapVisible, setMapVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!mapVisible) return; // Exit if map is not visible

    // Initialize map
    console.log("YIPP");
    const mapInstance = new maplibregl.Map({
      container: "map",
      style: "maplibre://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mapVisible]);

  useEffect(() => {
    if (!map) return;

    // Fetch addresses from your backend API
    axios
      .get("http://localhost:8080/family")
      .then((response) => {
        const addressesFromApi = response.data.data.map(
          (family) => family.address
        );
        setAddresses(addressesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
      });
  }, [map]);

  useEffect(() => {
    if (!map || addresses.length === 0) return;

    // Plot points on map using addresses
    const plotPoints = async () => {
      const svg = map.getCanvasContainer().querySelector("svg");
      if (!svg) return; // Ensure svg is available
      const g = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      svg.appendChild(g);

      addresses.forEach(async (address) => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              address
            )}&format=json&limit=1`
          );
          const { lat, lon } = response.data[0];

          const point = map.project([parseFloat(lon), parseFloat(lat)]);
          const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          circle.setAttribute("cx", point.x);
          circle.setAttribute("cy", point.y);
          circle.setAttribute("r", 5);
          circle.setAttribute("fill", "red");
          g.appendChild(circle);
        } catch (error) {
          console.error("Error geocoding address:", error);
        }
      });
    };

    plotPoints();

    return () => {
      // Cleanup function
    };
  }, [map, addresses]);

  const handleMapOpen = () => {
    setMapVisible(true);
  };

  return (
    <div>
      <BasicPage
                title="Map Component"
            > 
        <Button
        bg={theme.colors.purple[300]}
        color={"white"}
        onClick={handleMapOpen}
        >
          Open Map
        </Button>
    {mapVisible && (
      <div id="map" style={{ width: "100%", height: "500px" }} />
    )}
    </BasicPage>
  </div>
);
};

export default MapComponent;
