// lib/sanity.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Set up the Sanity client
export const client = createClient({
  apiVersion: "2023-05-03", // Use the Sanity API version you prefer
  dataset: "production", // Your dataset name
  projectId: "4lxuglib", // Your project ID
  useCdn: false, // Set to `true` to use CDN if you'd like to serve cached content
//   token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

// Function to generate image URLs
export function urlFor(source) {
  return builder.image(source);
}
