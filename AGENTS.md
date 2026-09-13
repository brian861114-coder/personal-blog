## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Post videos

When clipping footage for a post, or inserting a clip into MDX, finish only when all of these hold: the file is under `public/videos/posts/<slug>/`, `ffprobe` duration matches the requested range, size is well under 2MB, and the post page `<video>` plays.

GitHub Pages serves the mp4 from the repo (warns at 50MB, rejects at 100MB). Encode before insert. Length can be tens of seconds if the file stays small.

Default encode (ShareX / screen recordings; no speech):

```
ffmpeg -y -ss START -to END -i SRC -vf "scale=960:-2" -c:v libx264 -pix_fmt yuv420p -preset slow -crf 30 -an -movflags +faststart DEST.mp4
```

- Tiny UI text: `scale=1280:-2` and `-crf 28`.
- Keep speech: drop `-an`, add `-c:a aac -b:a 96k`.
- Always output `yuv420p` so browsers can play it.

Write the clip with the mapped MDX tag (paths are site-root, not `public/`):

```mdx
<Video src="/videos/posts/<slug>/demo.mp4" />
```

Put the tag where the post is talking about that demo. Keystatic「短片（mp4）」copies into the same folder on save; hand-placed files use the same layout. Commit and push `main` to publish.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
