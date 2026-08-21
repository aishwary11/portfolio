import { About } from '@/components/sections/About';
import { Achievements } from '@/components/sections/Achievements';
import { Architecture } from '@/components/sections/Architecture';
import { Contact } from '@/components/sections/Contact';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';

/**
 * The tenure figures are computed from the current date, so a build from six
 * months ago would understate them. Rebuilding daily keeps them true without
 * pushing the work to the client.
 */
export const revalidate = 86_400;

/**
 * Every section here is a Server Component. Only four leaves ship JavaScript —
 * the theme switch, the mobile menu, the typed role line and the copy buttons on
 * the contact details — because the reveals, the progress bar and the
 * disclosures are all native CSS and HTML.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Architecture />
      <Skills />
      <Experience />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}
