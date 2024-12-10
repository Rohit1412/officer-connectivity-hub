import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Using India TopoJSON
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

// Updated coordinates for major Indian cities
const vehicleData = [
  {
    id: "V001",
    coordinates: [77.2090, 28.6139], // Delhi
    status: "responding",
    unit: "Unit 1",
  },
  {
    id: "V002",
    coordinates: [72.8777, 19.0760], // Mumbai
    status: "patrolling",
    unit: "Unit 2",
  },
  {
    id: "V003",
    coordinates: [80.2707, 13.0827], // Chennai
    status: "available",
    unit: "Unit 3",
  },
];

const VehicleMap = () => {
  return (
    <div>
      <div className="mb-4 flex gap-2">
        {["Available", "Responding", "Patrolling"].map((status) => (
          <Badge key={status} variant="outline">
            {status}
          </Badge>
        ))}
      </div>
      
      <div style={{ width: "100%", height: "500px" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1000,
            center: [78.9629, 22.5937] // Centered on India
          }}
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
          {vehicleData.map((vehicle) => (
            <Marker key={vehicle.id} coordinates={vehicle.coordinates}>
              <circle
                r={6}
                fill={
                  vehicle.status === "responding"
                    ? "#ef4444"
                    : vehicle.status === "patrolling"
                    ? "#3b82f6"
                    : "#22c55e"
                }
                stroke="#fff"
                strokeWidth={2}
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

export default VehicleMap;