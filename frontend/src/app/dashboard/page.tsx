'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/dashboard.css';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorEmail?: string;
}


export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken || isTokenExpired(storedToken)) {
      localStorage.removeItem('token');
      router.push('/login');
      return;
    }
    setToken(storedToken);
    fetchUserPosts(storedToken);
  }, [router]);

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  };

  const fetchUserPosts = async (token: string, showAll = false) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.userId;
      const query = showAll ? '' : `?author=${userId}`;
      const res = await fetch(`http://localhost:5000/api/posts${query}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Error loading posts:', err);
      setMessage('Failed to load posts.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (title.trim().length < 3 || content.trim().length < 10) {
      setMessage('Title must be at least 3 chars. Content at least 10 chars.');
      return;
    }

    const endpoint = editingPostId
      ? `http://localhost:5000/api/post/${editingPostId}`
      : 'http://localhost:5000/api/post';

    const method = editingPostId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        await fetchUserPosts(token, viewAll);
        setTitle('');
        setContent('');
        setEditingPostId(null);
        setMessage(editingPostId ? 'Post updated!' : 'Post created!');
      } else {
        setMessage(data.message || 'Failed to submit post.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Network or server error occurred.');
    }
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingPostId(post.id);
    setMessage('Editing post...');
  };

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setEditingPostId(null);
    setMessage('Edit cancelled.');
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/post/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        if (editingPostId === id) {
          handleCancelEdit();
        }
        setMessage('Post deleted.');
      } else {
        const data = await res.json();
        setMessage(data.message || 'Delete failed.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Network or server error during delete.');
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="dashboard-container">
      <div className="form-section">
        <div className="dashboard-header">
          <svg
            onClick={handleLogout}
            className="logout-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
            style={{ cursor: 'pointer' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
        </div>

        <h1 className="dashboard-title">Dashboard</h1>

        <form onSubmit={handleCreatePost} className="dashboard-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
          />
          <textarea
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
          />
          <button type="submit">
            {editingPostId ? 'Update Post' : 'Create Post'}
          </button>
          {editingPostId && (
            <button type="button" onClick={handleCancelEdit} className="cancel-btn">
              Cancel Edit
            </button>
          )}
          {message && <p className="dashboard-message">{message}</p>}
        </form>

        <button
          onClick={() => {
            const next = !viewAll;
            setViewAll(next);
            if (token) fetchUserPosts(token, next);
          }}
          className="toggle-btn"
          style={{ marginTop: '1rem' }}
        >
          {viewAll ? 'Show My Posts' : 'Show All Posts'}
        </button>
      </div>

      <div className="posts-section">
        <h2>{viewAll ? 'All Posts' : 'Your Posts'}</h2>
        {posts.length === 0 ? (
          <p style={{ color: '#e5e7eb' }}>You have no posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-actions">
                <svg
                  onClick={() => handleEdit(post)}
                  className="action-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 11l6.364-6.364a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z"
                  />
                </svg>
                <svg
                  onClick={() => handleDelete(post.id)}
                  className="action-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p><strong>Title :</strong> {post.title}</p>
              <p><strong>Description :</strong> {post.content}</p>
              <p><strong>Author:</strong> {post.authorEmail || post.authorId}</p>
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
