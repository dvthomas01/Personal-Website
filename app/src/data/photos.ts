import type { Photo, PhotoCategory } from './types';
import cityLisbon01 from '../assets/photos/city-lisbon-01.jpg';
import cityLisbon02 from '../assets/photos/city-lisbon-02.jpg';
import cityLisbon06 from '../assets/photos/city-lisbon-06.jpg';
import cityMadrid01 from '../assets/photos/city-madrid-01.jpg';
import cityMadrid04 from '../assets/photos/city-madrid-04.jpg';
import cityNy01 from '../assets/photos/city-ny-01.jpg';
import cityNy04 from '../assets/photos/city-ny-04.jpg';
import cityBoston01 from '../assets/photos/city-boston-01.jpg';
import cityBoston02 from '../assets/photos/city-boston-02.jpg';
import concert05 from '../assets/photos/concert-05.jpg';
import eventSpring03 from '../assets/photos/event-spring-03.jpg';
import eventSpring05 from '../assets/photos/event-spring-05.jpg';
import gradMb01 from '../assets/photos/grad-mb-01.jpg';
import gradMb03 from '../assets/photos/grad-mb-03.jpg';
import gradCom03 from '../assets/photos/grad-com-03.jpg';
import gradCom05 from '../assets/photos/grad-com-05.jpg';
import gradSaas06 from '../assets/photos/grad-saas-06.jpg';
import grad2fb01 from '../assets/photos/grad-2fb-01.jpg';
import sportsBm01 from '../assets/photos/sports-bm-01.jpg';
import sportsBm05 from '../assets/photos/sports-bm-05.jpg';
import sportsBm07 from '../assets/photos/sports-bm-07.jpg';
import sportsWr02 from '../assets/photos/sports-wr-02.jpg';
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

// A snippet of the full gallery, hand-vetted shot by shot. No subject repeats
// and no single event dominates. The order interleaves categories on purpose.
export const photos: Photo[] = [
  { id: 'city-lisbon-01', src: cityLisbon01, category: 'cities', alt: 'Lisbon rooftops at dusk' },
  { id: 'grad-2fb-01', src: grad2fb01, category: 'grad', alt: 'Graduate in an MIT stole beside a chalkboard' },
  { id: 'sports-bm-05', src: sportsBm05, category: 'sports', alt: 'Boston Marathon runner celebrating past the crowd' },
  { id: 'city-ny-01', src: cityNy01, category: 'cities', alt: 'Snowy Brooklyn street under a starry night sky' },
  { id: 'concert-05', src: concert05, category: 'concerts', alt: 'Singer in profile against a dark stage' },
  { id: 'grad-com-03', src: gradCom03, category: 'grad', alt: 'Graduate in MIT stole on a sunny commencement day' },
  { id: 'city-madrid-01', src: cityMadrid01, category: 'cities', alt: 'Madrid street scene' },
  { id: 'sports-wr-05', src: sportsWr05, category: 'sports', alt: 'Wrestlers locked mid-match' },
  { id: 'event-spring-03', src: eventSpring03, category: 'live-events', alt: 'DJ deck long exposure with light trails' },
  { id: 'city-boston-02', src: cityBoston02, category: 'cities', alt: 'Bronze statue with the American flag behind it' },
  { id: 'grad-mb-03', src: gradMb03, category: 'grad', alt: 'Graduates by the columns' },
  { id: 'sports-bm-01', src: sportsBm01, category: 'sports', alt: 'Marathon walker in focus among blurred runners' },
  { id: 'city-ny-04', src: cityNy04, category: 'cities', alt: 'New York City avenue' },
  { id: 'grad-com-05', src: gradCom05, category: 'grad', alt: 'Two graduates among the commencement flowers' },
  { id: 'sports-wr-02', src: sportsWr02, category: 'sports', alt: 'Wrestling takedown in black and white' },
  { id: 'city-lisbon-06', src: cityLisbon06, category: 'cities', alt: 'Lisbon alley in afternoon light' },
  { id: 'event-spring-05', src: eventSpring05, category: 'live-events', alt: 'DJs working the decks at a night set' },
  { id: 'grad-mb-01', src: gradMb01, category: 'grad', alt: 'Graduate holding his cap between the columns' },
  { id: 'city-boston-01', src: cityBoston01, category: 'cities', alt: 'Boston skyline' },
  { id: 'sports-bm-07', src: sportsBm07, category: 'sports', alt: 'Marathon runner pumping his fist mid-race' },
  { id: 'city-lisbon-02', src: cityLisbon02, category: 'cities', alt: 'Tram tracks through Lisbon' },
  { id: 'grad-saas-06', src: gradSaas06, category: 'grad', alt: 'Friends celebrating at commencement' },
  { id: 'sports-wr-09', src: sportsWr09, category: 'sports', alt: 'Wrestling mat in black and white' },
  { id: 'city-madrid-04', src: cityMadrid04, category: 'cities', alt: 'El Rastro market crowd in Madrid' },
];
