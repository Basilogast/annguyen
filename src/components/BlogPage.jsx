import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";
import BlockContent from "@sanity/block-content-to-react"; // To render rich text

export default function BlogPage() {
  const { slug } = useParams(); // Get the blog slug from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(false); // Track error state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const query = `*[_type == 'blog' && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });

        if (!data) {
          setError(true); // If no blog data is returned, set error state
        } else {
          setBlog(data); // Set blog data
        }
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError(true); // Set error state if an error occurs
      } finally {
        setLoading(false); // Loading is done
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <div className="blogPage-loading">Loading...</div>;

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          color: "#ff6347", // Tomato red color for the error text
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
          }}
        >
          404 - Blog Not Found
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <a
          href="/NguyenDoThienAn/"
          style={{
            textDecoration: "none",
            color: "#007bff",
            fontSize: "1.2rem",
          }}
        >
          Go back to the home page
        </a>
      </div>
    );
  }

  return (
    <div className="blogPage-container">
      {/* Blog Title */}
      <h1 className="blogPage-title">{blog.title}</h1>

      {/* Blog Title Image */}
      {blog.titleImage && (
        <img
          className="blogPage-image"
          src={urlFor(blog.titleImage).url()}
          alt={blog.title}
        />
      )}

      {/* Blog Description */}
      <p className="blogPage-description">{blog.smallDescription}</p>

      {/* Blog Content */}
      <div className="blogPage-content">
        {blog.content?.map((block, index) => {
          if (block._type === "block") {
            // Render rich text content
            return (
              <div className="blogPage-block-content" key={index}>
                <BlockContent blocks={block} />
              </div>
            );
          }

          if (block._type === "image") {
            // Render images in the content
            return (
              <img
                key={index}
                className="blogPage-content-image"
                src={urlFor(block).url()}
                alt={block.alt || "Image"}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
