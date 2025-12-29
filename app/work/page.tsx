import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Professional experience and portfolio of George Lewis. Currently at Google Maps, previously at LendUp and CERN/ATLAS. Projects in machine learning, data science, and physics.',
  openGraph: {
    title: 'Work & Portfolio - George Lewis',
    description: 'Professional experience at Google, LendUp, and CERN. Portfolio of data science and machine learning projects.',
  },
};

interface WorkExperience {
  company: string;
  period: string;
  description: string;
  link?: string;
}

interface Project {
  name: string;
  href: string;
  description: string;
  external?: boolean;
}

const experiences: WorkExperience[] = [
  {
    company: 'Google',
    period: '2018 - Present',
    description: 'I work on the Location Platform as part of Google Maps, where I leverage data engineering and machine learning to make Google Maps smarter, more personalized, and more magical.',
  },
  {
    company: 'LendUp',
    period: '2013 - 2018',
    description: 'LendUp is a startup whose goal is to safely offer credit to all who need it. We offer credit cards, installment loans, and single payment loans to those who qualify. I began work at the company in early 2013 as the Head of Risk and Analytics (I was the 11th employee at the company). My role was to design and implement our risk and underwriting program, which entailed collecting and processing datasets, designing and testing statistical models for estimating credit risk, and writing software to serve our models in production and to score them in applicants. I grew the team from just myself into fully staffed Data Science, Data Engineering, and Credit teams. As the team grew, I as an individual contributor focused on building our statistical models and designing the data pipelines and tools required to maintain them.',
  },
  {
    company: 'CERN / ATLAS',
    period: '2007 - 2013',
    description: 'I earned my PhD at New York University where I worked on the ATLAS experiment, which is one of the two major experiments at the Large Hadron Collider (LHC). My research focused on performing precision measurements of the properties of Top Quarks, and in particular using advanced statistical techniques and technologies to build sophisticated models to describe our data and achieve more accurate results. In addition, I was the primary maintainer and developer of a statistical modeling package written in C++. Our framework made it easy for other researchers to build large, detailed models and to leverage modern inference techniques. And, as a member of the collaboration, I wrote software in C++ to identify collisions worthy of being saved and further researched, which ran in production on the 10s of millions of events per second that the LHC produced.',
    link: '/atlas',
  },
];

const projects: Project[] = [
  {
    name: 'Spontaneous Symmetry',
    href: 'https://github.com/ghl3/SpontaneousSymmetry',
    description: 'This very site, built with Next.js and React, deployed on Vercel.',
    external: true,
  },
  {
    name: 'Statistics',
    href: '/stats',
    description: 'An introduction to statistics and inference.',
  },
  {
    name: 'Higgs Kaggle',
    href: 'https://github.com/ghl3/higgs-kaggle',
    description: 'My solution to the Higgs boson Kaggle competition.',
    external: true,
  },
  {
    name: 'gTrees',
    href: 'https://github.com/ghl3/gtrees',
    description: 'Python and Cython module for building and fitting decision trees using genetic algorithms to optimize arbitrary loss functions.',
    external: true,
  },
  {
    name: 'AlphaFour',
    href: '/blog/2017-11-05-alpha-four',
    description: 'An AI for the game ConnectFour, inspired by AlphaGo and built in TensorFlow.',
  },
  {
    name: 'dataframe',
    href: 'https://github.com/ghl3/dataframe',
    description: 'Dataframes for Clojure (inspired by Python\'s Pandas)',
    external: true,
  },
  {
    name: 'Jest',
    href: 'https://github.com/ghl3/jest',
    description: 'A functional programming language for the JVM.',
    external: true,
  },
  {
    name: 'Bamboo',
    href: 'https://github.com/ghl3/bamboo',
    description: 'A set of helper functions for plotting and data manipulation using Python and Pandas.',
    external: true,
  },
];

export default function WorkPage(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHero title="Work" />

      {/* Experience Section */}
      <section className="space-y-8 mb-12">
        {experiences.map((exp) => (
          <div key={exp.company}>
            <h3 className="text-xl font-semibold text-text-primary mb-1">
              {exp.company}
              <span className="font-normal text-text-secondary ml-2 text-base">
                ({exp.period})
              </span>
            </h3>
            <p className="text-text-primary leading-relaxed">
              {exp.description}
              {exp.link && (
                <>
                  {' '}For a discussion of my research results, see{' '}
                  <Link href={exp.link} className="font-medium">
                    here
                  </Link>.
                </>
              )}
            </p>
          </div>
        ))}
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* Portfolio Section */}
      <section>
        <SectionTitle centered>Portfolio</SectionTitle>
        <p className="text-text-primary mb-6">
          Here is a collection of sample and side projects:
        </p>

        <ul className="space-y-3">
          {projects.map((project) => (
            <li 
              key={project.name}
              className="pl-4 border-l-2 border-border hover:border-accent transition-colors duration-150"
            >
              <Link 
                href={project.href}
                className="font-medium"
                {...(project.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {project.name}
                {project.external && (
                  <span className="ml-1 text-text-muted text-sm">↗</span>
                )}
              </Link>
              <span className="text-text-primary">: {project.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Resume Section */}
      <div className="divider" />
      
      <section className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-3">Resume</h3>
        <p className="text-text-primary">
          A copy of my resume can be obtained{' '}
          <Link 
            href="https://github.com/ghl3/resume/raw/master/resume.pdf"
            className="font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            here ↗
          </Link>
        </p>
      </section>
    </div>
  );
}
