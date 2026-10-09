
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanBody = body.trim();

    if (!cleanTitle || !cleanBody) {
      setMessageType("error");
      setMessage("Please enter both a title and post content.");
      return;
    }

    if (cleanTitle.length < 3) {
      setMessageType("error");
      setMessage("Title must contain at least 3 characters.");
      return;
    }

    if (cleanBody.length < 10) {
      setMessageType("error");
      setMessage("Post content must contain at least 10 characters.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: cleanTitle,
          body: cleanBody,
          userId: 1,
        },
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMessageType("success");
        setMessage(
          "Your demo post was submitted successfully! Note: this API does not permanently save posts."
        );
        setTitle("");
        setBody("");
      } else {
        throw new Error("Post submission failed.");
      }
    } catch (error) {
      setMessageType("error");

      if (error.code === "ECONNABORTED") {
        setMessage("The request timed out. Please try again.");
      } else if (error.response) {
        setMessage(
          `Unable to submit your post (error ${error.response.status}). Please try again.`
        );
      } else {
        setMessage(
          "Unable to connect to the posts API. Check your internet and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-post-page">
      <Link to="/" className="back-link">
        <span aria-hidden="true">←</span> Back to Home
      </Link>

      <header className="add-post-header">
        <span className="section-label">DEVSPHERE COMMUNITY</span>

        <h1>
          Share Your <span className="hero-gradient">Ideas.</span>
        </h1>

        <p>
          Create a post, share what you are learning, and inspire
          other developers in the community.
        </p>
      </header>

      <section className="add-post-card">
        <div className="post-card-heading">
          <div className="post-heading-icon">✎</div>
          <div>
            <h2>Create a community post</h2>
            <p>Fill in the details below to prepare your post.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="post-title">Post Title</label>

            <input
              id="post-title"
              name="title"
              type="text"
              placeholder="e.g. My journey learning React"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={120}
              required
              disabled={loading}
            />

            <div className="post-field-hint">
              <span>Write a clear, descriptive title.</span>
              <span>{title.length}/120</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="post-body">Post Content</label>

            <textarea
              id="post-body"
              name="body"
              rows={8}
              placeholder="Share your ideas, learning, or project experience..."
              value={body}
              onChange={(event) => setBody(event.target.value)}
              maxLength={5000}
              required
              disabled={loading}
            />

            <div className="post-field-hint">
              <span>Minimum 10 characters.</span>
              <span>{body.length}/5000</span>
            </div>
          </div>

          {message && (
            <div
              className={`post-message ${messageType}`}
              role={messageType === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              <span aria-hidden="true">
                {messageType === "success" ? "✓" : "!"}
              </span>
              <p>{message}</p>
            </div>
          )}

          <div className="post-form-footer">
            <p>
              <span aria-hidden="true">✦</span> Be respectful and
              constructive when sharing with the community.
            </p>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Post"}
              {!loading && <span aria-hidden="true">↗</span>}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddPost;