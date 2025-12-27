# Python Scripts

Python utilities for the SpontaneousSymmetry blog.

## Setup

Create a virtual environment and install dependencies:

```bash
cd python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Running Scripts

After setup, run scripts using the venv Python (from project root):

```bash
# Option 1: Activate venv first
source python/venv/bin/activate
python python/scripts/kalman_filter.py

# Option 2: Use venv Python directly
python/venv/bin/python python/scripts/kalman_filter.py
```

## Scripts

### `scripts/new_post.py`

Create a new blog post with proper frontmatter.

```bash
python/venv/bin/python python/scripts/new_post.py my-post-slug --title "My Post Title"

# Creates: posts/YYYY-MM-DD-my-post-slug.markdown
```

Options:
- `--title` - Post title (default: inferred from slug)
- `--author` - Author name (default: "George Lewis")
- `--date` - Date in YYYY-MM-DD format (default: today)

### `scripts/kalman_filter.py`

Kalman Filter demonstration for the blog post `posts/2018-05-02-filter.markdown`.
Demonstrates tracking position and velocity from noisy measurements using NumPy.

```bash
python/venv/bin/python python/scripts/kalman_filter.py
# Output: python/output/kalman_filter.png
```

### `scripts/meritocracy_plot.py`

Generates the income comparison plot for `posts/2014-10-19-meritocracy.markdown`.

```bash
python/venv/bin/python python/scripts/meritocracy_plot.py
# Output: python/output/Poor-Grads-Rich-Dropouts-Mine.png
```

### `scripts/convert_connectfour_model.py` / `scripts/convert_tf_model.py`

Convert TensorFlow models to TensorFlow.js format for the ConnectFour game.
Requires additional dependencies:

```bash
source python/venv/bin/activate
pip install tensorflow tensorflowjs
python python/scripts/convert_tf_model.py
# Output: public/models/connectfour/
```

## Output

Generated files (plots, etc.) go to `python/output/` which is gitignored.
To use generated assets in the blog, copy them to `public/assets/images/`:

```bash
cp python/output/kalman_filter.png public/assets/images/
```
