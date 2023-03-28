export function useDeleteSavedPost({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(
    `delete-saved-post-${postId}`,
    () => $fetch(`/api/savedPosts/${postId}`, {
      headers: [['access-token', token]],
      method: 'DELETE',
    }), {
      server: false,
      immediate: false,
    })
}
