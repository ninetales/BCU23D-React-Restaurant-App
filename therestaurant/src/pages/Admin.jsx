import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import {
  createRestaurant,
  createBooking,
  getBookingCount,
  getBooking,
} from '../Blockchain-Service';

const Admin = () => {
  const { isAdmin } = useContext(AdminContext);
  if (!isAdmin) return "You don't have permission to view this page";
  return (
    <div>
      <button onClick={async () => await createRestaurant('Test')}>
        Create Restaurant
      </button>
      <button
        onClick={async () =>
          await createBooking(2, 'Dalle', '20240405', 1900, 10)
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
          console.log(allBookings);
        }}
      >
        Get All Bookings
      </button>
    </div>
  );
};

export default Admin;
