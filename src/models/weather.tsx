export interface Title {
  name: string;
  location: {
    name: string;
    region: string;
    country: string;
  };
  fetchTime: string;
}

export interface Hero {
  temp: number;
  feelsLike: number;
  condition: string;
  icon: string;
}

export interface Forcast {
  chanceOfSnow: number;
  chanceOfRain: number;
  condition: string;
  icon: string;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
}

export interface Details {
  temp: {
    min: number;
    max: number;
  };
  humidity: number;
  pressure: number;
  precipitation: number;
  wind: number;
  cloud: number;
  uvIndex: number;
  visibility: number;
}

export interface ForcastCard {
  name: string;
  temp: number;
  chanceOfSnow: number;
  changeOfRain: number;
  icon: string;
}

export interface day {
  title: Title;
  hero: Hero;
  forcast: Forcast;
  astro: Astro;
  details: Details;
  day: ForcastCard[];
}

export interface Weather {
  today: day;
  tomorrow: day;
  dayAfterTomorrow: day;
  dayAfterDayAfterTomorrow: day;
}
