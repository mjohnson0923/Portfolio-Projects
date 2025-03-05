# Interactive Dashboard with Web Components

*An interactive dashboard featuring a weather widget, a calendar with event management, and a to-do list.*

---

## Overview
This project is an **interactive dashboard** built using **Web Components**. It features:
1. **Weather Widget**:
   - Fetches real-time weather data using the **AccuWeather API**.
   - Allows users to search for weather by postal code.
   - Displays weather conditions with animations (e.g., sun, clouds, rain).
   - Shows temperature in **Fahrenheit**.

2. **Calendar Component**:
   - An interactive calendar where users can:
     - Add, remove, and view events.
     - Assign colors to events for better organization.
     - Highlight the **current date** and a **selected date** simultaneously.
   - Events are stored in `localStorage` for persistence.

3. **To-Do List**:
- Add Tasks: Enter a task and click **Add** to save it.
- Mark as Completed:
  - Check the checkbox next to a task to mark it as completed (strikethrough).
  - Uncheck the checkbox to remove the strikethrough.
- Persistent Storage: Tasks and their completion status are saved in `localStorage` and persist across page reloads.

This project demonstrates modern frontend development practices, including modular architecture, API integration, and dynamic user interfaces.

---

## Features
### Weather Widget
- **Search by Postal Code**: Enter a postal code to get real-time weather data.
- **Weather Animations**: Visual icons (e.g., ☀️, ☁️, 🌧️) based on current conditions.
- **Temperature Display**: Shows temperature in Fahrenheit.

### Calendar Component
- **Current Date Highlight**: The current date is highlighted in **light blue**.
- **Selectable Dates**: Click on any date to highlight it in **light yellow**.
- **Event Management**:
  - Add events with a title, date, and color.
  - View events for a specific date.
  - Remove events dynamically.
- **Persistent Storage**: Events are saved in `localStorage` and persist across page reloads.

### To-Do List
- **Add Tasks**: Enter a task and click **Add** to save it.
- **Mark as Completed**: Click on a task to mark it as completed (strikethrough).
- **Remove Tasks**: Click the **Remove** button next to a task to delete it.
- **Persistent Storage**: Tasks are saved in `localStorage` and persist across page reloads.

---

## Technologies Used
- **Web Components**: Custom HTML elements for modular and reusable UI.
- **JavaScript**: Core logic and interactivity.
- **AccuWeather API**: Fetch real-time weather data.
- **Vite**: Fast and lightweight development server.
- **HTML/CSS**: Structure and styling.
- **localStorage**: Persistent storage for calendar events and to-do list tasks.

---

## How to Use
### Prerequisites
1. **Node.js**: Ensure Node.js is installed on your machine. Download it from [nodejs.org](https://nodejs.org/).
2. **AccuWeather API Key**: Sign up for a free API key at [AccuWeather Developer Portal](https://developer.accuweather.com/).

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mjohnson0923/web-components-dashboard.git
   cd web-components-dashboard

   # Web Components Dashboard

## Install Dependencies

```bash
npm install
```

## Add AccuWeather API Key

1. Open `src/components/Weather.js`.
2. Replace `YOUR_API_KEY` with your actual AccuWeather API key.

## Run the Development Server

```bash
npm run dev
```

## Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

### Weather Widget
- Enter a postal code (e.g., `10001` for New York) in the input field.
- Click **Get Weather** to fetch and display the current weather conditions.

### Calendar Component
#### Navigate Months:
- Use the `←` and `→` buttons to switch between months.

#### Add Events:
1. Select a date using the date picker.
2. Enter an event title and choose a color.
3. Click **Add Event** to save the event.

#### View Events:
- Click on a date to view its events.

#### Remove Events:
- Click the **Remove** button next to an event to delete it.

### To-Do List
#### Add Tasks:
- Enter a task in the input field.
- Click **Add** to save the task.

#### Mark as Completed:
- Click on a task to mark it as completed (strikethrough).

#### Remove Tasks:
- Click the **Remove** button next to a task to delete it.

---

## Code Structure

```bash
web-components-dashboard/
├── src/
│   ├── components/
│   │   ├── Calendar.js       # Calendar Web Component
│   │   ├── Weather.js        # Weather Web Component
│   │   ├── TodoList.js       # To-Do List Web Component
│   ├── index.html            # Main HTML file
│   ├── main.js               # Entry point for the application
├── package.json              # Project dependencies and scripts
├── vite.config.js            # Vite configuration
```

---

## Why This Project?
This project showcases:

- **Modular Design**: Using Web Components to create reusable and encapsulated UI elements.
- **API Integration**: Fetching and displaying real-time data from the AccuWeather API.
- **Interactivity**: Dynamic user interfaces with event handling and state management.
- **Persistent Storage**: Using `localStorage` to save and retrieve data.

It’s a great example of modern frontend development skills, making it an excellent addition to your portfolio.

---

## GitHub Repository
Explore the code and contribute:

🔗 **[GitHub Repository](https://github.com/mjohnson0923/Portfolio-Projects/new/Micro-Frontend-Dashboard)**

---

## Contact
For questions or feedback, feel free to reach out:

- **Name**: M. Johnson
- **Email**: [mariojohnson7@gmail.com](mailto:mariojohnson7@gmail.com)
- **LinkedIn**: [Mario Johnson](www.linkedin.com/in/mario-johnson-50857389)

