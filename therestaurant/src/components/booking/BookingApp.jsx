import React, { useEffect, useState, useRef } from 'react';
import { CalendarApp } from '../calendar/CalendarApp';
import { dummyData } from './dummyData';

export const BookingApp = () => {
  const formRef = useRef(null);
  const currentDate = new Date(
    Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  )
    .toISOString()
    .slice(0, 10);

  const initialFormData = {
    restaurantId: null,
    numberOfGuests: null,
    date: currentDate,
    time: null,
    name: '',
    email: '',
    phone: null,
  };

  const [bookedTables, setBookedTables] = useState(
    new Map([['tables', { 18: 0, 21: 0 }]])
  );
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    listTables();
  }, [formData.date]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('handling', name, value);

    const valueHandler = !isNaN(value) ? parseFloat(value) : value;

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

  const listTables = () => {
    // ====================================================
    // await the booking data here <--
    const data = dummyData; //  <-- replace
    // =====================================================

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

    console.log('checking tables count at 18', bookedTables.get('tables')[18]);
    console.log('checking tables count at 21', bookedTables.get('tables')[21]);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    formRef.current.reset();
    formRef.current.querySelector('select').selectedIndex = 0;
  };

  const submitHandler = () => {
    if (formValidator()) {
      resetForm();
      alert('form summited!');
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
        if (inputElement) {
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

  const timeToUnixConverter = (hours, minutes) => {
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return Math.floor(date.getTime() / 1000);
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
    <div className="booking-app">
      {console.log('the form data', formData)}
      <h3>Make a reservation</h3>
      <form action="" className="booking-form" ref={formRef}>
        <div className="booking-form__people">
          <label>
            <span>Amount of people</span>
            <select
              name="numberOfGuests"
              id=""
              required
              onChange={handleInputChange}
            >
              <option value="" selected disabled>
                Select amount
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </label>
        </div>

        {formData.numberOfGuests > 0 && (
          <>
            <CalendarApp checkAvailability={checkAvailability} />

            <div className="booking-form__tables">
              <h3>Date selected: {formData.date}</h3>
              <span>Select time:</span>
              {bookedTables.get('tables')[18] === 15 &&
                bookedTables.get('tables')[21] === 15 && (
                  <div className="notice notice--warning">
                    <span>No available tables</span>
                  </div>
                )}
              <div className="booking-form__time">
                {bookedTables.get('tables')[18] < 15 &&
                  stillBookable(timeToUnixConverter(18, 0)) && (
                    <label>
                      <input
                        type="radio"
                        name="time"
                        value={timeToUnixConverter(18, 0)}
                        onChange={handleInputChange}
                      />
                      <span>18:00</span>
                    </label>
                  )}
                {bookedTables.get('tables')[21] < 15 &&
                  stillBookable(timeToUnixConverter(21, 0)) && (
                    <label>
                      <input
                        type="radio"
                        name="time"
                        value={timeToUnixConverter(21, 0)}
                        onChange={handleInputChange}
                      />
                      <span>21:00</span>
                    </label>
                  )}
              </div>
            </div>
          </>
        )}

        {formData.time && (
          <div className="booking-form__contact-details">
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                required
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                required
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                required
                onChange={handleInputChange}
              />
            </label>

            <div className="booking-form__action-con">
              <button
                className="save"
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

            <div className="policy-info">
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
