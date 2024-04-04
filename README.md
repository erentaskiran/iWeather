# Weather App

This is a weather application built with Next.js, React, and TypeScript. It allows users to view weather information for different cities.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building JavaScript applications.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that adds static types.
- [React Select](https://react-select.com/home): A flexible and customizable select input control for React. Used for creating the city selection dropdown.
- [Axios](https://axios-http.com): A promise-based HTTP client for the browser and Node.js. Used for making API requests to the GeoDB and OpenWeather APIs.


## Apis Used

- [GeoDB API](https://rapidapi.com/wirefreethought/api/geodb-cities): Used for autocompleting city names and finding cities based on location.
- [OpenWeather API](https://openweathermap.org): Used for fetching real-time weather information for the selected city.

## Additional features

- **Location-Based Weather Information:** The application can use the user's current location to display weather information for their area.
- **Responsive Design:** The application is designed to work well on both desktop and mobile devices.
- **Weather Icons:** The application uses dynamic weather icons to visually represent the current weather conditions.

## Project Setup

To get the project up and running, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/erentaskiran/iWeather.git
cd iWeather
```

2. Install the dependencies:
```bash
npm install
```

3. Create a .env.local file in the root directory and fill it with your environment variables:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
````

5. Open http://localhost:3000 with your browser to see the result.


