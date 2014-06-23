SpontaneousSymmetry
===================

My Personal Website



TODO:
      - Separate the blog blueprint into it's own repo
      - In the blog_templates directory, have a default "post" and "archive" page
      - These internally use snippets for the post-snippt part of the page and the left
        archive-snippet sidebar
      - A user can then create their own templates and simply jinja "include"
        these wherever they want (so they can incorporate their own themes)
      - Or they could use the defaults, which are automatically in the tempalte path
      - Make the "posts" directory name customizable