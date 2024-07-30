import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const POST = [
  { id: '1', title: 'Post 1' },
  { id: '2', title: 'Post 2' }
];

function Explore() {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(500).then(() => [...POST])
  });

  const newPostMutation = useMutation({
      mutationFn: (title: string) => wait(500).then(() => {
        const p = { id: crypto.randomUUID(), title};
        POST.push(p);
        return p;
      }),
      onSuccess: () => queryClient.invalidateQueries(['posts'])
  });

  if (postQuery.isLoading) {
    return <h1>Loading ...</h1>
  }
  
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>
  } 

  return (
    <>
      <h1>TanStack Query</h1>
      {
        postQuery.data?.map(p => (
          <div key={p.id}> {p.title}</div>
        ))
      }
      <div>
        <button
          disabled={newPostMutation.isPending}
          onClick={() => newPostMutation.mutate('New Post')}>
          Add New
        </button>
      </div>
    </>
  )
}

function wait(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export default Explore
