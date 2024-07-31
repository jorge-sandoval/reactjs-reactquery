import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FormEvent, useRef } from "react"
import postService from "../api/services/postService"
import { useNavigate } from "react-router-dom";
import { Post } from "../api/models/post";
import userService from "../api/services/userService";

export default function New() {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLSelectElement>(null);

  const navigate = useNavigate();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { items } = await userService.getAll();
      return items;
    },
    staleTime: 1000 * 60 // 1 minute
  });

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: (p: Post) => postService.create(p),
    onSuccess: (data: Post)=> {
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: true });
      
      queryClient.setQueryData(["posts", data.id], data);
      const user = usersQuery.data?.find(u => u.id === userIdRef.current?.value);
      if (user) {
        queryClient.setQueryData(["users", user.id], user);
      }

      navigate(`/posts/${data.id}`);
    },
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log('ddd')
    createMutation.mutate({
      title: titleRef.current?.value ?? '',
      body: bodyRef.current?.value ?? '',
      userId: userIdRef.current?.value ?? ''
    } as Post)
  }

  return (
    <div>
      {createMutation.isError && JSON.stringify(createMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <div>
        <label htmlFor="userId">Author</label>
          <select
            name="userId"
            id="userId"
            ref={userIdRef}
          >
            <option value="">Select</option>
            {usersQuery.data?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <button disabled={createMutation.isPending}>
          {createMutation.isPending ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  )
}