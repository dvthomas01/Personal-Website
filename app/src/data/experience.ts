import type { Company } from './types';
import nasdaq from '../assets/companies/nasdaq.png';
import elinta from '../assets/companies/elinta.png';
import realm from '../assets/companies/realm.png';
import rockwell from '../assets/companies/rockwell.png';
import mgh from '../assets/companies/mgh.png';
import ni from '../assets/companies/national-instruments.png';

export const companies: Company[] = [
  { name: 'Nasdaq', logo: nasdaq },
  { name: 'Elinta Robotics', logo: elinta },
  { name: 'REALM', logo: realm },
  { name: 'Rockwell Automation', logo: rockwell },
  { name: 'MGH', logo: mgh },
  { name: 'National Instruments', logo: ni },
];
