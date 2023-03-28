export function useGetPostByPostId({
  postId,
}: {
  postId: string
}) {
  return useLazyFetch(() => `/api/posts/${postId}`, {
    method: 'GET',
  })
}
