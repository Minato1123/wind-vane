export function useChangeResponseToNegative({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(
    `change-response-to-negative-${postId}`,
    () => $fetch(`/api/responses/${postId}`, {
      headers: [['access-token', token]],
      body: {
        response: 'negative',
      },
      method: 'PATCH',
    }), {
      server: false,
      immediate: false,
    })
}
