// src/components/Calendar.js
class Calendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    this.currentDate = new Date();
    this.selectedDate = null; // Track the selected date
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .calendar {
          font-family: Arial, sans-serif;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          width: 300px;
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        .calendar-day {
          padding: 10px;
          text-align: center;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        .calendar-day:hover {
          background-color: #f0f0f0;
        }
        .calendar-day.today {
          background-color: #add8e6; /* Light blue for current date */
        }
        .calendar-day.selected {
          background-color: #ffffcc; /* Light yellow for selected date */
        }
        .events {
          margin-top: 10px;
        }
        .event-form {
          margin-top: 10px;
        }
        .event-form input, .event-form select {
          margin-top: 5px;
          width: 100%;
          padding: 5px;
        }
      </style>
      <div class="calendar">
        <div class="calendar-header">
          <button id="prev-month">←</button>
          <h3 id="current-month"></h3>
          <button id="next-month">→</button>
        </div>
        <div class="calendar-days" id="days"></div>
        <div class="events" id="events"></div>
        <div class="event-form">
          <input type="date" id="event-date">
          <input type="text" id="event-title" placeholder="Event title">
          <select id="event-color">
            <option value="#ffcccc">Red</option>
            <option value="#ccffcc">Green</option>
            <option value="#ccccff">Blue</option>
            <option value="#ffffcc">Yellow</option>
          </select>
          <button id="add-event">Add Event</button>
        </div>
      </div>
    `;

    this.renderCalendar();
    this.shadowRoot.getElementById('prev-month').addEventListener('click', () => this.changeMonth(-1));
    this.shadowRoot.getElementById('next-month').addEventListener('click', () => this.changeMonth(1));
    this.shadowRoot.getElementById('add-event').addEventListener('click', () => this.addEvent());
  }

  renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();

    // Update the current month header
    this.shadowRoot.getElementById('current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Render the days of the month
    const daysDiv = this.shadowRoot.getElementById('days');
    daysDiv.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day';
      dayDiv.textContent = i;

      // Highlight today's date
      const today = new Date();
      if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        dayDiv.classList.add('today');
      }

      // Highlight selected date
      if (this.selectedDate && i === this.selectedDate.getDate() && currentMonth === this.selectedDate.getMonth() && currentYear === this.selectedDate.getFullYear()) {
        dayDiv.classList.add('selected');
      }

      dayDiv.addEventListener('click', () => this.selectDate(new Date(currentYear, currentMonth, i)));
      daysDiv.appendChild(dayDiv);
    }
  }

  selectDate(date) {
    // Update the selected date
    this.selectedDate = date;

    // Re-render the calendar to apply highlights
    this.renderCalendar();

    // Show events for the selected date
    this.showEvents(date);
  }

  showEvents(date) {
    const eventsDiv = this.shadowRoot.getElementById('events');
    const eventsForDate = this.events.filter(event => new Date(event.date).toDateString() === date.toDateString());

    eventsDiv.innerHTML = eventsForDate.length > 0
      ? eventsForDate.map(event => `
          <div style="background-color: ${event.color}; padding: 5px; margin: 5px 0; border-radius: 5px;">
            <strong>${event.title}</strong>
            <p>${new Date(event.date).toLocaleTimeString()}</p>
            <button onclick="this.parentElement.remove()">Remove</button>
          </div>
        `).join('')
      : '<p>No events for this day.</p>';
  }

  addEvent() {
    const eventDate = this.shadowRoot.getElementById('event-date').value;
    const eventTitle = this.shadowRoot.getElementById('event-title').value;
    const eventColor = this.shadowRoot.getElementById('event-color').value;

    if (!eventDate || !eventTitle) {
      alert('Please fill in all fields.');
      return;
    }

    const newEvent = {
      date: eventDate,
      title: eventTitle,
      color: eventColor,
    };

    this.events.push(newEvent);
    localStorage.setItem('calendarEvents', JSON.stringify(this.events));
    this.showEvents(new Date(eventDate));
  }

  changeMonth(offset) {
    this.currentDate.setMonth(this.currentDate.getMonth() + offset);
    this.selectedDate = null; // Clear selected date when changing months
    this.renderCalendar();
  }
}

customElements.define('custom-calendar', Calendar);
