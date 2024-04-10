import { Link } from 'react-router-dom';
import { unixToTimeConverter } from '../utils/converter';

const BookingList = ({ data, deleteBooking }) => {
  return (
    <div className="booking-list">
      <div className="booking-div bookings-header">
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
            <div key={index} className="booking-div">
              <p>{booking.name}</p>
              <p>{booking.date}</p>
              <p>{parseInt(booking.numberOfGuests._hex, 16)}</p>
              <p>{unixToTimeConverter(booking.time)}</p>
              <p>{parseInt(booking.id._hex, 16)}</p>
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
