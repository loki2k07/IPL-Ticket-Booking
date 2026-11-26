
import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function App() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingDetails, setBookingDetails] = useState({})
  const [message, setMessage] = useState('')
  const [bookingMatchId, setBookingMatchId] = useState(null)

  useEffect(() => {
    getMatches()
  }, [])

  async function getMatches() {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('id')

    if (error) {
      console.error(error)
      setMessage('Unable to load matches: ' + error.message)
    } else {
      setMatches(data || [])
    }

    setLoading(false)
  }

  function handleChange(matchId, field, value) {
    setBookingDetails(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: value
      }
    }))
  }

  async function bookTickets(match) {
    const details = bookingDetails[match.id]
    const customerName = details?.name?.trim()
    const tickets = Number(details?.tickets)

    if (!customerName) {
      setMessage('Please enter your name.')
      return
    }

    if (!Number.isInteger(tickets) || tickets < 1) {
      setMessage('Please select at least 1 ticket.')
      return
    }

    if (tickets > match.available_seats) {
      setMessage('Not enough seats available.')
      return
    }

    setBookingMatchId(match.id)
    setMessage('')

    const { data, error } = await supabase.rpc('book_tickets', {
      p_match_id: match.id,
      p_user_name: customerName,
      p_tickets: tickets
    })

    setBookingMatchId(null)

    if (error) {
      console.error('Booking error:', error)
      setMessage('Booking failed: ' + error.message)
      return
    }

    setMessage(
      `Booking successful! Booking ID: ${data}. ${tickets} ticket(s) booked for ${customerName}.`
    )

    setBookingDetails(prev => ({
      ...prev,
      [match.id]: {
        name: '',
        tickets: ''
      }
    }))

    await getMatches()
  }

  return (
    <div style={{
      padding: '30px',
      fontFamily: 'Arial',
      backgroundColor: '#f4f4f4',
      minHeight: '100vh'
    }}>

      <h1 style={{ textAlign: 'center', color: '#e65100' }}>
        IPL 2026 Ticket Booking
      </h1>

      {loading ? (
        <h3>Loading matches...</h3>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>

          {matches.map(match => (
            <div key={match.id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>

              <h2 style={{ color: '#d84315' }}>
                {match.team1} VS {match.team2}
              </h2>

              <p><b>Date:</b> {match.date}</p>
              <p><b>Venue:</b> {match.venue}</p>
              <p><b>Ticket Price:</b> ₹{match.price}</p>

              <p>
                <b>Available Seats:</b> {match.available_seats}
              </p>

              <input
                type="text"
                placeholder="Enter your name"
                value={bookingDetails[match.id]?.name || ''}
                onChange={e =>
                  handleChange(match.id, 'name', e.target.value)
                }
                style={{
                  width: '95%',
                  padding: '10px',
                  marginBottom: '10px'
                }}
              />

              <input
                type="number"
                min="1"
                max={match.available_seats}
                placeholder="Number of tickets"
                value={bookingDetails[match.id]?.tickets || ''}
                onChange={e =>
                  handleChange(match.id, 'tickets', e.target.value)
                }
                style={{
                  width: '95%',
                  padding: '10px',
                  marginBottom: '10px'
                }}
              />

              <p>
                <b>Total Price:</b> ₹
                {Number(match.price) *
                  Number(bookingDetails[match.id]?.tickets || 0)}
              </p>

              <button
                onClick={() => bookTickets(match)}
                disabled={
                  bookingMatchId === match.id ||
                  match.available_seats === 0
                }
                style={{
                  backgroundColor: '#e65100',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                {bookingMatchId === match.id
                  ? 'Booking...'
                  : 'Book Tickets'}
              </button>

            </div>
          ))}

        </div>
      )}

      {message && (
        <h3 style={{
          textAlign: 'center',
          marginTop: '25px',
          color: message.startsWith('Booking successful')
            ? 'green'
            : 'red'
        }}>
          {message}
        </h3>
      )}

    </div>
  )
}

export default App
