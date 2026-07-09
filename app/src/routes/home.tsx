import { Hero } from '../components/Hero';
import { ExperienceCard } from '../components/ExperienceCard';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { ResearchCard } from '../components/ResearchCard';
import { PhotoTeaser } from '../components/PhotoTeaser';
import { DirectoryListing } from '../components/DirectoryListing';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <Hero />
      <div className="grid gap-4 md:grid-cols-2">
        <ExperienceCard />
        <FeaturedCarousel />
      </div>
      <ResearchCard />
      <PhotoTeaser />
      <DirectoryListing />
    </div>
  );
}
