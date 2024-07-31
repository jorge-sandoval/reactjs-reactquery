import { useQuery } from '@tanstack/react-query';
import postService from '../api/services/postService';
import { Link } from 'react-router-dom';

export default function PostsList2() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { items } = await postService.getAll({}, {failRate: 0.3})
      return items;
    },
    staleTime: 1000 * 15 // seconds
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <h1>{JSON.stringify(postsQuery.error)}</h1>;

  return (
    <div>
      <div>
        <Link to={`/`}>Go to Home</Link>{' - '}
        <Link to={`/explore`}>Go to Explore</Link>
      </div>
      <h1>Posts List</h1>
      <ul>
        {postsQuery.data?.map(post => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
      <div>fetch status: {postsQuery.fetchStatus}</div>
    </div>
  );
}