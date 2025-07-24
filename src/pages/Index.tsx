import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveMap from "@/components/LiveMap";
import BookingSection from "@/components/BookingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="tracking">
        <LiveMap />
      </section>
      <section id="bookings">
        <BookingSection />
      </section>
    </div>
  );
};

export default Index;