import React, { useEffect } from "react";
import maplibregl from 'maplibre-gl';
import * as d3 from 'd3';

const MapComponent = ({ addresses }) => {
    
    useEffect(() => {
        if (!addresses.length) return;
    
        // Initialize map
        const map = new maplibregl.Map({
          container: 'map',
          style: 'maplibre://styles/mapbox/streets-v11',
          center: [-74.5, 40],
          zoom: 9
        });
    
        // Plot points on the map using d3.js
        const svg = d3.select(map.getCanvasContainer()).append('svg');
        const g = svg.append('g');
    
        addresses.forEach(address => {
          const [lng, lat] = [parseFloat(address.longitude), parseFloat(address.latitude)];
          const point = map.project([lng, lat]);
    
          g.append('circle')
            .attr('cx', point.x)
            .attr('cy', point.y)
            .attr('r', 5)
            .style('fill', 'red');
        });
    
        return () => map.remove(); // Cleanup
      }, [addresses]);
    
      return <div id="map" style={{ width: '100%', height: '500px' }} />;
    };

  export default MapComponent;