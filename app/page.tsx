import Image from 'next/image';

export default function Home() {
  return (
    <div className="content mx-auto max-w-3xl">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">George Lewis</h2>
      </div>

      <p>
        I&apos;m a programmer, data scientist, physicist, and technology lover, and I am 
        fascinated by learning how almost anything works.
      </p>

      <p>
        I&apos;m currently a Machine Learning Engineer at{' '}
        <a href="http://google.com">Google</a>, where I work on the Location Platform at{' '}
        <a href="https://google.com/maps">Google Maps</a>.
      </p>

      <p>
        Previously, I worked at <a href="https://www.LendUp.com">LendUp</a>, a startup whose 
        goal is to safely extend credit to all who need it.
      </p>

      <p>
        I obtained a PhD in High Energy Experimental Particle Physics from New York University, 
        where I worked on the <a href="http://atlas.ch/">ATLAS</a> experiment on the Large 
        Hadron Collider at <a href="http://public.web.cern.ch/public/">CERN</a>.
      </p>

      <p>
        I was also a fellow at the{' '}
        <a href="http://insightdatascience.com/">Insight Data Science Program</a>.
      </p>

      <p>
        For more information, please browse my <a href="/work">work and projects</a> page or 
        read entries from my <a href="/blog">blog</a> or check out my <a href="/apps">apps</a>.
      </p>

      <p>
        I can be reached at the following email address: ghl227@gmail.com
      </p>

      <div className="break" />

      <div className="text-center my-8">
        <img 
          src="/assets/images/symmetry_e8.jpg" 
          alt="E8 Symmetry" 
          className="w-48 mx-auto"
        />
      </div>

      <p>
        Symmetries are all around us and shape our lives in ways few understand. On an aesthetic 
        level, symmetries are considered beautiful and visually pleasing. But the mathematical 
        concept of a symmetry goes much deeper than the familiar definition. In a deep, 
        fundamental way, symmetries govern how the world works. They are the language of the 
        most fundamental physical processes that we can describe.
      </p>
    </div>
  );
}


