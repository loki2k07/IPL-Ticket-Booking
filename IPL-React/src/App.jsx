
import { useState } from 'react'
import './App.css'

// Navbar Component
function Navbar() {
  return (
    <nav>
      <h2>🏏 IPL 2026 Ticket Booking</h2>
      <a href="#matches">Matches</a>
      <a href="#bookings">My Bookings</a>
    </nav>
  )
}

// Hero Component
function Hero() {
  return (
    <div className="hero-section">
      <h1>Welcome to IPL 2026! 🏏</h1>
      <h2>Experience the Excitement of Cricket</h2>
      <p>
        Book your tickets and enjoy thrilling IPL matches
        with your favourite teams!
      </p>
      <a href="#matches" className="hero-button">
        Explore Matches
      </a>
    </div>
  )
}

// Match Card Component
function MatchCard(props) {
  const [tickets, setTickets] = useState(1)
  const [name, setName] = useState('')
  const [booking, setBooking] = useState(null)

  const total = tickets * props.price

  function bookTickets() {
    if (name.trim() === '') {
      alert('Please enter your name!')
      return
    }

    const newBooking = {
      id: 'IPL' + Date.now(),
      customer: name.trim(),
      team1: props.team1,
      team2: props.team2,
      venue: props.venue,
      date: props.date,
      tickets: tickets,
      total: total
    }

    setBooking(newBooking)
    props.onBook(newBooking)
  }

  return (
    <div className="match-card">
      <h2>{props.team1} VS {props.team2}</h2>

      <p>📍 Venue: {props.venue}</p>
      <p>📅 Match Date: {props.date}</p>
      <p>🎟️ Ticket Price: ₹{props.price}</p>

      <hr />

      <p>Tickets: {tickets}</p>
      <p className="total">Total Amount: ₹{total}</p>

      <div className="ticket-buttons">
        <button onClick={() => {
          setTickets(tickets + 1)
          setBooking(null)
        }}>
          + Add Ticket
        </button>

        <button
          onClick={() => {
            setTickets(tickets - 1)
            setBooking(null)
          }}
          disabled={tickets === 1}
        >
          - Remove Ticket
        </button>
      </div>

      <hr />

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setBooking(null)
        }}
      />

      <button className="book-button" onClick={bookTickets}>
        Book Tickets
      </button>

      {booking && (
        <div className="confirmation">
          <h3>🎉 Booking Confirmed!</h3>
          <p>Name: {booking.customer}</p>
          <p>Booking ID: {booking.id}</p>
          <p>Match: {booking.team1} VS {booking.team2}</p>
          <p>Tickets: {booking.tickets}</p>
          <p>Total: ₹{booking.total}</p>
        </div>
      )}
    </div>
  )
}

// My Bookings Component
function MyBookings(props) {
  return (
    <section className="bookings-section" id="bookings">
      <h1>My Bookings 🎟️</h1>

      {props.bookings.length === 0 ? (
        <p className="empty-message">
          No bookings yet. Book your favourite IPL match!
        </p>
      ) : (
        <div className="booking-list">
          {props.bookings.map((booking) => (
            <div className="booking-item" key={booking.id}>
              <h3>
                {booking.team1} VS {booking.team2}
              </h3>
              <p>Booking ID: {booking.id}</p>
              <p>Customer: {booking.customer}</p>
              <p>Venue: {booking.venue}</p>
              <p>Date: {booking.date}</p>
              <p>Tickets: {booking.tickets}</p>
              <p>Total Amount: ₹{booking.total}</p>
              <span>Confirmed ✓</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

// Main App Component
function App() {
  const [bookings, setBookings] = useState([])

  // IPL Match Details
  const matches = [
    {
      id: 1,
      team1: 'CSK',
      team2: 'RCB',
      venue: 'Bengaluru',
      date: '15 December 2026',
      price: 1500
    },
    {
      id: 2,
      team1: 'MI',
      team2: 'SRH',
      venue: 'Mumbai',
      date: '18 December 2026',
      price: 1800
    },
    {
      id: 3,
      team1: 'KKR',
      team2: 'RR',
      venue: 'Kolkata',
      date: '20 December 2026',
      price: 1200
    }
  ]

  function addBooking(newBooking) {
    setBookings((previousBookings) => [
      newBooking,
      ...previousBookings
    ])
  }

  return (
    <>
      <Navbar />

      <Hero />

      <main>
        <section id="matches">
          <h1 className="section-heading">
            Available IPL Matches
          </h1>

          <p className="section-description">
            Choose your favourite match and book your tickets!
          </p>

          <div className="matches-container">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                team1={match.team1}
                team2={match.team2}
                venue={match.venue}
                date={match.date}
                price={match.price}
                onBook={addBooking}
              />
            ))}
          </div>
        </section>

        <MyBookings bookings={bookings} />
      </main>

      <footer>
        <p>© 2026 IPL Ticket Booking | React Project</p>
      </footer>
    </>
  )
}

export default App
