import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../site.config';
import { withBase } from './paths';

export type Post = CollectionEntry<'blog'>;

export const getPosts = async () => (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

export const postHref = (post: Post) => withBase(`blog/${post.id.split('/').map(encodeURIComponent).join('/')}/`);
export const tagHref = (tag: string) => withBase(`tags/${tag}/`);

export const formatDate = (date: Date) => new Intl.DateTimeFormat(site.language, {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(date);

export const shortDate = (date: Date) => new Intl.DateTimeFormat(site.language, {
  day: 'numeric', month: 'short', timeZone: 'UTC',
}).format(date);

export const wordCount = (body = '') => body.trim() ? body.trim().split(/\s+/u).length : 0;
export const readingMinutes = (body = '') => Math.max(1, Math.ceil(wordCount(body) / 200));
