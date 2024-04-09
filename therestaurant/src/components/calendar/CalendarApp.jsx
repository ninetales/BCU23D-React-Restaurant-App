import React, { useEffect, useState } from 'react';

export const CalendarApp = ({ checkAvailability }) => {
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  const [data, setData] = useState({});
  const [calendarDays, setCalendarDays] = useState([]);

  const nextMonth = () => {
    setDisplayMonth(displayMonth + 1);
  };

  const prevMonth = () => {
    if (new Date().getMonth() < displayMonth) {
      setDisplayMonth(displayMonth - 1);
    }
  };

  useEffect(() => {
    setData(dateHandler(displayMonth));
    dayHandler();
  }, [displayMonth]);

  useEffect(() => {
    dayHandler();
  }, [data]);

  const dayHandler = () => {
    const days = Array.from({ length: data.daysInMonth }, (_, index) => {
      return {
        dayNumber: index + 1,
        date: new Date(Date.UTC(data.currentYear, data.currentMonth, index + 1))
          .toISOString()
          .slice(0, 10),
      };
    });

    const emptySlots = Array.from(
      { length: data.firstDayOfMonthIndex - 1 },
      (_, index) => {
        return {};
      }
    );

    const temp = [...emptySlots, ...days];
    setCalendarDays(temp);
  };

  const dateHandler = (month) => {
    const date = new Date();
    month && date.setMonth(month);

    return {
      currentYear: date.getFullYear(),
      currentMonthName: date.toLocaleString('default', { month: 'long' }),
      currentDay: !month ? date.getDay() : null,
      currentDate: new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
      )
        .toISOString()
        .slice(0, 10),
      bookableTimespan: new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 10
        )
      )
        .toISOString()
        .slice(0, 10),
      currentMonth: date.getMonth(),
      daysInMonth: new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate(),
      firstDayOfMonthIndex: new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getDay(), // Returns the day as index, starts on sunday with 0
    };
  };

  return (
    <div className="calendar-app">
      <div className="calendar-app__header">
        <div className="calendar-app__month">
          <button
            onClick={(e) => {
              e.preventDefault();
              prevMonth();
            }}
          >
            Prev
          </button>
          <span>{data.currentMonthName}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              nextMonth();
            }}
          >
            Next
          </button>
        </div>
        <ul className="calendar-app__days calendar-app__columns">
          <li>
            <span>Mon</span>
          </li>
          <li>
            <span>Tue</span>
          </li>
          <li>
            <span>Wed</span>
          </li>
          <li>
            <span>Thu</span>
          </li>
          <li>
            <span>Fri</span>
          </li>
          <li>
            <span>Sat</span>
          </li>
          <li>
            <span>Sun</span>
          </li>
        </ul>
      </div>

      <div className="calendar-app__main">
        <ul className="calendar-app__columns">
          {calendarDays.map((day, index) => {
            if (day.date >= data.currentDate) {
              return (
                <li key={index}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      checkAvailability(day.date);
                    }}
                  >
                    <span>
                      <i
                        className={
                          day.date === data.currentDate ? 'current-date' : ''
                        }
                      >
                        {day.dayNumber}
                      </i>
                    </span>
                  </button>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <span className="calendar-app__inactive">
                    {day.dayNumber}
                  </span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
