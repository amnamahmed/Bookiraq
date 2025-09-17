import React, { useState, useEffect } from "react";
import "./App.css";

const hotels = [
  { id: 1, name: "Babylon Rotana", city: "Baghdad", price: 300, rating: 5, roomsAvailable: 16, services: ["Free WiFi", "Breakfast", "Parking"], image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/338257763.jpg?k=c17d5092bd844360554df7e19d074244446a3df05e198fa3f8343758276cae77&o=" },
  { id: 2, name: "Ishtar Hotel", city: "Basra", price: 200, rating: 4, roomsAvailable: 8, services: ["Gym", "Swimming Pool", "Restaurant"], image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/29/9c/1a/cristal-grand-ishtar.jpg" },
  { id: 3, name: "Divan Erbil Hotel", city: "Mosul", price: 180, rating: 5, roomsAvailable: 5, services: ["Spa", "Free Parking", "Breakfast"], image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/20762521.jpg?k=38298f4046409645f3dabbb77c0bca348702e548d6ca02a35e169bc8fa73f654&o=&hp=1" },
  { id: 4, name: "Royal Hotel", city: "Karbala", price: 120, rating: 4, roomsAvailable: 12, services: ["WiFi", "Parking", "Restaurant"], image: "https://dewerly.com/wp-content/uploads/2023/10/photo_28_2023-12-24_01-03-20.jpg" },
  { id: 5, name: "Rayhaan Hotel", city: "Najaf", price: 110, rating: 3, roomsAvailable: 15, services: ["WiFi", "Breakfast"], image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/19/a4/39/caption.jpg?w=1100&h=1100&s=1" },
  { id: 6, name: "Al Khafaji Hotel", city: "Kirkuk", price: 100, rating: 4, roomsAvailable: 20, services: ["Free Parking", "Restaurant"], image: "https://ziaratplanner.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-11-21-at-10.56.46-AM.webp" },
  { id: 7, name: "Jaar Al Amir Hotel", city: "Anbar", price: 90, rating: 3, roomsAvailable: 25, services: ["WiFi", "Breakfast"], image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/42/cc/fd6cb8e05b7b31cb1a1dbc6e79f429fbcdb39bd6cc56ebdfffeb5d893b52.jpeg" },
  { id: 8, name: "Jannat Al-Hussein Hotel", city: "Tikrit", price: 130, rating: 5, roomsAvailable: 18, services: ["WiFi", "Parking", "Gym"], image: "https://www.hoteliermiddleeast.com/2021/05/JPWcKeH8-al-rawdatain-residences_0.jpg" },
  { id: 9, name: "Al Khafaji Hotel", city: "Duhok", price: 100, rating: 4, roomsAvailable: 20, services: ["Free Parking", "Restaurant"], image: "https://ziaratplanner.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-11-21-at-10.56.46-AM.webp" },
  { id: 10, name: "Jaar Al Amir Hotel", city: "Babil", price: 90, rating: 3, roomsAvailable: 25, services: ["WiFi", "Breakfast"], image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/42/cc/fd6cb8e05b7b31cb1a1dbc6e79f429fbcdb39bd6cc56ebdfffeb5d893b52.jpeg" },
  { id: 19, name: "Grand Baghdad Hotel", city: "Baghdad", price: 250, rating: 4, roomsAvailable: 12, services:["WiFi","Breakfast"], image:"https://example.com/baghdad.jpg" }
];

function App() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const [form, setForm] = useState({ hotelId: "", customer: "", checkIn: "", checkOut: "", rooms: 1 });
  const [bookings, setBookings] = useState([]);
  const [showBookingCard, setShowBookingCard] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    let result = hotels;
    if (selectedCity !== "All") result = result.filter(h => h.city === selectedCity);
    if (selectedRating !== "All") result = result.filter(h => h.rating === Number(selectedRating));
    if (selectedPrice !== "All") {
      if (selectedPrice === "low") result = result.filter(h => h.price < 100);
      if (selectedPrice === "mid") result = result.filter(h => h.price >= 100 && h.price <= 200);
      if (selectedPrice === "high") result = result.filter(h => h.price > 200);
    }
    setFilteredHotels(result);
  }, [selectedCity, selectedRating, selectedPrice]);

  const handleBook = (e) => {
    e.preventDefault();
    const hotel = hotels.find(h => h.id === Number(form.hotelId));
    if (!hotel) return;
    const nights = (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24);
    if (nights <= 0) { alert("Check booking dates!"); return; }
    const total = nights * form.rooms * hotel.price;
    const booking = { ...form, id: Date.now(), hotelName: hotel.name, city: hotel.city, nights, total, services: hotel.services };
    setBookings([...bookings, booking]);
    setForm({ hotelId: "", customer: "", checkIn: "", checkOut: "", rooms: 1 });
    setCurrentBooking(booking);
    setShowBookingForm(false);
    setShowBookingCard(true);
  };

  const handleCancel = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
    if (currentBooking?.id === id) {
      setShowBookingCard(false);
      setCurrentBooking(null);
    }
  };

  return (
    <div className="bg-[#DDE6ED] min-h-screen text-[#27374D] relative">
      {/* Hero */}
      <section className="relative">
        <img src="https://images.unsplash.com/photo-1501117716987-c8e1ecb210ff"
             alt="Resort"
             className="w-full h-[400px] object-cover rounded-b-3xl"/>
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col items-center justify-center text-center text-white px-4 gap-4">
          <h2 className="text-4xl font-bold mb-3">Find your next stay</h2>
          <p className="mb-6 text-lg">Book Hotels And Unlock Your Perfect Getway</p>
          <div className="flex gap-4">
            <button onClick={() => setShowBookingForm(!showBookingForm)} className="confirm-btn">Book Now!</button>
            <button onClick={() => {
              if (bookings.length === 0) {
                alert("No bookings found");
              } else {
                setShowBookingCard(!showBookingCard);
              }
            }} className="city-btn">Show My Booking</button>
          </div>
        </div>
      </section>

      {/* Filter Button */}
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-6 right-6 bg-white shadow-md p-2 rounded-full hover:bg-gray-200"
      >
        ⚙️
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="absolute top-16 right-6 bg-white p-4 rounded-xl shadow-lg flex flex-col gap-2 w-[200px] z-40">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">City</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="All">All Cities</option>
              {[...new Set(hotels.map(h => h.city))].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Rating</label>
            <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
              <option value="All">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Price</label>
            <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
              <option value="All">All Prices</option>
              <option value="low">Less than $100</option>
              <option value="mid">$100 - $200</option>
              <option value="high">More than $200</option>
            </select>
          </div>
        </div>
      )}

      {/* Hotels */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Hotels</h2>
        {filteredHotels.length === 0 ? (
          <p className="text-center text-gray-600">No hotels match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredHotels.map(hotel => (
              <div 
                key={hotel.id} 
                className="hotel-card cursor-pointer"
                onClick={() => setSelectedHotel(hotel)}
              >
                <img src={hotel.image} alt={hotel.name}/>
                <div className="info">
                  <h2>{hotel.name}</h2>
                  <p>{hotel.city}</p>
                  <p className="text-green-600 font-bold">💵 ${hotel.price}/night</p>
                  <p>🌟 {hotel.rating} Stars</p>
                  <p>🛏 {hotel.roomsAvailable} Rooms</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hotel Details */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="booking-card text-[#27374D] bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
            <button onClick={() => setSelectedHotel(null)} className="close-btn">✖</button>
            <img src={selectedHotel.image} alt={selectedHotel.name} className="rounded-lg mb-4"/>
            <h2 className="text-2xl font-bold">{selectedHotel.name}</h2>
            <p><strong>City:</strong> {selectedHotel.city}</p>
            <p><strong>Price:</strong> ${selectedHotel.price} / night</p>
            <p><strong>Rating:</strong> {selectedHotel.rating} Stars</p>
            <p><strong>Available Rooms:</strong> {selectedHotel.roomsAvailable}</p>
            <p><strong>Services:</strong> {selectedHotel.services.join(", ")}</p>
          </div>
        </div>
      )}

      {/* Booking Form */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="booking-card max-w-md w-full relative space-y-4">
            <button onClick={() => setShowBookingForm(false)} className="close-btn">✖</button>
            <h2 className="text-2xl font-bold border-b border-[#9DB2BF] pb-2">Book Your Stay</h2>
            <form onSubmit={handleBook} className="space-y-4">
              <div className="flex flex-col">
                <label>Select Hotel</label>
                <select value={form.hotelId} onChange={e => setForm({ ...form, hotelId: e.target.value })} required>
                  <option value="">-- Choose a hotel --</option>
                  {filteredHotels.map(h => <option key={h.id} value={h.id}>{h.name} - {h.city}</option>)}
                </select>
              </div>
              <div className="flex flex-col">
                <label>Guest Name</label>
                <input type="text" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} required/>
              </div>
              <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1">
                  <label>Check-in Date</label>
                  <input type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} required/>
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <label>Check-out Date</label>
                  <input type="date" value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} required/>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Number of Rooms</label>
                <input type="number" min="1" value={form.rooms} onChange={e => setForm({ ...form, rooms: Number(e.target.value) })} required/>
              </div>
              <button type="submit" className="confirm-btn w-full">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Card */}
      {showBookingCard && currentBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="booking-card max-w-md w-full relative">
            <button onClick={() => setShowBookingCard(false)} className="close-btn">✖</button>
            <h2 className="text-2xl font-bold border-b border-[#9DB2BF] pb-2">Booking Details</h2>
            <div className="mt-4 space-y-2">
              <p><strong>Hotel:</strong> {currentBooking.hotelName}</p>
              <p><strong>Guest:</strong> {currentBooking.customer}</p>
              <p><strong>City:</strong> {currentBooking.city}</p>
              <p><strong>Check-in:</strong> {currentBooking.checkIn}</p>
              <p><strong>Check-out:</strong> {currentBooking.checkOut}</p>
              <p><strong>Nights:</strong> {currentBooking.nights}</p>
              <p><strong>Rooms:</strong> {currentBooking.rooms}</p>
              <p><strong>Total:</strong> ${currentBooking.total}</p>
              <p><strong>Services:</strong> {currentBooking.services.join(", ")}</p>
            </div>
            <button onClick={() => handleCancel(currentBooking.id)}>Cancel Booking</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
