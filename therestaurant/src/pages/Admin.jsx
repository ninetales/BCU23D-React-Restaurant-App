import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import { getBooking, getBookings, removeBooking } from '../Blockchain-Service';
import BookingList from '../components/BookingList';
import { getRestaurantId } from '../utils/initRestaurant';
import { LoadingAnimation } from '../components/LoadingAnimation';

const Admin = () => {
  const [showBookingList, setShowBookingList] = useState(false);
  const [bookingsData, setbookingsData] = useState([]);
  const { isAdmin } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(getAllBookings, 2000); // Just to show the animation
    // getAllBookings();
  }, []);

  const getAllBookings = async () => {
    const restId = getRestaurantId();
    const bookings = await getBookings(restId);
    let allBookings = [];
    for (const booking of bookings) {
      allBookings.push(await getBooking(parseInt(booking._hex, 16)));
    }
    setShowBookingList(true);
    setbookingsData(allBookings);
    setIsLoading(false);
  };

  const deleteBooking = async (id) => {
    const result = await removeBooking(id);
    if (result) {
      getAllBookings();
    } else {
      console.log('Was not able to remove booking...');
    }
  };

  if (!isAdmin)
    return (
      <span className="notice notice--warning">
        You don't have permission to view this page
      </span>
    );

  if (isLoading) {
    return <LoadingAnimation />;
  } else {
    return (
      <div>
        <div>
          <h1>Admin</h1>
        </div>
        <div>
          {showBookingList && (
            <BookingList data={bookingsData} deleteBooking={deleteBooking} />
          )}
        </div>
      </div>
    );
  }
};

export default Admin;
