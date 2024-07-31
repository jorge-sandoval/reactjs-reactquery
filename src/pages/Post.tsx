import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import postService from '../api/services/postService';
import userService from '../api/services/userService';

export default function Post() {
  const { id } = useParams();

  const postQuery = useQuery({
    queryKey: ['posts', id],
    queryFn: () => postService.getById(id as string),
  })

  const userQuery = useQuery({
    queryKey: ['users', postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => userService.getById(postQuery?.data?.userId as string)
  })

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <h1>{JSON.stringify(postQuery.error)}</h1>;

  return (
    <>
      <div>
        <Link to={`/`}>Go to Home</Link>
      </div>
      <h1>
        {postQuery.data?.title} <br />
        <small>
          {userQuery.isLoading
            ? 'Loading User...'
            : userQuery.isError
            ? 'Error Loading User'
            : userQuery.data?.name}
        </small>
      </h1>
      <p>{postQuery.data?.body}</p>
    </>
  )
}