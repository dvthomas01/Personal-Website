import type { Photo, PhotoCategory } from './types';
import cityLisbon01 from '../assets/photos/city-lisbon-01.jpg';
import cityMadrid01 from '../assets/photos/city-madrid-01.jpg';
import cityNy04 from '../assets/photos/city-ny-04.jpg';
import cityBoston01 from '../assets/photos/city-boston-01.jpg';
import cityLisbon06 from '../assets/photos/city-lisbon-06.jpg';
import cityLisbon02 from '../assets/photos/city-lisbon-02.jpg';
import cityMadrid04 from '../assets/photos/city-madrid-04.jpg';
import concert03 from '../assets/photos/concert-03.jpg';
import concert04 from '../assets/photos/concert-04.jpg';
import concert05 from '../assets/photos/concert-05.jpg';
import eventSpring01 from '../assets/photos/event-spring-01.jpg';
import eventSpring03 from '../assets/photos/event-spring-03.jpg';
import eventSpring05 from '../assets/photos/event-spring-05.jpg';
import eventSpring06 from '../assets/photos/event-spring-06.jpg';
import eventSpring08 from '../assets/photos/event-spring-08.jpg';
import gradMb03 from '../assets/photos/grad-mb-03.jpg';
import gradMb01 from '../assets/photos/grad-mb-01.jpg';
import gradCom03 from '../assets/photos/grad-com-03.jpg';
import gradSaas06 from '../assets/photos/grad-saas-06.jpg';
import sportsBm01 from '../assets/photos/sports-bm-01.jpg';
import sportsBm05 from '../assets/photos/sports-bm-05.jpg';
import sportsBm07 from '../assets/photos/sports-bm-07.jpg';
import sportsWr05 from '../assets/photos/sports-wr-05.jpg';
import sportsWr09 from '../assets/photos/sports-wr-09.jpg';

export const PHOTO_CATEGORIES: PhotoCategory[] = [
  'cities',
  'concerts',
  'formal',
  'grad',
  'live-events',
  'sports',
];

// A snippet of the full gallery, hand-vetted: performance and action shots,
// portraits, and street scenes. The order interleaves categories on purpose.
export const photos: Photo[] = [
  { id: 'city-lisbon-01', src: cityLisbon01, category: 'cities', alt: 'Lisbon rooftops at dusk' },
  { id: 'concert-04', src: concert04, category: 'concerts', alt: 'Singer mid-song under stage lights' },
  { id: 'grad-mb-03', src: gradMb03, category: 'grad', alt: 'Graduates by the columns' },
  { id: 'event-spring-01', src: eventSpring01, category: 'live-events', alt: 'Performer in red light with motion trails' },
  { id: 'sports-bm-05', src: sportsBm05, category: 'sports', alt: 'Boston Marathon runner celebrating past the crowd' },
  { id: 'city-madrid-01', src: cityMadrid01, category: 'cities', alt: 'Madrid street scene' },
  { id: 'event-spring-03', src: eventSpring03, category: 'live-events', alt: 'DJ deck long exposure with light trails' },
  { id: 'grad-com-03', src: gradCom03, category: 'grad', alt: 'Graduate in MIT stole on a sunny commencement day' },
  { id: 'city-ny-04', src: cityNy04, category: 'cities', alt: 'New York City avenue' },
  { id: 'sports-wr-05', src: sportsWr05, category: 'sports', alt: 'Wrestlers locked mid-match' },
  { id: 'concert-05', src: concert05, category: 'concerts', alt: 'Singer in profile against a dark stage' },
  { id: 'event-spring-06', src: eventSpring06, category: 'live-events', alt: 'Performer with arm raised on stage' },
  { id: 'city-boston-01', src: cityBoston01, category: 'cities', alt: 'Boston skyline' },
  { id: 'grad-mb-01', src: gradMb01, category: 'grad', alt: 'Graduate holding his cap between the columns' },
  { id: 'sports-bm-01', src: sportsBm01, category: 'sports', alt: 'Marathon walker in focus among blurred runners' },
  { id: 'city-lisbon-06', src: cityLisbon06, category: 'cities', alt: 'Lisbon alley in afternoon light' },
  { id: 'event-spring-05', src: eventSpring05, category: 'live-events', alt: 'DJs working the decks at a night set' },
  { id: 'concert-03', src: concert03, category: 'concerts', alt: 'Singer bathed in red light' },
  { id: 'grad-saas-06', src: gradSaas06, category: 'grad', alt: 'Friends celebrating at commencement' },
  { id: 'city-lisbon-02', src: cityLisbon02, category: 'cities', alt: 'Tram tracks through Lisbon' },
  { id: 'sports-bm-07', src: sportsBm07, category: 'sports', alt: 'Marathon runner pumping his fist mid-race' },
  { id: 'event-spring-08', src: eventSpring08, category: 'live-events', alt: 'Vocalist lit in pink and blue' },
  { id: 'city-madrid-04', src: cityMadrid04, category: 'cities', alt: 'El Rastro market crowd in Madrid' },
  { id: 'sports-wr-09', src: sportsWr09, category: 'sports', alt: 'Wrestling mat in black and white' },
];
