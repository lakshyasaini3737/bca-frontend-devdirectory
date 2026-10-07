import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setMessage("Please enter both title and content.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId: 1,
        }
      );

      setMessage("Post created successfully!");

      setTitle("");
      setBody("");

      setTimeout(() => {
        navigate("/users");
      }, 1200);
    } catch (error) {
      setMessage("Unable to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-post-page">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="add-post-header">
        <span className="section-label">COMMUNITY</span>

        <h1>Create a Post</h1>

        <p>
          Share your ideas, knowledge and thoughts with the
          developer community.
        </p>
      </div>

      <div className="add-post-card">
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="post-title">Post Title</label>

            <input
              id="post-title"
              type="text"
              placeholder="Enter your post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="post-body">Content</label>

            <textarea
              id="post-body"
              rows="8"
              placeholder="Write something interesting..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>

          {message && (
            <div className="post-message">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Post"}
            {!loading && <span>→</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;