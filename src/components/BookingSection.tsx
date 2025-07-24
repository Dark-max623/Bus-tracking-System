import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Star, CreditCard, Armchair } from "lucide-react";

const BookingSection = () => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  // Mock seat layout (5 rows, 4 seats per row)
  const seats = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    isBooked: [3, 7, 11, 15, 18].includes(i + 1),
    isSelected: selectedSeat === i + 1
  }));

  const handleSeatClick = (seatId: number) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat?.isBooked) {
      setSelectedSeat(selectedSeat === seatId ? null : seatId);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Book Your Journey</h1>
            <p className="text-lg text-muted-foreground">
              Choose your route, select your seat, and travel comfortably
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Route Selection */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Select Route
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">From</label>
                      <Input
                        placeholder="Enter starting location"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">To</label>
                      <Input
                        placeholder="Enter destination"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                  </div>
                  
                  <Button variant="accent" className="w-full">
                    <MapPin className="w-4 h-4" />
                    Find Routes
                  </Button>
                </CardContent>
              </Card>

              {/* Available Buses */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Available Buses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      id: "BUS001",
                      route: "Express Route 15A",
                      operator: "Metro Transit",
                      departure: "2:30 PM",
                      arrival: "3:45 PM",
                      duration: "1h 15m",
                      price: 12.50,
                      rating: 4.8,
                      available: 8
                    },
                    {
                      id: "BUS002",
                      route: "Standard Route 23B",
                      operator: "City Lines",
                      departure: "3:00 PM",
                      arrival: "4:30 PM",
                      duration: "1h 30m",
                      price: 8.75,
                      rating: 4.5,
                      available: 15
                    }
                  ].map((bus) => (
                    <div
                      key={bus.id}
                      className="border border-border rounded-lg p-4 hover:bg-gradient-card transition-all duration-300 cursor-pointer hover:shadow-md"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{bus.route}</h3>
                          <p className="text-sm text-muted-foreground">{bus.operator}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-warning fill-current" />
                            <span className="text-sm">{bus.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${bus.price}</div>
                          <Badge variant="secondary" className="mt-1">
                            {bus.available} seats left
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Departure</span>
                          <div className="font-medium">{bus.departure}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Arrival</span>
                          <div className="font-medium">{bus.arrival}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration</span>
                          <div className="font-medium">{bus.duration}</div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4 hover:bg-primary hover:text-primary-foreground">
                        Select This Bus
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Seat Selection & Booking Summary */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Armchair className="w-5 h-5 text-primary" />
                    Select Your Seat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-card p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-4 gap-2">
                      {seats.map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.isBooked}
                          className={`
                            w-8 h-8 rounded text-xs font-medium transition-all duration-200
                            ${seat.isBooked 
                              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                              : seat.isSelected
                                ? 'bg-accent text-accent-foreground scale-110 shadow-glow'
                                : 'bg-card border border-border hover:bg-accent/20 hover:scale-105'
                            }
                          `}
                        >
                          {seat.id}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-card border border-border rounded"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent rounded"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-muted rounded"></div>
                      <span>Booked</span>
                    </div>
                  </div>
                  
                  {selectedSeat && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
                      <p className="text-sm text-accent-foreground">
                        Seat <span className="font-bold">{selectedSeat}</span> selected
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Booking Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route</span>
                      <span className="font-medium">Express 15A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seat</span>
                      <span className="font-medium">{selectedSeat ? `#${selectedSeat}` : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departure</span>
                      <span className="font-medium">2:30 PM</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">$12.50</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="hero" 
                    className="w-full" 
                    disabled={!selectedSeat}
                  >
                    <CreditCard className="w-4 h-4" />
                    Complete Booking
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment • Cancel up to 30 mins before departure
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;