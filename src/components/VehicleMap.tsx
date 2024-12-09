import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Dummy vehicle data
const vehicleData = [
  {
    id: "V001",
    coordinates: [-122.4194, 37.7749],
    status: "responding",
    unit: "Unit 1",
  },
  {
    id: "V002",
    coordinates: [-122.4284, 37.7649],
    status: "patrolling",
    unit: "Unit 2",
  },
  {
    id: "V003",
    coordinates: [-122.4094, 37.7849],
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
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
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