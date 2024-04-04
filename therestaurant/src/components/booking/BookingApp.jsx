import React, { useEffect, useState } from 'react';
import { CalendarApp } from '../calendar/CalendarApp';

export const BookingApp = () => {
  const currentDate = new Date(
    Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  )
    .toISOString()
    .slice(0, 10);
  const [dateAvailability, setDateAvailability] = useState(currentDate);

  const temp = [
    {
      time: '18:00',
      date: '2024-04-04',
    },
  ];

  useEffect(() => {
    listTables();
  }, [dateAvailability]);

  const checkAvailability = (date) => {
    setDateAvailability(date);
  };

  const listTables = () => {
    console.log('listing tables');
  };

  return (
    <div className="booking-app">
      <form action="" className="booking-form">
        <CalendarApp checkAvailability={checkAvailability} />
        <div className="tables">
          <h3>Available tables: {dateAvailability}</h3>
          <ul className="tables-list">
            <li>Table</li>
            <li>Table</li>
            <li>Table</li>
            <li>Table</li>
            <li>Table</li>
          </ul>
        </div>
      </form>
    </div>
  );
};
