// lib/blog.js
import { client } from "./sanity";

export async function getBlogData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
    }
  `;
  const data = await client.fetch(query);
  return data;
}
