# MY IT STUDIO - Technical Task

### By Sharada Gunathilake

## Resources

- [API](https://www.weatherapi.com/)

- [Figma prototype](https://www.figma.com/proto/wNJWoNI3OEd6kK5Y8Ml73B/Weather-app?page-id=0%3A1&node-id=68-923&viewport=419%2C94%2C0.34&scaling=min-zoom&starting-point-node-id=68%3A595)

- [Live Demo](https://harmonious-moonbeam-771053.netlify.app/)
- [GitHub Repo](https://github.com/sharada-g/weather-app)

## Tools and Technologies

- Vite
- React
- Typescript
- Tailwind CSS
- Redux
- Redux Toolkit

## Features

- Auto weather data fetch based on user's IP address
- Search weather data by city name
- Display weather data for today and next 3 days
- Responsive design
- Error handling
- Loading indicators

## Getting Started

- in order to run the project, you need to set up a `.env` file in the root directory of the project.

  - rename `.env.example` to `.env`
  - add your API key to the `VITE_API_KEY` variable

- install dependencies - run `npm install`

### Available Scripts

- to run the project in development mode, run `npm run dev`
- to build the project, run `npm run build`
- to preview the production build, run `npm run preview`

## If I had more time

- I would have added e2e tests using Cypress
- I would have added unit tests using react-testing-library
- i would have added a dark mode
- I would polish the UI/UX bit more
- I would add more features such as hourly weather data, weather alerts, etc.
- i would give user the ability to change the unit of measurement
- I would have added a feature to save favorite cities on local storage or a database
