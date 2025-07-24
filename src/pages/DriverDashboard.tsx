import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Clock, 
  Navigation, 
  Battery, 
  Signal,
  CheckCircle,
  AlertCircle,
  Play,
  Square,
  Route
} from "lucide-react";

const DriverDashboard = () => {
  const [tripStatus, setTripStatus] = useState<'inactive' | 'active' | 'completed'>('inactive');
  const [locationSharing, setLocationSharing] = useState(true);

  const currentTrip = {
    id: "TRIP001",
    route: "Route 15A",
    destination: "Downtown Terminal",
    startTime: "09:00 AM",
    estimatedEnd: "11:30 AM",
    totalStops: 12,
    currentStop: 4,
    passengers: 24,
    capacity: 40
  };

  const passengers = [
    { id: 1, name: "John Doe", pickup: "Main St & 5th", destination: "Downtown", status: "checked-in" },
    { id: 2, name: "Sarah Wilson", pickup: "Park Ave", destination: "Airport", status: "waiting" },
    { id: 3, name: "Mike Johnson", pickup: "Broadway", destination: "University", status: "checked-in" }
  ];

  const deviceStatus = {
    battery: 87,
    gps: "Strong",
    network: "4G",
    lastUpdate: "30 seconds ago"
  };

  const handleTripAction = () => {
    if (tripStatus === 'inactive') {
      setTripStatus('active');
    } else if (tripStatus === 'active') {
      setTripStatus('completed');
    } else {
      setTripStatus('inactive');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Driver Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John Smith</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Badge variant={tripStatus === 'active' ? 'default' : 'secondary'}>
              {tripStatus === 'active' ? 'On Trip' : tripStatus === 'completed' ? 'Trip Completed' : 'Available'}
            </Badge>
            <Badge variant={locationSharing ? 'default' : 'destructive'}>
              {locationSharing ? 'Location Active' : 'Location Off'}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Trip */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Route className="w-5 h-5" />
                    Current Trip
                  </span>
                  <Button 
                    onClick={handleTripAction}
                    variant={tripStatus === 'inactive' ? 'accent' : tripStatus === 'active' ? 'destructive' : 'default'}
                    className="flex items-center gap-2"
                  >
                    {tripStatus === 'inactive' ? (
                      <>
                        <Play className="w-4 h-4" />
                        Start Trip
                      </>
                    ) : tripStatus === 'active' ? (
                      <>
                        <Square className="w-4 h-4" />
                        End Trip
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tripStatus !== 'inactive' ? (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gradient-card rounded-lg">
                        <p className="text-sm text-muted-foreground">Route</p>
                        <p className="font-semibold">{currentTrip.route}</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-card rounded-lg">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="font-semibold">{currentTrip.currentStop}/{currentTrip.totalStops}</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-card rounded-lg">
                        <p className="text-sm text-muted-foreground">Passengers</p>
                        <p className="font-semibold">{currentTrip.passengers}/{currentTrip.capacity}</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-card rounded-lg">
                        <p className="text-sm text-muted-foreground">ETA</p>
                        <p className="font-semibold">{currentTrip.estimatedEnd}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{currentTrip.destination}</p>
                          <p className="text-sm text-muted-foreground">Final destination</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Navigation className="w-4 h-4 mr-2" />
                        Navigate
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Trip Progress</span>
                        <span>{Math.round((currentTrip.currentStop / currentTrip.totalStops) * 100)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(currentTrip.currentStop / currentTrip.totalStops) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ready to Start</h3>
                    <p className="text-muted-foreground">Click "Start Trip" when you're ready to begin your route</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Passenger List */}
            {tripStatus !== 'inactive' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Passenger List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {passengers.map((passenger) => (
                      <div key={passenger.id} className="flex items-center justify-between p-3 bg-gradient-card rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            passenger.status === 'checked-in' ? 'bg-success' : 'bg-warning'
                          }`}></div>
                          <div>
                            <p className="font-medium">{passenger.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {passenger.pickup} → {passenger.destination}
                            </p>
                          </div>
                        </div>
                        <Badge variant={passenger.status === 'checked-in' ? 'default' : 'secondary'}>
                          {passenger.status === 'checked-in' ? 'Checked In' : 'Waiting'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Device Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Signal className="w-5 h-5" />
                  Device Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4" />
                    <span className="text-sm">Battery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{deviceStatus.battery}%</span>
                    <div className="w-8 h-2 bg-secondary rounded-full">
                      <div 
                        className={`h-2 rounded-full ${
                          deviceStatus.battery > 50 ? 'bg-success' : 
                          deviceStatus.battery > 20 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${deviceStatus.battery}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">GPS</span>
                  </div>
                  <Badge variant="default">{deviceStatus.gps}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4" />
                    <span className="text-sm">Network</span>
                  </div>
                  <Badge variant="default">{deviceStatus.network}</Badge>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Last update: {deviceStatus.lastUpdate}
                  </p>
                </div>

                <Button 
                  variant={locationSharing ? "destructive" : "accent"}
                  size="sm" 
                  className="w-full"
                  onClick={() => setLocationSharing(!locationSharing)}
                >
                  {locationSharing ? (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Stop Sharing
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Start Sharing
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Trips Completed</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Passengers</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hours Driven</span>
                  <span className="font-semibold">6.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">On-time Rate</span>
                  <span className="font-semibold text-success">94%</span>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Device Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;