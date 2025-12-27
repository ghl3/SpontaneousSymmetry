# Python Scripts

Python utilities for the SpontaneousSymmetry blog.

## Setup

```bash
cd python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Scripts

### `scripts/new_post.py`

Create a new blog post with proper frontmatter.

```bash
# From project root
python python/scripts/new_post.py my-post-slug --title "My Post Title" --author "George Lewis"

# Creates: posts/YYYY-MM-DD-my-post-slug.markdown
```

### `scripts/kalman_filter.py`

Kalman Filter demonstration for the blog post `posts/2018-05-02-filter.markdown`.

Demonstrates tracking position and velocity from noisy measurements.

```bash
python python/scripts/kalman_filter.py
# Output: python/output/kalman_filter.png
```

### `scripts/meritocracy_plot.py`

Generates the income comparison plot for `posts/2014-10-19-meritocracy.markdown`.

```bash
python python/scripts/meritocracy_plot.py
# Output: python/output/Poor-Grads-Rich-Dropouts-Mine.png
```

### `scripts/convert_connectfour_model.py` / `scripts/convert_tf_model.py`

Convert TensorFlow models to TensorFlow.js format for the ConnectFour game.
Requires TensorFlow and TensorFlowJS:

```bash
pip install tensorflow tensorflowjs
python python/scripts/convert_tf_model.py
# Output: public/models/connectfour/
```

## Output

Generated files (plots, etc.) go to `python/output/` which is gitignored.
To use generated assets in the blog, copy them to `public/assets/images/`.
