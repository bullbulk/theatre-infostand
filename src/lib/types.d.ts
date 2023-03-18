export type UpcomingEvent = {
    date: Date;
    event: {
      title: string;
      author: string;
      image: string;
      price: string;
      age_limit: string;
      description: string;
      duration: Date,
      hall: {
        name: string;
      }
    }
};