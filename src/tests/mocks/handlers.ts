import { rest } from "msw";

export const handlers = [
  rest.get("https://ipapi.co/json/", (req, res, ctx) => {
    return res(ctx.json({ ip: "111.111.111.111" }));
  }),

  rest.get(
    `https://api.weatherapi.com/v1/search.json?key=${
      import.meta.env.VITE_API_KEY
    }4&q=london`,
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 44418,
            name: "London",
            country: "GB",
            region: "City of London, Greater London",
            lat: 51.52,
            lon: -0.11,
            url: "https://www.weatherapi.com/api-explorer.aspx",
          },
        ])
      );
    }
  ),

  // rest.get(
  //   `https://api.weatherapi.com/v1/forecast.json?key=${
  //     import.meta.env.VITE_API_KEY
  //   }&q=London&days=4&aqi=no&alerts=no`,
  //   (req, res, ctx) => {
  //     return res(ctx.json({}));
  //   }
  // ),
];
