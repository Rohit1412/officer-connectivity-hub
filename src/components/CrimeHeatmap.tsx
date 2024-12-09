import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Card } from "@/components/ui/card";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Dummy crime data
const crimeData = [
  { coordinates: [-122.4194, 37.7749], intensity: 80 }, // San Francisco
  { coordinates: [-118.2437, 34.0522], intensity: 65 }, // Los Angeles
  { coordinates: [-74.0060, 40.7128], intensity: 90 }, // New York
  { coordinates: [-87.6298, 41.8781], intensity: 70 }, // Chicago
  { coordinates: [-95.3698, 29.7604], intensity: 55 }, // Houston
];

const CrimeHeatmap = () => {
  const colorScale = scaleLinear<string>()
    .domain([0, 100])
    .range(["#ffedea", "#ff5233"]);

  return (
    <Card className="p-4">
      <div style={{ width: "100%", height: "400px" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 800 }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {crimeData.map((crime, index) => (
            <Marker key={index} coordinates={crime.coordinates}>
              <circle
                r={8}
                fill={colorScale(crime.intensity)}
                stroke="#fff"
                strokeWidth={2}
                opacity={0.8}
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </Card>
  );
};

export default CrimeHeatmap;