import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import { getBooking, getBookings } from '../Blockchain-Service';
import BookingList from '../components/BookingList';
import { getRestaurantId } from '../utils/initRestaurant';

const Admin = () => {
  const [showBookingList, setShowBookingList] = useState(false);
  const [bookingsData, setbookingsData] = useState('');
  const { isAdmin } = useContext(AdminContext);
  useEffect(() => {
    const getAllBookings = async () => {
      const restId = getRestaurantId();
      const bookings = await getBookings(restId);
      let allBookings = [];
      bookings.forEach(async (booking) => {
        allBookings.push(await getBooking(parseInt(booking._hex, 16)));
      });
      setShowBookingList(true);
      setbookingsData(allBookings);
    };
    getAllBookings();
  }, []);

  if (!isAdmin)
    return (
      <span className='notice notice--warning'>
        You don't have permission to view this page
      </span>
    );
  return (
    <div>
      <div>
        <h1>Admin</h1>
      </div>
      <div>{showBookingList && <BookingList data={bookingsData} />}</div>
    </div>
  );
};

export default Admin;
