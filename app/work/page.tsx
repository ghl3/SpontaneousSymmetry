import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Work',
};

export default function WorkPage() {
  return (
    <div className="content mx-auto max-w-3xl">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Work</h2>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">
        Google <span className="font-normal">(2018 - Present)</span>
      </h3>
      <p>
        I work on the Location Platform as part of Google Maps, where I leverage data 
        engineering and machine learning to make Google Maps smarter, more personalized, 
        and more magical.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">
        LendUp <span className="font-normal">(2013 - 2018)</span>
      </h3>
      <p>
        LendUp is a startup whose goal is to safely offer credit to all who need it. 
        We offer credit cards, installment loans, and single payment loans to those who qualify. 
        I began work at the company in early 2013 as the Head of Risk and Analytics (I was the 
        11th employee at the company). My role was to design and implement our risk and 
        underwriting program, which entailed collecting and processing datasets, designing and 
        testing statistical models for estimating credit risk, and writing software to serve our 
        models in production and to score them in applicants. I grew the team from just myself 
        into fully staffed Data Science, Data Engineering, and Credit teams. As the team grew, 
        I as an individual contributor focused on building our statistical models and designing 
        the data pipelines and tools required to maintain them.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">
        CERN / ATLAS <span className="font-normal">(2007 - 2013)</span>
      </h3>
      <p>
        I earned my PhD at New York University where I worked on the ATLAS experiment, which is 
        one of the two major experiments at the Large Hadron Collider (LHC). My research focused 
        on performing precision measurements of the properties of Top Quarks, and in particular 
        using advanced statistical techniques and technologies to build sophisticated models to 
        describe our data and achieve more accurate results. In addition, I was the primary 
        maintainer and developer of a statistical modeling package written in C++. Our framework 
        made it easy for other researchers to build large, detailed models and to leverage modern 
        inference techniques. And, as a member of the collaboration, I wrote software in C++ to 
        identify collisions worthy of being saved and further researched, which ran in production 
        on the 10s of millions of events per second that the LHC produced. For a discussion of my 
        research results, see <a href="/atlas">HERE</a>.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-4">Portfolio</h3>
      <p>Here is a collection of sample and side projects:</p>

      <ul className="list-disc pl-6 space-y-4 mt-4">
        <li>
          <strong><a href="https://github.com/ghl3/SpontaneousSymmetry">Spontaneous Symmetry</a></strong>: 
          This very site, written in Flask and served on AWS using nginx and docker.
        </li>
        <li>
          <strong><a href="/stats">Statistics</a></strong>: 
          An introduction to statistics and inference.
        </li>
        <li>
          <strong><a href="https://github.com/ghl3/higgs-kaggle">Higgs Kaggle</a></strong>: 
          My solution to the <a href="https://www.kaggle.com/c/higgs-boson">higgs boson Kaggle competition</a>.
        </li>
        <li>
          <strong><a href="https://github.com/ghl3/gtrees">gTrees</a></strong>: 
          Python and Cython module for building and fitting decision trees using genetic 
          algorithms to optimize arbitrary loss functions.
        </li>
        <li>
          <strong><a href="/blog/2017-11-05-alpha-four">AlphaFour</a></strong>: 
          An AI for the game ConnectFour, inspired by AlphaGo and built in TensorFlow.
        </li>
        <li>
          <strong><a href="https://github.com/ghl3/dataframe">dataframe</a></strong>: 
          Dataframes for Clojure (inspired by Python&apos;s Pandas)
        </li>
        <li>
          <strong><a href="https://github.com/ghl3/jest">Jest</a></strong>: 
          A functional programming language for the JVM.
        </li>
        <li>
          <strong><a href="https://github.com/ghl3/bamboo">Bamboo</a></strong>: 
          A set of helper functions for plotting and data manipulation using Python and Pandas.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-8 mb-2">Resume</h3>
      <p>
        A copy of my resume can be obtained{' '}
        <a href="https://github.com/ghl3/resume/raw/master/resume.pdf">HERE</a>.
      </p>
    </div>
  );
}

