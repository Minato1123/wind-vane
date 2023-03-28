export function useChangeResponseToPositive({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(
    `change-response-to-positive-${postId}`,
    () => $fetch(`/api/responses/${postId}`, {
      headers: [['access-token', token]],
      body: {
        response: 'positive',
      },
      method: 'PATCH',
    }), {
      server: false,
      immediate: false,
    })
}
