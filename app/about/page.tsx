import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: About',
};

export default function AboutPage() {
  return (
    <div className="content mx-auto max-w-3xl">
      <p>
        Welcome to SpontaneousSymmetry, a site dedicated to programming, science, math, 
        and technology.
      </p>

      <p>
        To read our latest post, visit our <a href="/blog">Blog</a>.
      </p>

      <p>
        For our introduction to statistics, visit our <a href="/stats">Stats Guide</a>.
      </p>

      <p>
        To learn more about the author, visit the <a href="/">Home</a> page or 
        the <a href="/work">Work</a> page. And for more details about the author&apos;s 
        physics research, visit the <a href="/atlas">Atlas</a> page.
      </p>

      <p>
        For any questions or requests for posts or content, feel free to reach out to 
        the following email address: ghl227@gmail.com
      </p>

      <div className="break" />

      <div className="text-center my-8">
        <img 
          src="/static/images/symmetry_e8.jpg" 
          alt="E8 Symmetry" 
          className="w-48 mx-auto"
        />
      </div>

      <p>
        Symmetries are all around us and shape our lives in ways few understand. 
        On an aesthetic level, symmetries are considered beautiful and visually pleasing. 
        But the mathematical concept of a symmetry goes much deeper than the familiar definition. 
        In a deep, fundamental way, symmetries govern how the world works. 
        They are the language of the most fundamental physical processes that we can describe.
      </p>
    </div>
  );
}

