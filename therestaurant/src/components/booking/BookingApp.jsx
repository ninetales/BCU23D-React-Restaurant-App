import React from 'react';
import { CalendarApp } from '../calendar/CalendarApp';

export const BookingApp = () => {
  const checkAvailability = (date) => {
    console.log('checking date', date);
  };

  return (
    <div className="booking-app">
      <form action="" className="booking-form">
        <CalendarApp checkAvailability={checkAvailability} />
      </form>
    </div>
  );
};
