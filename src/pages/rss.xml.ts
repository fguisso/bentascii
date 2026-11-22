import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '../site.config';
import { withBase } from '../utils/paths';
import { getPosts, postHref } from '../utils/posts';

export const GET: APIRoute = async (context) => {
  const origin = context.site ?? context.url;
  const posts = await getPosts();

  return rss({
    title: site.title,
    description: site.description,
    site: new URL(withBase(), origin),
    customData: `<language>${site.language}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: new URL(postHref(post), origin).href,
    })),
  });
};
