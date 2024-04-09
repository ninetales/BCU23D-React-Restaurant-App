/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { CalendarApp } from '../calendar/CalendarApp';
import { timeToUnixConverter } from '../../utils/converter';
import {
  createBooking,
  getBooking,
  getBookings,
  updateBookingBlock,
} from '../../Blockchain-Service';
import { getRestaurantId } from '../../utils/initRestaurant';

export const BookingApp = ({ updateBooking }) => {
  const formRef = useRef(null);
  const tempRestaurantId = getRestaurantId();

  const currentDate = new Date(
    Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  )
    .toISOString()
    .slice(0, 10);

  const [initialFormData, setinitialFormData] = useState({
    restaurantId: tempRestaurantId,
    numberOfGuests: null,
    date: currentDate,
    time: null,
    name: '',
    email: '',
    phone: null,
  });

  useEffect(() => {
    setinitialFormData({
      restaurantId: tempRestaurantId,
      numberOfGuests: updateBooking
        ? parseInt(updateBooking.numberOfGuests)
        : null,
      date: updateBooking ? updateBooking.date : currentDate,
      time: updateBooking ? parseInt(updateBooking.time) : null,
      name: updateBooking ? updateBooking.name : '',
      email: '',
      phone: null,
    });
    setFormData(initialFormData);
  }, [updateBooking, currentDate]);

  const [bookedTables, setBookedTables] = useState(
    new Map([['tables', { 18: 0, 21: 0 }]])
  );
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    listTables();
  }, [formData.date]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let valueHandler;

    if (value !== '' && !isNaN(value)) {
      valueHandler = parseFloat(value);
    } else {
      valueHandler = value;
    }

    setFormData({
      ...formData,
      [name]: valueHandler,
    });
  };

  const checkAvailability = (date) => {
    formRef.current
      .querySelectorAll('input[name="time"]')
      .forEach((radioButton) => (radioButton.checked = false));
    setFormData({
      ...formData,
      ['date']: date,
      ['time']: null,
    });
  };

  const listTables = async () => {
    const bookingReferences = await getBookings(tempRestaurantId);
    const data = [];
    for (let i = 0; i < bookingReferences.length; i++) {
      const bookingId = parseInt(bookingReferences[i]._hex, 16);
      const booking = await getBooking(bookingId);

      data.push({
        date: booking.date,
        time: parseInt(booking.time._hex, 16),
      });
    }

    const bookedTablesCounter = new Map();
    bookedTablesCounter.set('tables', { 18: 0, 21: 0 });

    data.forEach((booking) => {
      if (formData.date === booking.date) {
        if (Number(booking.time) === timeToUnixConverter(18, 0)) {
          bookedTablesCounter.get('tables')[18]++;
        } else if (Number(booking.time) === timeToUnixConverter(21, 0)) {
          bookedTablesCounter.get('tables')[21]++;
        }
      }
    });

    setBookedTables(bookedTablesCounter);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    formRef.current.reset();
    formRef.current.querySelector('select').selectedIndex = 0;
  };

  const submitHandler = async () => {
    if (formValidator()) {
      if (updateBooking) {
        await updateBookingBlock(
          parseInt(updateBooking.id._hex, 16),
          formData.numberOfGuests,
          formData.name,
          formData.date,
          formData.time
        );
        setinitialFormData(formData);
        alert('Booking changed');
      } else {
        resetForm();
        await createBooking(
          formData.numberOfGuests,
          formData.name,
          formData.date,
          formData.time,
          formData.restaurantId
        );
        alert('form submited!');
      }
    } else {
      alert('Missing data, check form!');
    }
  };

  const formValidator = () => {
    let errorCounter = 0;

    // Remove any previous messages
    formRef.current.querySelectorAll('.input-message').forEach((message) => {
      message.remove();
    });

    for (const property in formData) {
      if (!formData[property] && property !== 'restaurantId') {
        const inputElement = formRef.current.querySelector(
          `[name="${property}"]`
        );
        if (inputElement !== null) {
          const parentElement = inputElement.parentNode;

          const messageElement = document.createElement('span');
          messageElement.classList.add('input-message');
          messageElement.textContent = 'This field cannot be empty';

          parentElement.insertBefore(messageElement, inputElement.nextSibling);

          errorCounter++;
        }
      }
    }

    if (errorCounter > 0) {
      return false;
    } else {
      return true;
    }
  };

  const stillBookable = (time) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const currentTime = timeToUnixConverter(hours, minutes);

    if (
      formData.date > currentDate ||
      (currentTime < time && currentDate === formData.date)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='booking-app'>
      {updateBooking ? (
        <h3>
          Change booking with id{' '}
          {updateBooking.id ? parseInt(updateBooking.id._hex, 16) : null}
        </h3>
      ) : (
        <h3>Make a reservation</h3>
      )}
      <form
        action=''
        className='booking-form'
        ref={formRef}
      >
        <div className='booking-form__people'>
          <label>
            <span>Amount of people</span>
            <select
              name='numberOfGuests'
              id=''
              required
              onChange={handleInputChange}
              defaultValue={
                updateBooking ? (updateBooking.numberOfGuests ? '4' : '0') : '0'
              }
            >
              <option
                value='0'
                disabled
              >
                Select amount
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
            </select>
          </label>
        </div>

        {formData.numberOfGuests > 0 && (
          <>
            <CalendarApp checkAvailability={checkAvailability} />

            <div className='booking-form__tables'>
              <h3>Date selected: {formData.date}</h3>
              <span>Select time:</span>
              {bookedTables.get('tables')[18] === 15 &&
                bookedTables.get('tables')[21] === 15 && (
                  <div className='notice notice--warning'>
                    <span>No available tables</span>
                  </div>
                )}
              <div className='booking-form__time'>
                {bookedTables.get('tables')[18] < 15 &&
                  stillBookable(timeToUnixConverter(18, 0)) && (
                    <label>
                      <input
                        type='radio'
                        name='time'
                        value={timeToUnixConverter(18, 0)}
                        onChange={handleInputChange}
                        checked={
                          formData.time === timeToUnixConverter(18, 0) &&
                          'checked'
                        }
                      />
                      <span>18:00</span>
                    </label>
                  )}
                {bookedTables.get('tables')[21] < 15 &&
                  stillBookable(timeToUnixConverter(21, 0)) && (
                    <label>
                      <input
                        type='radio'
                        name='time'
                        value={timeToUnixConverter(21, 0)}
                        onChange={handleInputChange}
                        checked={
                          formData.time === timeToUnixConverter(21, 0) &&
                          'checked'
                        }
                      />
                      <span>21:00</span>
                    </label>
                  )}
              </div>
            </div>
          </>
        )}

        {formData.time && (
          <div className='booking-form__contact-details'>
            <label>
              <span>Name</span>
              <input
                type='text'
                name='name'
                value={formData.name}
                required
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type='email'
                name='email'
                required
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Phone</span>
              <input
                type='text'
                name='phone'
                required
                onChange={handleInputChange}
              />
            </label>

            <div className='booking-form__action-con'>
              <button
                className='save'
                onClick={(e) => {
                  e.preventDefault();
                  submitHandler();
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>

            <div className='policy-info'>
              <p>
                By submitting this form, you consent to the processing of your
                personal data in accordance with our Privacy Policy and GDPR
                regulations.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
