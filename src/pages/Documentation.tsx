import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Code, Settings, Shield, Wifi } from "lucide-react";

const Documentation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Device Setup Documentation</h1>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="manual-setup">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Manual Device Setup
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Step 1: Initial Setup</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Power on your device by holding the power button for 3 seconds</li>
                  <li>Wait for the LED indicator to start blinking blue</li>
                  <li>Ensure your device is within range of your WiFi network</li>
                </ol>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Step 2: Network Connection</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Open your device's WiFi settings</li>
                  <li>Connect to the device's temporary network (format: DEVICE-XXXX)</li>
                  <li>Enter your WiFi credentials when prompted</li>
                  <li>Wait for the LED to turn solid blue, indicating successful connection</li>
                </ol>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Step 3: Device Registration</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Navigate to the Device Management page</li>
                  <li>Click "Add New Device"</li>
                  <li>Enter the device serial number (found on the device)</li>
                  <li>Name your device and select its type</li>
                  <li>Click "Register Device" to complete setup</li>
                </ol>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="api-integration">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Integration
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">REST API Endpoints</h3>
                <div className="space-y-2">
                  <p className="text-sm">Base URL: <code>https://api.yourservice.com/v1</code></p>
                  <div className="space-y-1">
                    <p className="font-medium">Register Device:</p>
                    <pre className="bg-muted p-2 rounded-md text-sm">
                      POST /devices/register
                      {`
{
  "serial_number": "string",
  "name": "string",
  "type": "string"
}`}
                    </pre>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Update Device Status:</p>
                    <pre className="bg-muted p-2 rounded-md text-sm">
                      PUT /devices/{`{device_id}`}/status
                      {`
{
  "status": "connected" | "disconnected",
  "battery_level": number,
  "signal_strength": number
}`}
                    </pre>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Authentication</h3>
                <p className="text-sm mb-2">All API requests require an API key in the header:</p>
                <pre className="bg-muted p-2 rounded-md text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </pre>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">WebSocket Integration</h3>
                <p className="text-sm mb-2">For real-time updates, connect to our WebSocket endpoint:</p>
                <pre className="bg-muted p-2 rounded-md text-sm">
                  ws://api.yourservice.com/v1/devices/ws
                </pre>
                <p className="text-sm mt-2">Send heartbeat every 30 seconds to maintain connection.</p>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="security">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Guidelines
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Best Practices</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Regularly update device firmware</li>
                  <li>Use strong, unique passwords for each device</li>
                  <li>Enable two-factor authentication when available</li>
                  <li>Regularly rotate API keys</li>
                  <li>Monitor device access logs</li>
                </ul>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Network Security</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Use encrypted connections (HTTPS/WSS)</li>
                  <li>Implement rate limiting</li>
                  <li>Set up IP whitelisting</li>
                  <li>Configure firewall rules</li>
                </ul>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Documentation;