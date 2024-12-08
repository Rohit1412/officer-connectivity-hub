import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <Button variant="outline" className="mb-6" onClick={() => navigate("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Documentation & Deployment Guide</h1>

        <Tabs defaultValue="deployment" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="api">API Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="deployment">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Deployment Steps</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-medium mb-3">1. Environment Setup</h3>
                  <div className="space-y-2">
                    <p>Create a <code>.env</code> file with the following variables:</p>
                    <pre className="bg-muted p-4 rounded-lg text-sm">
                      VITE_SUPABASE_URL=your_supabase_url{"\n"}
                      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
                    </pre>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-medium mb-3">2. Build Process</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Install dependencies: <code>npm install</code></li>
                    <li>Build the project: <code>npm run build</code></li>
                    <li>Test the build locally: <code>npm run preview</code></li>
                  </ol>
                </section>

                <section>
                  <h3 className="text-xl font-medium mb-3">3. Deployment Options</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Option A: Lovable Hosting</h4>
                      <p>Click the "Deploy" button in the Lovable interface.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Option B: Custom Hosting</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Export the project to GitHub</li>
                        <li>Connect your hosting provider (e.g., Netlify, Vercel)</li>
                        <li>Configure environment variables</li>
                        <li>Deploy from your repository</li>
                      </ol>
                    </div>
                  </div>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="requirements">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-medium mb-3">Frontend Requirements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Node.js 16.x or higher</li>
                    <li>npm 7.x or higher</li>
                    <li>Modern web browser with WebSocket support</li>
                    <li>JavaScript enabled</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-medium mb-3">Backend Requirements (Supabase)</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Active Supabase project</li>
                    <li>Configured database tables and policies</li>
                    <li>Valid API keys and URLs</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-medium mb-3">Network Requirements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>HTTPS enabled</li>
                    <li>WebSocket connections allowed</li>
                    <li>Proper CORS configuration</li>
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">API Integration Guide</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-medium mb-3">REST API Endpoints</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Devices</h4>
                      <pre className="bg-muted p-4 rounded-lg text-sm">
                        GET    /rest/v1/devices{"\n"}
                        POST   /rest/v1/devices{"\n"}
                        PATCH  /rest/v1/devices?id=eq.{"{id}"}{"\n"}
                        DELETE /rest/v1/devices?id=eq.{"{id}"}
                      </pre>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-medium mb-3">Authentication</h3>
                  <p className="mb-2">Include these headers with your requests:</p>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    apikey: SUPABASE_ANON_KEY{"\n"}
                    Authorization: Bearer USER_TOKEN
                  </pre>
                </section>

                <section>
                  <h3 className="text-xl font-medium mb-3">WebSocket Integration</h3>
                  <p className="mb-2">Subscribe to real-time updates:</p>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    const subscription = supabase{"\n"}
                    {"  "}.channel('devices'){"\n"}
                    {"  "}.on('postgres_changes', {"{\n"}
                    {"    "}event: '*',{"\n"}
                    {"    "}schema: 'public',{"\n"}
                    {"    "}table: 'devices'{"\n"}
                    {"  }"}, callback){"\n"}
                    {"  "}.subscribe()
                  </pre>
                </section>

                <section>
                  <h3 className="text-xl font-medium mb-3">Example Device Object</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    {"{\n"}
                    {"  "}"id": "uuid",{"\n"}
                    {"  "}"name": "Device Name",{"\n"}
                    {"  "}"type": "Body Camera",{"\n"}
                    {"  "}"status": "connected",{"\n"}
                    {"  "}"battery_level": 85,{"\n"}
                    {"  "}"signal_strength": 92{"\n"}
                    {"}"}
                  </pre>
                </section>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;