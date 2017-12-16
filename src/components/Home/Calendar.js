import React, { Component } from 'react'

import GoogleCalendarApi from 'googleCalendarApi'

const moment = require('moment');

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:         '',
      month:        '',
      daysInMonth:  '',
      startDay:     '',
      bookingStart: '',
      bookingEnd:   ''
    };
    this.updateCalendarFacts = this.updateCalendarFacts.bind(this);
    this.changeMonth         = this.changeMonth.bind(this);
    this.bookingDates        = this.bookingDates.bind(this);
    this.clearCalendar       = this.clearCalendar.bind(this);
  }

  componentDidMount() {
    const calendar = new GoogleCalendarApi();
    const date     = new Date();
    this.updateCalendarFacts(date);
  }

  updateCalendarFacts(date) {
    const month       = date.getMonth();
    const daysInMonth = moment(date).daysInMonth();
    let startDay      = moment(date).startOf('month').toDate().getDay();
    if(startDay === 0) { startDay = 7 } // Change Sunday from 0 to day 7
    this.setState({
      date:  date,
      month: month,
      daysInMonth: daysInMonth,
      startDay: startDay
    })
  }

  changeMonth(direction) {
    let momentDate = moment(this.state.date);
    let nextMonth = direction === 'up' ? momentDate.add(1, 'M') : momentDate.subtract(1, 'M');
    this.updateCalendarFacts(nextMonth.toDate())
  }

  bookingDates(date) {
    let dateFormatted = Date.parse(date);
    let startDate = this.state.bookingStart;
    let endDate   = this.state.bookingEnd;

    if(startDate === "") {
      this.setState({
        bookingStart: date
      })
    } else if( dateFormatted < Date.parse(startDate)) {
      this.setState({
        bookingStart: date
      })
    } else if(dateFormatted === Date.parse(startDate)) {
      this.setState({
        bookingStart: ''
      })
    } else if(dateFormatted === Date.parse(endDate)) {
      this.setState({
        bookingEnd: ''
      })
    } else if(dateFormatted > Date.parse(startDate)) {
      this.setState({
        bookingEnd: date
      })
    }
  }

  clearCalendar() {
    this.setState({
      bookingStart: '',
      bookingEnd:   ''
    })
  }

  render() {
    const monthName   = moment.months()[this.state.month];
    const year        = moment(this.state.date).format("YYYY")
    const changeMonth = this.changeMonth;

    const daysInMonth = this.state.daysInMonth;
    const startDay    = this.state.startDay;
    let calendar      = new Array;
    for(let i = 1; i < daysInMonth + startDay; i++) {
      let day = i - startDay + 1;

      if(i < (startDay)) {
        calendar.push(<li className="emptyDay" key={i}></li>);
      } else {
        let date = moment(this.state.date).startOf('month').add(day - 1, 'd').toDate();
        let dateMatch =
          Date.parse(this.state.bookingStart) === Date.parse(date) ||
          Date.parse(this.state.bookingEnd) === Date.parse(date) ||
          Date.parse(date)  >= Date.parse(this.state.bookingStart) &&
          Date.parse(date)  <= Date.parse(this.state.bookingEnd);
        let backgroundColor = dateMatch ? "selectedDate" : "calendarDay";
        calendar.push(<li className={backgroundColor} key={i} onClick={() => this.bookingDates(date)}>{day}</li>);
      }
    }

    return (
      <div>
        <h1>Calendar Component</h1>
        <ul id="calendar">
          <ul id="datePicker">
            <li onClick={() => this.changeMonth('down')}><i className="fa fa-chevron-left"></i></li>
            <li>{`${monthName} ${year}`}</li>
            <li onClick={() => this.changeMonth('up')}><i className="fa fa-chevron-right"></i></li>
          </ul>
          <ul id="daysOfWeek">
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
            <li>Sun</li>
          </ul>
          {calendar}
          <ul className="clear-dates" onClick={() => this.clearCalendar()}>
            <li>Clear Dates</li>
          </ul>
        </ul>
      </div>
    );
  }
}

export default Calendar;
