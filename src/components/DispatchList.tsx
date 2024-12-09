import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy dispatch data
const dispatchData = [
  {
    id: "D001",
    unit: "Unit 1",
    location: "Market St",
    status: "En Route",
    responseTime: "2 min",
  },
  {
    id: "D002",
    unit: "Unit 2",
    location: "Mission District",
    status: "On Scene",
    responseTime: "5 min",
  },
  {
    id: "D003",
    unit: "Unit 3",
    location: "Financial District",
    status: "Completed",
    responseTime: "8 min",
  },
];

const DispatchList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Unit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Response</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dispatchData.map((dispatch) => (
          <TableRow key={dispatch.id}>
            <TableCell className="font-medium">{dispatch.unit}</TableCell>
            <TableCell>
              <Badge
                variant={
                  dispatch.status === "En Route"
                    ? "destructive"
                    : dispatch.status === "On Scene"
                    ? "default"
                    : "secondary"
                }
              >
                {dispatch.status}
              </Badge>
            </TableCell>
            <TableCell>{dispatch.responseTime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DispatchList;