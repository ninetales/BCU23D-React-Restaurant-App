import { Link } from 'react-router-dom';

const BookingList = ({ data }) => {
  return (
    <div className='booking-list'>
      <div className='booking-div bookings-header'>
        <p>Name</p>
        <p>Date</p>
        <p>Guests</p>
        <p>Time</p>
        <p>ID</p>
        <p>Delete</p>
        <p>Update</p>
      </div>
      {data.map((booking, index) => (
        <div
          key={index}
          className='booking-div'
        >
          <p>{booking.name}</p>
          <p>{booking.date}</p>
          <p>{parseInt(booking.numberOfGuests._hex, 16)}</p>
          <p>{parseInt(booking.time._hex, 16)}</p>
          <p>{parseInt(booking.id._hex, 16)}</p>
          <button id='delete-btn'>Delete</button>
          <Link to={`/admin/${parseInt(booking.id._hex, 16)}`}>
            Edit Booking
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookingList;
