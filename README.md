# SpontaneousSymmetry

My Personal Website

Built with Next.js 14 and React, deployed on Vercel.

Available at: [spontaneoussymmetry.com](https://spontaneoussymmetry.com)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to view the site.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── work/               # Work page
│   ├── atlas/              # Atlas page
│   ├── blog/               # Blog routes
│   ├── stats/              # Stats section
│   ├── apps/               # Apps listing
│   └── app/                # Individual apps (games)
├── components/             # React components
├── lib/                    # Utilities for content loading
├── posts/                  # Blog posts (Markdown)
├── pages/                  # Content pages (Markdown)
├── public/                 # Static assets
├── scripts/                # Utility scripts
└── next.config.js          # Next.js configuration
```

## Key Features

### Blog
- Markdown posts in `posts/` directory
- YAML frontmatter for metadata
- Math rendering with KaTeX (`$...$` syntax)
- Code highlighting with rehype-highlight
- Archive and WordPress ID redirects preserved

### Stats Guide
- Educational statistics content in `pages/stats/`
- Navigation between sections

### Apps
- **ConnectFour**: Neural network AI using TensorFlow.js
- **Rock Paper Scissors**: Pattern detection AI
- **Bouncing Balls**: Physics simulation

## Building for Production

```bash
# Build static site
npm run build

# Output will be in the `out/` directory
```

## Deployment

Push to GitHub and Vercel will auto-detect Next.js and deploy.

## Creating New Blog Posts

```bash
python3 scripts/new_post.py my-post-slug --title "My Post Title" --author "Your Name"
```

This creates a new markdown file in `posts/` with the proper frontmatter.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: unified/remark/rehype ecosystem
- **Math**: KaTeX
- **AI Models**: TensorFlow.js (client-side)
- **Export**: Static site generation
