import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Clock, Users, Navigation } from "lucide-react";

// Mock bus data for demonstration
const mockBuses = [
  {
    id: "BUS001",
    route: "Route 15A",
    destination: "Downtown Terminal",
    currentLocation: "Main St & 5th Ave",
    eta: "3 mins",
    occupancy: 75,
    status: "active" as const,
    lat: 40.7589,
    lng: -73.9851
  },
  {
    id: "BUS002", 
    route: "Route 23B",
    destination: "Airport Express",
    currentLocation: "Broadway & 42nd St",
    eta: "7 mins",
    occupancy: 45,
    status: "active" as const,
    lat: 40.7614,
    lng: -73.9776
  },
  {
    id: "BUS003",
    route: "Route 8",
    destination: "University Campus",
    currentLocation: "Park Ave & 59th St",
    eta: "12 mins",
    occupancy: 90,
    status: "delayed" as const,
    lat: 40.7645,
    lng: -73.9716
  }
];

const LiveMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const getStatusColor = (status: string, occupancy: number) => {
    if (status === "delayed") return "text-bus-delayed";
    if (occupancy >= 85) return "text-warning";
    return "text-bus-active";
  };

  const getOccupancyText = (occupancy: number) => {
    if (occupancy >= 85) return "Almost Full";
    if (occupancy >= 60) return "Busy";
    return "Available";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                {/* Search Bar */}
                <div className="bg-gradient-card p-4 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search for routes or destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-border"
                    />
                  </div>
                </div>
                
                {/* Mock Map Display */}
                <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 h-96 lg:h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground mb-4">Live bus tracking with real-time locations</p>
                    <Button variant="accent">
                      <Navigation className="w-4 h-4" />
                      Enable Location
                    </Button>
                  </div>
                  
                  {/* Bus Markers (Mock) */}
                  <div className="absolute top-20 left-20 w-4 h-4 bg-bus-active rounded-full animate-pulse shadow-glow"></div>
                  <div className="absolute bottom-32 right-24 w-4 h-4 bg-bus-delayed rounded-full animate-pulse"></div>
                  <div className="absolute top-40 right-32 w-4 h-4 bg-bus-active rounded-full animate-pulse shadow-glow"></div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Bus List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Nearby Buses</h2>
              <span className="text-sm text-muted-foreground">Live updates</span>
            </div>
            
            {mockBuses.map((bus) => (
              <Card 
                key={bus.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 ${
                  selectedBus === bus.id ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedBus(selectedBus === bus.id ? null : bus.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{bus.route}</h3>
                      <p className="text-sm text-muted-foreground">{bus.destination}</p>
                    </div>
                    <div className={`text-right ${getStatusColor(bus.status, bus.occupancy)}`}>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">{bus.eta}</span>
                      </div>
                      <span className="text-xs">{bus.status === 'delayed' ? 'Delayed' : 'On Time'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{bus.currentLocation}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{getOccupancyText(bus.occupancy)}</span>
                      </div>
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            bus.occupancy >= 85 ? 'bg-warning' : 
                            bus.occupancy >= 60 ? 'bg-accent' : 'bg-success'
                          }`}
                          style={{ width: `${bus.occupancy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedBus === bus.id && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" size="sm">
                          Track Bus
                        </Button>
                        <Button variant="accent" size="sm">
                          Book Seat
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-gradient-card">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold mb-2">Need a different route?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Explore all available routes and schedules
                </p>
                <Button variant="outline" className="w-full">
                  View All Routes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;