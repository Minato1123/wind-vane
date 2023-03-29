export function useGetPostByPostId({
  postId,
}: {
  postId: string
}) {
  return useFetch(() => `/api/posts/${postId}`, {
    method: 'get',
  })
}
