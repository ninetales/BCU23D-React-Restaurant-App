import { useContext, useState } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import {
  createRestaurant,
  createBooking,
  getBookingCount,
  getBooking,
  getBookings,
} from '../Blockchain-Service';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import BookingList from "../components/BookingList";

const Admin = () => {
  const [showBookingList, setShowBookingList] = useState(false);
  const [bookingsData, setbookingsData] = useState("");
  const { isAdmin } = useContext(AdminContext);
  if (!isAdmin)
    return (
      <span className="notice notice--warning">
        You don't have permission to view this page
      </span>
    );
  return (
    <div>
      <div>
      <h1>Admin</h1>

      <button onClick={async () => await createRestaurant('Test')}>
        Create Restaurant
      </button>
      <button
        onClick={async () =>
          await createBooking(2, 'Dalle', '20240405', 1900, 1)
        }
      >
        Create Booking
      </button>
      <button
        onClick={async () => {
          const count = await getBookingCount();
          const decimal = parseInt(count._hex);
          console.log(count._hex, decimal);
        }}
      >
        Get Booking Count
      </button>
      <button
        onClick={async () => {
          let allBookings = [];
          const count = await getBookingCount();
          const decimal = parseInt(count._hex);
          for (let i = 1; i < decimal + 1; i++) {
            allBookings.push(await getBooking(i));
          }
          setShowBookingList(true)
          setbookingsData(allBookings)
          console.log(allBookings);
        }}
      >
        Get All Bookings
      </button>
      <button
        onClick={async () => {
          const bookings = await getBookings(1);
          console.log(bookings);
        }}
      >
        Get Bookings By RestaurantId
      </button>
      </div>
      <div>
      {showBookingList && <BookingList data={bookingsData}/>}
      </div>
    </div>
  );
};

export default Admin;
