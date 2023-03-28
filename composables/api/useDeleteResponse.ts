export function useDeleteResponse({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(
    `delete-response-${postId}`,
    () => $fetch(`/api/responses/${postId}`, {
      headers: [['access-token', token]],
      method: 'DELETE',
    }), {
      server: false,
      immediate: false,
    })
}
