import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock, Star } from "lucide-react";
import heroImage from "@/assets/hero-bus.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Modern bus tracking" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero/90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Smart Bus
            <span className="block bg-gradient-to-r from-accent-light to-accent-glow bg-clip-text text-transparent">
              Tracking
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Track buses in real-time, book your seat, and travel smart with our intelligent transit system
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="group">
              <MapPin className="group-hover:scale-110 transition-transform" />
              Find My Bus
            </Button>
            <Button variant="accent" size="lg" className="group">
              <Search className="group-hover:scale-110 transition-transform" />
              Search Routes
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <Clock className="w-12 h-12 text-accent-light mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-white/80">Live bus locations and accurate arrival times</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <MapPin className="w-12 h-12 text-accent-light mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Smart Routes</h3>
              <p className="text-white/80">Optimized paths and alternative suggestions</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <Star className="w-12 h-12 text-accent-light mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Premium Experience</h3>
              <p className="text-white/80">Book seats, rate trips, and travel comfortably</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/20 to-transparent"></div>
    </div>
  );
};

export default Hero;