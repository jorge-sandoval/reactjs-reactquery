import { useQuery } from '@tanstack/react-query';
import postService from '../api/services/postService';
import { Link, useNavigate } from 'react-router-dom';

export default function PostsList() {
  const navigate = useNavigate();

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { items } = await postService.getAll();
      return items;
    },
    refetchInterval: 1000 * 10 // 10 seconds
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <h1>{JSON.stringify(postsQuery.error)}</h1>;

  return (
    <div>
      <Link to={`/list2`}>Go to List 2</Link>
      <Link to={`/paginated`}>Go to Paginated List</Link>
      <h1>Posts List</h1>
      <button onClick={() => navigate('new')}>Create Post</button>
      <ul>
        {postsQuery.data?.map(post => (
          <li key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div>fetch status: {postsQuery.fetchStatus}</div>
    </div>
  );
}