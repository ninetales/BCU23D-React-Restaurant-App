import { Link } from 'react-router-dom';
import { unixToTimeConverter } from '../utils/converter';

const BookingList = ({ data, deleteBooking }) => {
  return (
    <div className="booking-list">
      <div className="bookings-header">
        <p>Name</p>
        <p>Date</p>
        <p>Guests</p>
        <p>Time</p>
        <p>ID</p>
        <p>Delete</p>
        <p>Update</p>
      </div>
      {data.length > 0 ? (
        data.map((booking, index) => {
          if (parseInt(booking.id._hex) == '') return null;
          return (
            <div key={index} className="booking-div booking-columns">
              <span className="booking-columns__name">{booking.name}</span>
              <span className="booking-columns__date">{booking.date}</span>
              <span className="booking-columns__guests">
                {parseInt(booking.numberOfGuests._hex, 16)}
              </span>
              <span className="booking-columns__time">
                {unixToTimeConverter(booking.time)}
              </span>
              <span className="booking-columns__id">
                {parseInt(booking.id._hex, 16)}
              </span>
              <button
                className="delete-btn"
                onClick={async () => {
                  deleteBooking(parseInt(booking.id._hex, 16));
                }}
              >
                Delete
              </button>
              <Link
                to={`/admin/${parseInt(booking.id._hex, 16)}`}
                className="edit-btn action-button"
              >
                Edit Booking
              </Link>
            </div>
          );
        })
      ) : (
        <span className="notice notice--info">No bookings to show...</span>
      )}
    </div>
  );
};

export default BookingList;
