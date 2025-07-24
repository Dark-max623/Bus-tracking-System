import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Bus, 
  Route, 
  BarChart3, 
  Settings, 
  Search,
  Plus,
  Download,
  AlertTriangle,
  Clock,
  MapPin
} from "lucide-react";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { title: "Active Buses", value: "47", icon: Bus, color: "text-bus-active" },
    { title: "Total Routes", value: "23", icon: Route, color: "text-primary" },
    { title: "Daily Passengers", value: "1,247", icon: Users, color: "text-accent" },
    { title: "Revenue Today", value: "$3,456", icon: BarChart3, color: "text-success" }
  ];

  const recentAlerts = [
    { id: 1, type: "delay", message: "Bus #127 delayed by 15 minutes", time: "5 min ago", severity: "warning" },
    { id: 2, type: "breakdown", message: "Bus #089 reported mechanical issue", time: "12 min ago", severity: "error" },
    { id: 3, type: "route", message: "Route 15A experiencing high demand", time: "1 hour ago", severity: "info" }
  ];

  const activeBuses = [
    { id: "BUS001", route: "Route 15A", driver: "John Smith", status: "active", passengers: 24, location: "Downtown" },
    { id: "BUS002", route: "Route 23B", driver: "Sarah Johnson", status: "delayed", passengers: 18, location: "Airport" },
    { id: "BUS003", route: "Route 8", driver: "Mike Wilson", status: "active", passengers: 31, location: "University" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your bus fleet and operations</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="accent">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="fleet">Fleet</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Alerts */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          alert.severity === 'error' ? 'bg-destructive' :
                          alert.severity === 'warning' ? 'bg-warning' : 'bg-info'
                        }`}></div>
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Bus className="w-4 h-4 mr-2" />
                    Add New Bus
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Route className="w-4 h-4 mr-2" />
                    Create Route
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Drivers
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fleet" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Active Fleet</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search buses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeBuses.map((bus) => (
                    <div key={bus.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-card">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="font-semibold">{bus.id}</span>
                          <span className="text-sm text-muted-foreground">{bus.route}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{bus.driver}</span>
                          <span className="text-sm text-muted-foreground">Driver</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{bus.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="font-semibold">{bus.passengers}</p>
                          <p className="text-xs text-muted-foreground">Passengers</p>
                        </div>
                        <Badge variant={bus.status === 'active' ? 'default' : 'destructive'}>
                          {bus.status}
                        </Badge>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Route className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Route Management</h3>
                  <p className="text-muted-foreground">Manage and optimize your bus routes</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">Manage passengers, drivers, and operators</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
                  <p className="text-muted-foreground">View performance metrics and insights</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;