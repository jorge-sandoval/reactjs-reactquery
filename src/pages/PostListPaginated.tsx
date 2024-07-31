import { keepPreviousData, useQuery } from '@tanstack/react-query';
import postService from '../api/services/postService';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PostListPaginated() {
  const [page, setPage] = useState(1);
  
  const navigate = useNavigate();

  const {
    isLoading, isError, error, data, isPlaceholderData, fetchStatus
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: async () => {
      const response = await postService.getAll({pageSize: 2, currentPage: page});
      return response;
    },
    placeholderData: keepPreviousData
  });
  

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div>
      <Link to={`/`}>Go to Home</Link>
      <h1>
        Paginated Post List
      </h1>
      <ul>
        {data?.items.map(post => (
          <li key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
            {post.title}
          </li>
        ))}
      </ul>
      {data?.prevPage && (
        <button 
          disabled={isPlaceholderData}
          onClick={() => setPage(data?.prevPage as number)}>
            Previous
        </button>
      )}{" "}
      {data?.nextPage && (
        <button
          disabled={isPlaceholderData}
          onClick={() => setPage(data.nextPage as number)}>
            Next
        </button>
      )}
      <div>fetch status: {fetchStatus}</div>
    </div>
  );
}