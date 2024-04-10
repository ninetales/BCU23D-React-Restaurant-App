import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  getBooking,
  getBookings,
  removeBooking,
  getBookingCount,
} from "../Blockchain-Service";
import { getRestaurantId } from '../utils/initRestaurant'

const BookingList = ({ data }) => {
  const [trigger, setTrigger] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  
    const getAllBookings = async () => {
      const restId = getRestaurantId();
      const bookings = await getBookings(restId);
      let newBookings = [];

      for (const booking of bookings) {
          const newBooking = await getBooking(parseInt(booking._hex, 16));
          newBookings.push(newBooking);
      }
      setBookings(newBookings);
    };
    getAllBookings();
  }, [trigger]);

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
      {bookings.length > 0
        ? bookings.map((booking, index) => {
            if (parseInt(booking.id._hex) == "") return null;
            return (
              <div key={index} className="booking-div">
                <p>{booking.name}</p>
                <p>{booking.date}</p>
                <p>{parseInt(booking.numberOfGuests._hex, 16)}</p>
                <p>{parseInt(booking.time._hex, 16)}</p>
                <p>{parseInt(booking.id._hex, 16)}</p>
                <button
                  id="delete-btn"
                  onClick={async () => {
                    const res = await removeBooking(
                      parseInt(booking.id._hex, 16)
                    );
                    setTrigger(!trigger);
                  }}
                >
                  Delete
                </button>
                <Link to={`/admin/${parseInt(booking.id._hex, 16)}`}>
                  Edit Booking
                </Link>
              </div>
            );
          })
        : data.map((booking, index) => {
            if (parseInt(booking.id._hex) == "") return null;
            return (
              <div key={index} className="booking-div">
                <p>{booking.name}</p>
                <p>{booking.date}</p>
                <p>{parseInt(booking.numberOfGuests._hex, 16)}</p>
                <p>{parseInt(booking.time._hex, 16)}</p>
                <p>{parseInt(booking.id._hex, 16)}</p>
                <button
                  id="delete-btn"
                  onClick={async () => {
                    const res = await removeBooking(
                      parseInt(booking.id._hex, 16)
                    );
                    setTrigger(!trigger);
                  }}
                >
                  Delete
                </button>
                <Link to={`/admin/${parseInt(booking.id._hex, 16)}`}>
                  Edit Booking
                </Link>
              </div>
            );
          })}
    </div>
  );
};

export default BookingList;
