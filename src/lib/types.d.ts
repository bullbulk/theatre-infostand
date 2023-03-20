export type UpcomingEvent = {
  date: Date;
  event: number;
};

export type Event = {
  title: string;
  author: string;
  genre: string;
  image: string;
  price: string;
  age_limit: string;
  description: string;
  duration: Date,
  hall: {
    name: string;
  }
}