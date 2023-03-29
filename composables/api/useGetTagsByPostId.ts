export function useGetTagsByPostId({
  postId,
}: {
  postId: string
}) {
  return useLazyFetch('/api/tags', {
    query: {
      postId,
    },
    method: 'get',
  })
}
