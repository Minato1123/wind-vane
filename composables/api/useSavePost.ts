export function useSavePost({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(
    `save-post-${postId}`,
    () => $fetch('/api/savedPosts', {
      headers: [['access-token', token]],
      body: {
        postId,
      },
      method: 'POST',
    }), {
      server: false,
      immediate: false,
    })
}
