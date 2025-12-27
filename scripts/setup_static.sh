#!/bin/bash
# Setup script to prepare static files for Next.js

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Setting up static files for Next.js..."

# Create public directory if it doesn't exist
mkdir -p "$PROJECT_ROOT/public"

# Create symlink from public/static to static (if not exists)
if [ ! -L "$PROJECT_ROOT/public/static" ] && [ ! -d "$PROJECT_ROOT/public/static" ]; then
    echo "Creating symlink: public/static -> ../static"
    cd "$PROJECT_ROOT/public"
    ln -s ../static static
    cd "$PROJECT_ROOT"
else
    echo "public/static already exists"
fi

# Copy favicon to public root
if [ -f "$PROJECT_ROOT/static/images/favicon.ico" ]; then
    cp "$PROJECT_ROOT/static/images/favicon.ico" "$PROJECT_ROOT/public/favicon.ico"
    echo "Copied favicon to public/"
fi

echo "Static files setup complete!"
echo ""
echo "Note: The symlink approach works for development."
echo "For production builds, you may need to copy files instead:"
echo "  cp -r static/* public/static/"


