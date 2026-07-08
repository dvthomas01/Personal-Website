import type { Photo, PhotoCategory } from './types';
import cityBoston01 from '../assets/photos/city-boston-01.jpg';
import cityLisbon01 from '../assets/photos/city-lisbon-01.jpg';
import cityLisbon07 from '../assets/photos/city-lisbon-07.jpg';
import cityMadrid02 from '../assets/photos/city-madrid-02.jpg';
import cityNy03 from '../assets/photos/city-ny-03.jpg';
import concert01 from '../assets/photos/concert-01.jpg';
import concert04 from '../assets/photos/concert-04.jpg';
import concert06 from '../assets/photos/concert-06.jpg';
import formal02 from '../assets/photos/formal-02.jpg';
import formalBsu01 from '../assets/photos/formal-bsu-01.jpg';
import formalF2503 from '../assets/photos/formal-f25-03.jpg';
import formal07 from '../assets/photos/formal-07.jpg';
import gradCom03 from '../assets/photos/grad-com-03.jpg';
import gradMb01 from '../assets/photos/grad-mb-01.jpg';
import gradSaas02 from '../assets/photos/grad-saas-02.jpg';
import grad05 from '../assets/photos/grad-05.jpg';
import eventLoco03 from '../assets/photos/event-loco-03.jpg';
import eventMarket02 from '../assets/photos/event-market-02.jpg';
import eventSpring05 from '../assets/photos/event-spring-05.jpg';
import eventUmunna01 from '../assets/photos/event-umunna-01.jpg';
import sportsBm04 from '../assets/photos/sports-bm-04.jpg';
import sportsWr03 from '../assets/photos/sports-wr-03.jpg';
import sportsBm09 from '../assets/photos/sports-bm-09.jpg';
import sportsWr08 from '../assets/photos/sports-wr-08.jpg';

export const PHOTO_CATEGORIES: PhotoCategory[] = [
  'cities',
  'concerts',
  'formal',
  'grad',
  'live-events',
  'sports',
];

export const photos: Photo[] = [
  { id: 'city-boston-01', src: cityBoston01, category: 'cities', alt: 'Boston cityscape' },
  { id: 'city-lisbon-01', src: cityLisbon01, category: 'cities', alt: 'Lisbon street scene' },
  { id: 'city-lisbon-07', src: cityLisbon07, category: 'cities', alt: 'Lisbon architecture' },
  { id: 'city-madrid-02', src: cityMadrid02, category: 'cities', alt: 'Madrid city view' },
  { id: 'city-ny-03', src: cityNy03, category: 'cities', alt: 'New York City street' },
  { id: 'concert-01', src: concert01, category: 'concerts', alt: 'Concert stage lights' },
  { id: 'concert-04', src: concert04, category: 'concerts', alt: 'Live concert performance' },
  { id: 'concert-06', src: concert06, category: 'concerts', alt: 'Concert crowd' },
  { id: 'formal-02', src: formal02, category: 'formal', alt: 'Formal event portrait' },
  { id: 'formal-bsu-01', src: formalBsu01, category: 'formal', alt: 'BSU formal event' },
  { id: 'formal-f25-03', src: formalF2503, category: 'formal', alt: 'Fall formal portrait' },
  { id: 'formal-07', src: formal07, category: 'formal', alt: 'Formal group shot' },
  { id: 'grad-com-03', src: gradCom03, category: 'grad', alt: 'Commencement ceremony' },
  { id: 'grad-mb-01', src: gradMb01, category: 'grad', alt: 'Graduation portrait' },
  { id: 'grad-saas-02', src: gradSaas02, category: 'grad', alt: 'Graduation celebration' },
  { id: 'grad-05', src: grad05, category: 'grad', alt: 'Graduate portrait at MIT' },
  { id: 'event-loco-03', src: eventLoco03, category: 'live-events', alt: 'Live event performance' },
  { id: 'event-market-02', src: eventMarket02, category: 'live-events', alt: 'Market event scene' },
  { id: 'event-spring-05', src: eventSpring05, category: 'live-events', alt: 'Spring event' },
  { id: 'event-umunna-01', src: eventUmunna01, category: 'live-events', alt: 'Umunna event' },
  { id: 'sports-bm-04', src: sportsBm04, category: 'sports', alt: 'Basketball game action' },
  { id: 'sports-wr-03', src: sportsWr03, category: 'sports', alt: 'Wrestling match' },
  { id: 'sports-bm-09', src: sportsBm09, category: 'sports', alt: 'Basketball court action' },
  { id: 'sports-wr-08', src: sportsWr08, category: 'sports', alt: 'Wrestling competition' },
];
