import { Link } from 'react-router-dom';
import { removeBooking } from "../Blockchain-Service";

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
      {data.map((booking, index) => {
        if (parseInt(booking.id._hex) == '') return;
        else {
          return (
            <div
              key={index}
              className='booking-div'
            >
              <p>{booking.name}</p>
              <p>{booking.date}</p>
              <p>{parseInt(booking.numberOfGuests._hex, 16)}</p>
              <p>{parseInt(booking.time._hex, 16)}</p>
              <p>{parseInt(booking.id._hex, 16)}</p>
              <button id='delete-btn' onClick={async () => {
                const res = await removeBooking(parseInt(booking.id._hex, 16))
                console.log(res);
              }}>Delete</button>
              <Link to={`/admin/${parseInt(booking.id._hex, 16)}`}>
                Edit Booking
              </Link>
            </div>
      )}
        
      })}
    </div>
  );
};

export default BookingList;
