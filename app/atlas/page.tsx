import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';

export const metadata: Metadata = {
  title: 'Research',
  description: 'High energy particle physics research at the ATLAS experiment on the Large Hadron Collider at CERN. Top quark physics, statistical analysis, and trigger development.',
  openGraph: {
    title: 'Particle Physics Research - ATLAS/CERN',
    description: 'Research on the ATLAS experiment at the Large Hadron Collider. Top quark physics and statistical analysis.',
  },
};

interface ResearchLink {
  href: string;
  label: string;
}

const researchLinks: ResearchLink[] = [
  { href: 'http://arxiv.org/abs/1202.5520', label: 'Same-Sign Top Quarks and b\' (arxiv)' },
  { href: 'http://www.springerlink.com/content/p572k4h1h328m353/fulltext.pdf', label: 'Same-Sign Top Quarks and b\' (JHEP)' },
  { href: 'http://root.cern.ch/root/html/ROOFIT_HISTFACTORY_Index.html', label: 'HistFactory Project Index' },
  { href: 'http://indico.cern.ch/conferenceDisplay.py?confId=120126', label: 'Presentation at L1 Calo Joint Meeting' },
  { href: 'https://cdsweb.cern.ch/record/1335149', label: 'MET Significance Approved Plots' },
  { href: 'https://cdsweb.cern.ch/record/1336182', label: 'MET Significance Poster' },
  { href: 'https://atlas.web.cern.ch/Atlas/GROUPS/PHYSICS/CONFNOTES/ATLAS-CONF-2012-024/', label: '2011 Top Quark Cross-Section Combination' },
  { href: 'https://atlas.web.cern.ch/Atlas/GROUPS/PHYSICS/CONFNOTES/ATLAS-CONF-2011-108/', label: '2010 and 2011 Top Quark Cross-Section Combination' },
  { href: 'https://atlas.web.cern.ch/Atlas/GROUPS/PHYSICS/CONFNOTES/ATLAS-CONF-2011-040/', label: '2010 Top Quark Cross-Section Combination' },
];

export default function AtlasPage(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto relative">
      {/* Main Content */}
      <div>
        <PageHero title="Research" subtitle="High Energy Particle Physics at ATLAS" />

        {/* Content */}
        <div className="space-y-5 text-text-primary leading-relaxed">
          <p>
            As a graduate student, I worked as a member of the ATLAS experiment. Most of my work 
            involved Top Quark and Exotic physics, as well the building of tools and techniques 
            for Statistical Analysis, and the ATLAS Missing Energy Trigger.
          </p>

          <p>
            ATLAS is an all-purpose particle detector whose primary goal is the discovery of new 
            particles. However, before it can claim new discoveries, it must understand standard 
            physics well enough to distinguish non-standard physics. A particle physicist would 
            say that you first have to understand your background before you can find your signal. 
            An important background for many physics searches comes from the production of Top 
            Quarks. Though the Top was initially discovered in 1995, it is extremely important to 
            understand how often tops are made by the LHC and what it looks like when they are 
            produced. Top quark events can look similar to, for example, Higgs Boson events, so 
            understanding Top physics is a crucial preliminary step to finding the Higgs boson, 
            as well as many other interesting physical processes.
          </p>

          <p>
            But before one can analyze data and search for new particles, one must collect data. 
            LHC smashes protons together at a rate of about 4 million per second. Each event that 
            the ATLAS detector records takes up between 1 and 2 MB of data. If ATLAS were to 
            record every collision, it would be storing about 5 Terabytes per second. For many 
            reasons, this rate is far from sustainable. Hence, ATLAS uses a system of hardware 
            and software called the trigger to first determine if a particular collision is 
            interesting before saving it. I work on one aspect of the trigger that looks for 
            what is called Missing Energy to determine if an event should be kept or discarded.
          </p>

          <p>
            After a theory has been made and data has been collected, one must have the proper 
            tools in order to properly and efficiently analyze data and come to significant 
            conclusions. This is often the most difficult and most important part of Particle 
            Physics. As a member of the ATLAS collaboration, I worked on developing and 
            maintaining these software tools that are used to interpret, visualize, and 
            understand statistically the particle collisions at ATLAS. Members of the ATLAS 
            experiment use several software packages and frameworks to do analysis, all of 
            which are open and most of which is developed by members of the experiment.
          </p>

          <p>
            A graduate student in High Energy Experimental Physics plays many roles. As a member 
            of ATLAS, one must understand the underlying physics and the hardware of our 
            accelerator, the LHC. One must know about protons, how they are composed of quarks, 
            and how these quarks interact when protons are collided. One must understand 
            fundamental particle physics and what final states emerge after collisions, how 
            likely these states are to occur, and what they look like. One must understand the 
            physics of particle detectors, how different particles interact with these detectors, 
            and how one can use the readout of these detectors to reconstruct escaping particles. 
            One must be able to work with large data sets, to move and organize this data, to 
            process and visualize it, and to find patterns and meaning among a huge amount of 
            information. And finally, one must be able to do formal statistical analysis of this 
            data, to claim discovery or reject hypothesis, and to relate statistical observations 
            back to fundamental theories.
          </p>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Results Section */}
        <section>
          <SectionTitle centered>Results and Projects</SectionTitle>

          <ul className="space-y-3">
            {researchLinks.map((link) => (
              <li 
                key={link.href}
                className="pl-4 border-l-2 border-border hover:border-accent transition-colors duration-150"
              >
                <Link 
                  href={link.href}
                  className="font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <span className="ml-1 text-text-muted text-sm">↗</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-text-secondary text-center italic">
            NSF US LHC Graduate Student Support Award (2010)
          </p>
        </section>
      </div>

      {/* Sidebar - positioned to the right, outside the centered content */}
      <aside className="hidden xl:block absolute left-full top-0 ml-8 w-56 space-y-6">
        <figure>
          <Image 
            src="/assets/images/topquarkevent.jpg" 
            alt="Top quark event" 
            width={224}
            height={160}
            className="w-full rounded-lg shadow-sm"
          />
          <figcaption className="text-xs text-text-muted mt-2 leading-relaxed">
            A proton-proton event producing two top quarks that decay into jets, 
            muons, electrons, and neutrinos.
          </figcaption>
        </figure>

        <figure>
          <Image 
            src="/assets/images/AtlasEvent.jpg" 
            alt="ATLAS event" 
            width={224}
            height={160}
            className="w-full rounded-lg shadow-sm"
          />
          <figcaption className="text-xs text-text-muted mt-2 leading-relaxed">
            A collision event as seen by the ATLAS detector.
          </figcaption>
        </figure>

        <figure>
          <Image 
            src="/assets/images/DijetResonance.jpg" 
            alt="Dijet Resonance" 
            width={224}
            height={160}
            className="w-full rounded-lg shadow-sm"
          />
          <figcaption className="text-xs text-text-muted mt-2 leading-relaxed">
            Invariant mass of jets.{' '}
            <Link href="http://arxiv.org/abs/1008.2461" className="hover:text-accent" target="_blank" rel="noopener noreferrer">
              arXiv:1008.2461
            </Link>
          </figcaption>
        </figure>
      </aside>
    </div>
  );
}
