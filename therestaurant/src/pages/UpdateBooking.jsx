import { BookingApp } from '../components/booking/BookingApp';
import { useParams } from 'react-router';
import { getBooking } from '../Blockchain-Service';
import { useEffect, useState } from 'react';

const UpdateBooking = () => {
  const { id } = useParams();
  const [booking, setbooking] = useState();

  useEffect(() => {
    const runQuery = async () => {
      try {
        const result = await getBooking(id);
        setbooking(result);
      } catch (error) {
        console.error(error);
      }
    };
    runQuery();
  }, [id]);
  return (
    <div>
      <BookingApp updateBooking={booking} />
    </div>
  );
};

export default UpdateBooking;
