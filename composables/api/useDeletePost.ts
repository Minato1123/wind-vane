export function useDeletePost({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(
    `delete-post-${postId}`,
    () => $fetch(`/api/posts/${postId}`, {
      headers: [['access-token', token]],
      method: 'DELETE',
    }), {
      server: false,
      immediate: false,
    })
}
