import { useInfiniteQuery } from "@tanstack/react-query"
import postService from "../api/services/postService";
import { PaginationResult } from "../api/models/pagination";
import { Post } from "../api/models/post";
import { Link } from "react-router-dom";

export function PostListInfinite() {
    const {
      isLoading,
      isError, error,
      data,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
    } = useInfiniteQuery({
      queryKey: ["posts", "infinite"],
      initialPageParam: 1,
      getNextPageParam: (lastPage: PaginationResult<Post>) => lastPage.nextPage,
      queryFn: async ({pageParam}) => {
        const response = await postService.getAll({pageSize: 2, currentPage: pageParam});
        return response;
      }
    })
  
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>{JSON.stringify(error)}</h1>;
  
    return (
      <>
        <div>
            <Link to={`/`}>Go to Home</Link>
        </div>
        <h1>Post List Infinite</h1>
        {data?.pages
          .flatMap(data => data.items)
          .map(post => (
            <div key={post.id}>{post.title}</div>
          ))}
        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </>
    )
  }