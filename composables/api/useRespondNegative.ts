export function useRespondNegative({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(`respond-negative-${postId}`, () => $fetch('/api/responses', {
    headers: [['access-token', token]],
    body: {
      postId,
      response: 'negative',
    },
    method: 'POST',
  }), {
    server: false,
    immediate: false,
  })
}
