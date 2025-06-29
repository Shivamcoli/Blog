// src/app/page.tsx

export const dynamic = 'force-dynamic'; // optional: ensures SSR even in static mode

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export default async function HomePage() {
  let posts: Post[] = [];

  try {
    const res = await fetch('http://localhost:5000/api/posts', {
      cache: 'no-store', // disable caching to force fresh data
    });

    if (res.ok) {
      posts = await res.json();
    }
  } catch (err) {
    console.error('Failed to load posts:', err);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '2rem' }}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <small>By user {post.authorId}</small>
              <br />
              <small>Posted on {new Date(post.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
