import { useQuery } from '@tanstack/react-query';
import postService from '../api/services/postService';
import { Link } from 'react-router-dom';

export default function PostsList() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { items } = await postService.getAll()
      return items;
    },
    refetchInterval: 1000 * 10 // 10 seconds
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <h1>{JSON.stringify(postsQuery.error)}</h1>;

  return (
    <div>
      <Link to={`/list2`}>Go to List 2</Link>
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