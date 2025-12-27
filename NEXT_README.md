# Next.js Website Migration

This document describes the Next.js migration of the SpontaneousSymmetry website.

## Quick Start

```bash
# Install dependencies
npm install

# Setup static files (creates symlink for development)
./scripts/setup_static.sh

# Run development server
npm run dev
```

Visit `http://localhost:3000` to view the site.

## Project Structure

The Next.js app runs alongside the existing Flask files:

```
├── app/                    # Next.js App Router (NEW)
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── work/               # Work page
│   ├── atlas/              # Atlas page
│   ├── blog/               # Blog routes
│   ├── stats/              # Stats section
│   ├── apps/               # Apps listing
│   └── app/                # Individual apps
├── components/             # React components (NEW)
├── lib/                    # Utilities for content loading (NEW)
├── posts/                  # Blog posts (UNCHANGED)
├── pages/                  # Content pages (UNCHANGED)
├── static/                 # Static assets (UNCHANGED)
├── public/                 # Next.js public files (NEW)
│   └── static -> ../static # Symlink to existing static/
├── next.config.js          # Next.js configuration (NEW)
├── package.json            # Node dependencies (NEW)
├── tailwind.config.js      # Tailwind CSS config (NEW)
└── tsconfig.json           # TypeScript config (NEW)
```

## Key Features

### Blog Posts
- Reads markdown directly from `posts/` directory
- YAML frontmatter parsed automatically
- Math rendering with KaTeX (same `$...$` syntax)
- Code highlighting with rehype-highlight
- Full archive and WordPress ID redirects preserved

### Stats Guide
- Reads from `pages/stats/` directory
- Navigation between sections
- Previous/Next links

### Apps
- ConnectFour: Built-in AI using minimax algorithm
- Rock Paper Scissors: Pattern detection AI
- Bouncing Balls: Physics simulation

## Building for Production

```bash
# Build static site
npm run build

# The output will be in the `out/` directory
```

## Deployment to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Next.js and deploy

For static file handling, ensure the `static/` directory contents are available. You can either:
- Use the symlink approach (works locally)
- Copy static files in the build step

## TensorFlow Model Conversion (Optional)

To use the original TensorFlow-based AI for ConnectFour:

```bash
# Install Python dependencies
pip install tensorflow tensorflowjs

# Run conversion script
python scripts/convert_tf_model.py
```

This creates TensorFlow.js model files in `public/models/connectfour/`.

## Flask Files

The existing Flask files (`app.py`, `blog.py`, `templates/`, etc.) remain in place
for reference. They can be removed once the migration is verified:

```bash
# Files that can be removed after verification:
rm -rf templates/ blog_templates/
rm app.py blog.py
rm -rf apps/  # Keep if you need the TensorFlow model
rm Dockerfile
rm -rf config/
rm requirements.txt constraints.txt
```

## Development Notes

- Uses Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling (preserves original aesthetic)
- Static export mode for Vercel compatibility
- KaTeX for math rendering (smaller than MathJax)

