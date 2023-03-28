export function useCheckPostSaved({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(
    `check-${postId}-saved`,
    () => $fetch(`/api/savedPosts/${postId}`, {
      headers: [['access-token', token]],
      method: 'GET',
    }), {
      server: false,
      immediate: false,
    })
}
