import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Atlas',
};

export default function AtlasPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="content flex-1 max-w-3xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">ATLAS</h2>
        </div>

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

        <h2 className="text-xl font-semibold mt-8 mb-4">Results and Projects</h2>

        <div className="space-y-2">
          <a href="http://arxiv.org/abs/1202.5520" className="block">
            Same-Sign Top Quarks and b&apos; (arxiv)
          </a>
          <a href="http://www.springerlink.com/content/p572k4h1h328m353/fulltext.pdf" className="block">
            Same-Sign Top Quarks and b&apos; (JHEP)
          </a>
          <a href="http://root.cern.ch/root/html/ROOFIT_HISTFACTORY_Index.html" className="block">
            HistFactory Project Index
          </a>
          <a href="http://indico.cern.ch/conferenceDisplay.py?confId=120126" className="block">
            Presentation at L1 Calo Joint Meeting
          </a>
          <a href="https://cdsweb.cern.ch/record/1335149" className="block">
            MET Significance Approved Plots
          </a>
          <a href="https://cdsweb.cern.ch/record/1336182" className="block">
            MET Significance Poster
          </a>
          <a href="https://atlas.web.cern.ch/Atlas/GROUPS/PHYSICS/CONFNOTES/ATLAS-CONF-2012-024/" className="block">
            2011 Top Quark Cross-Section Combination
          </a>
          <a href="https://atlas.web.cern.ch/Atlas/GROUPS/PHYSICS/CONFNOTES/ATLAS-CONF-2011-108/" className="block">
            2010 and 2011 Top Quark Cross-Section Combination
          </a>
          <a href="https://atlas.web.cern.ch/Atlas/GROUPS/PHYSICS/CONFNOTES/ATLAS-CONF-2011-040/" className="block">
            2010 Top Quark Cross-Section Combination
          </a>
          <p className="mt-4">NSF US LHC Graduate Student Support Award (2010)</p>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="sidebar w-full lg:w-64 flex-shrink-0">
        <img 
          src="/static/images/topquarkevent.jpg" 
          alt="Top quark event" 
          className="w-full mb-2"
        />
        <p className="text-sm text-gray-600 mb-6">
          An example of a proton-proton event that leads to the production of two top quarks 
          (specifically, one top and one anti-top). The top quarks quickly decay into jets, 
          muons, electrons, and neutrinos.
        </p>

        <img 
          src="/static/images/AtlasEvent.jpg" 
          alt="ATLAS event" 
          className="w-full mb-2"
        />
        <p className="text-sm text-gray-600 mb-6">
          An example of a collision event as seen by the ATLAS detector. Several example 
          particles are shown interacting with the ATLAS.
        </p>

        <img 
          src="/static/images/DijetResonance.jpg" 
          alt="Dijet Resonance" 
          className="w-full mb-2"
        />
        <p className="text-sm text-gray-600">
          A public result from ATLAS on the invariant mass of jets. From:{' '}
          <a href="http://arxiv.org/abs/1008.2461">arXiv:1008.2461</a>
        </p>
      </aside>
    </div>
  );
}


